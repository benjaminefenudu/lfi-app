const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userValidation = require("../validations/user");
require("dotenv").config(); // Set up environment variables

// USER SIGN-UP
exports.signUp = async (req, res) => {
  try {
    // validate before creating new user account
    const { error } = userValidation.signUp(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if account already exists in database
    const emailExists = await User.findOne({ email: req.body.email });
    const phoneNoExists = await User.findOne({ phoneNo: req.body.phoneNo });
    if (emailExists || phoneNoExists)
      return res
        .status(400)
        .json({ success: false, msg: "Login details already exists!" });

    if (req.body.password !== req.body.confirmPassword) {
      return res
        .status(400)
        .json({ success: false, msg: "Password does not match!" });
    }

    // Hash passwords
    password = await bcrypt.hash(req.body.password, 12);

    // Create user account and store in database
    const user = new User({ ...req.body, password });
    await user.save();

    // Return new user account details
    res.status(201).json({
      success: true,
      msg: `User ${user._id} has been created.`,
      data: user,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// USER LOG-IN
exports.logIn = async (req, res) => {
  // validate the entered user data
  const { error } = userValidation.logIn(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user account exists in database
  const user = await User.findOne({
    email: req.body.email,
    phoneNo: req.body.phoneNo,
  });
  if (!user)
    return res
      .status(400)
      .json({ success: false, msg: "Invalid login details." });

  // Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(400)
      .json({ success: false, msg: "Invalid login details." });

  // Create a token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  // Assign token and send user details
  res.cookie("auth_token", token).status(200).json({
    success: true,
    msg: "Logged in successfully!",
    userDetails: user,
  });
};

// USER LOG-OUT
exports.logOut = (req, res) => {
  return res
    .clearCookie("auth_token")
    .status(200)
    .json({ success: true, msg: "Logged out successfully!" });
};

// GET USER DETAILS
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

// UPDATE USER INFO
exports.editUserInfo = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    // Limit user info changes via this route to only the following
    const { name } = req.body;

    // User can update or leave out any of the following fields
    if (name) user.name = name;

    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// Change Account Password
exports.changePassword = async (req, res) => {
  // validate request body
  const { error } = userValidation.passwordChange(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user old password is correct
  let user = await User.findById(req.user.id);
  const validPassword = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );
  if (!validPassword)
    return res.status(400).json({
      success: false,
      msg: "Invalid Old Password.",
    });

  // Hash new password and replace
  const password = await bcrypt.hash(req.body.newPassword, 12);
  user.password = password;
  await user.save();

  res.status(200).json({
    status: "success",
    msg: "Your password has been updated!",
    user,
  });
};
