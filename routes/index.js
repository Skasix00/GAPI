const express = require("express");
const Model = require("../model/user");

const router = express.Router();

router.get("/status", (req, res) => {
	res.send("ALL OK!");
});


module.exports = router;
