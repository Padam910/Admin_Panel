var express = require('express');
var router = express.Router();
const { checkUser, forgot } = require("../controller/forgot");

router.post("/",checkUser);
router.put("/",forgot);

module.exports = router;
