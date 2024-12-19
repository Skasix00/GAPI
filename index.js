///Needed to get environment variables///
require("dotenv").config();

///Dependencies///
const cors = require("cors");
const connectDB = require("./services/db");
const express = require("express");

///Routes Defenition///
const routes = require("./routes/index");
const nofrogetRoutes = require("./routes/nofroget");
const userRoutes = require("./routes/user");
const messagingRouter = require("./routes/messaging");
const todoListRouter = require("./routes/todolist");

///Port Used///
const port = process.env.PORT;

///Initialize express///
const app = express();

///Connect to DB ///
connectDB();

///Configure Cors///
const corsOptions = {
	origin: "*",
	optionsSuccessStatus: 200,
};
///API Initialization///
app.use(express.json());
app.use(cors(corsOptions));

///Available Routes///
app.use("/api", routes);
app.use("/api/nofroget", nofrogetRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messaging", messagingRouter);
app.use("/api/todolist", todoListRouter);

///Status Message///
app.listen(port, () => {
	console.log(`Server Started at ${port}`);
});
