const express = require("express");
const GenerateToken = require("../provider/auth");
const Model = require("../model/user");
const router = express.Router();
router.get("/getAllUsers", (req, res) => {
  res.send("Rabo de Macaco");
});

router.post("/createUSer", (req, res) => {
  res.send("Rabo de Macaco");
});

router.delete("/deleteUser/:id", (req, res) => {
  res.send("Rabo de Macaco");
});

router.get("/generateToken/:id", async (req, res) => {
  const token = GenerateToken(req.id);

  res.status(200).json({
    status: "OK",
    data: { AccessToken: token },
  });
});

module.exports = router;
