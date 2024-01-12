const router = require("express").Router();
const commentR = require("./comment_routes");
const postR = require("./post_routes");
const userR = require("./user_routes");

router.use("/users", userR);
router.use("/comments", commentR);
router.use("/posts", postR);

module.exports = router;