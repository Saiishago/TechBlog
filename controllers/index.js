const router = require("express").Router();
const apiR = require("./api");
const homeR = require("./home_routes.js");

router.use("/", homeR);
router.use("/api", apiR);
module.exports = router;