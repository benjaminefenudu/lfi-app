const router = require("express").Router();

// Import route logic functions from route controller
const item = require("../controllers/item");
const authorize = require("../middlewares/authorize");

// Protected item posts routes
router.get("/reports", authorize, item.getUserPosts);
router.post("/lost", authorize, item.reportLostItem);
router.post("/found", authorize, item.reportFoundItem);

module.exports = router;
