const router = require("express").Router();

// Import route logic functions from route controller
const user = require("../controllers/user");
const authorize = require("../middlewares/authorize");

// Set routes for User Signup, Login & Logout
router.post("/signup", user.signUp);
router.post("/login", user.logIn);
router.get("/logout", user.logOut);

// Set protected routes for only signed-in users
router.get("/dashboard", authorize, user.getUserInfo);
router.put("/update", authorize, user.editUserInfo);
router.put("/change-password", authorize, user.changePassword);

module.exports = router;
