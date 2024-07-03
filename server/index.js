const express = require("express");
const app = express();
const cros = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const taskRouter = require("./routes/task");

const port = process.env.PORT || 4000;

app.use(cros());
app.use(express.json());

const connectToDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_LINK, {});
		console.log("Connected to MongoDB");
	} catch (err) {
		console.error("Error connecting to MongoDB:", err);
	}
};

connectToDB();

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.use("/api/tasks", taskRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
