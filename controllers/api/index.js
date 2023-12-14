const router = require("express").Router();
const commentR = require("./comment_routes");
const postR = require("./post_routes");
const userR = require("./user_routes");

router.use("/comments", commentR);
router.use("/posts", postR);
router.use("/users", userR);
module.exports = router;