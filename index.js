require("dotenv").config();
const cors = require("cors");
const connectDB = require("./services/db");
const express = require("express");
const routes = require("./routes/index");
const nofrogetRoutes = require("./routes/nofroget");
const userRoutes = require("./routes/user");
const messagingRouter = require("./routes/messaging");
const port = process.env.PORT;

const app = express();
connectDB();

const corsOptions = {
	origin: "*",
	optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", routes);
app.use("/api/nofroget", nofrogetRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messaging", messagingRouter);

app.listen(port, () => {
	console.log(`Server Started at ${port}`);
});
