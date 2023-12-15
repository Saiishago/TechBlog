const router = require("express").Router();
const apiR = require("./api");
const homeR = require("./home_routes");

router.use("/api", apiR);
router.use("/", homeR);
module.exports = router;