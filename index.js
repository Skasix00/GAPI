require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const routes = require("./routes/index");
const port = process.env.PORT;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
	console.log(error);
});

database.once("connected", () => {
	console.log("Database Connected");
});

const app = express();
app.use(express.json());
app.use("/api", routes);
app.listen(port, () => {
	console.log(`Server Started at ${port}`);
});
