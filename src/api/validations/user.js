const Joi = require("joi");

// User SignUp Validation
exports.signUp = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    phoneNo: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(8).max(255).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  }).unknown();

  return schema.validate(user);
};

// User LogIn Validation
exports.logIn = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(6).email(),
    phoneNo: Joi.string().min(2).max(255),
    password: Joi.string().min(6).required(),
  }).unknown();

  return schema.validate(user);
};

// User Password Change Validation
exports.passwordChange = (user) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(6).max(255).required(),
    newPassword: Joi.string().min(6).max(255).required(),
    confirmNewPassword: Joi.string().required().valid(Joi.ref("newPassword")),
  }).unknown();

  return schema.validate(user);
};
