const router = require("express").Router();

const mongoose = require("mongoose");
const Task = require("../models/task");

router.post("/", async (req, res) => {
	const { title } = req.body;

	try {
		const newData = new Task({
			title: title,
		});
		const result = await newData.save();
		res.status(201).send(result);
	} catch (err) {
		res.status(400).send(`Error: ${err}`);
	}
});
router.get("/", async (req, res) => {
	const { id } = req.query;
	try {
		let result;
		if (id) {
			result = await Task.findById(id);
		} else result = await Task.find().sort({ createOn: -1 });
		res.status(200).json(result);
	} catch (err) {
		res.status(400).send(`Error: ${err}`);
	}
});
router.put("/", async (req, res) => {
	const { id, title, completed } = req.body;
	try {
		const updatedData = {};
		if (title) updatedData.title = title;
		if (completed) updatedData.completed = completed;

		const result = await Task.findByIdAndUpdate(
			new mongoose.Types.ObjectId(id),
			updatedData,
			{
				new: true,
			}
		);
		res.status(200).json(result);
	} catch (err) {
		res.status(400).send(`Error: ${err}`);
	}
});
router.delete("/", async (req, res) => {
	const { id } = req.body;
	console.log("here", id);
	try {
		await Task.findByIdAndDelete(new mongoose.Types.ObjectId(id));
		res.status(200).json("Successfully Deleted Task");
	} catch (err) {
		res.status(400).send(`Error: ${err}`);
	}
});

module.exports = router;
