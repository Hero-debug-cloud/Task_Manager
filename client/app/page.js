"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import endPoint from "@/config";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { GiCancel } from "react-icons/gi";

export default function Home() {
	const [tasks, setTasks] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [editIndex, setEditIndex] = useState(null);
	const [isNewTask, setIsNewTask] = useState(false);
	const [newTask, setNewTask] = useState("");
	const getTasks = async () => {
		try {
			const { data } = await axios.get(`${endPoint}/api/tasks`);
			setTasks(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getTasks();
	}, []);
	const handleDelete = async (id) => {
		try {
			await axios.delete(`${endPoint}/api/tasks`, { data: { id: id } });
			// filtering out the deleted task and updating the useState;
			setTasks(tasks.filter((task) => task._id !== id));
		} catch (error) {
			console.log(error);
		}
	};
	const handleComplete = async (id, completed) => {
		try {
			await axios.put(`${endPoint}/api/tasks`, {
				id,
				completed: !completed,
			});
			//updating the useState;
			let newTasks = [...tasks];
			newTasks.forEach((task) => {
				if (task._id === id) {
					task.completed = !completed;
				}
			});
			setTasks(newTasks);
		} catch (error) {
			console.log(error);
		}
	};
	const handleEdit = async (id) => {
		try {
			//get the title from all task using id;
			const title = tasks.filter((value) => value._id == id)[0].title;

			await axios.put(`${endPoint}/api/tasks`, {
				id,
				title,
			});

			const newTask = [...tasks];
			newTask.forEach((task) => {
				if (task._id === id) {
					task.title = title;
				}
			});
			setTasks(newTask);
		} catch (error) {
			console.log(error);
		}
	};
	const handleNewTask = async () => {
		try {
			const { data } = await axios.post(`${endPoint}/api/tasks`, {
				title: newTask,
			});
			setTasks([data, ...tasks]);
			setNewTask("");
			setIsNewTask(false);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="h-[100vh] w-[100vw] px-[2vh] md:px-[6vh] py-[2vh]">
			{/* heading */}
			<div className="flex justify-between w-[95%]">
				<div className="font-bold text-2xl">Task Management</div>
				<div
					className="border cursor-pointer border-black p-2 rounded-lg"
					onClick={() => {
						setIsNewTask(!isNewTask);
						setNewTask("");
					}}
				>
					{isNewTask ? "Cancel" : " New Task"}
				</div>
			</div>

			{isNewTask && (
				<div className="flex items-center">
					<input
						className="font-bold w-[70%] mt-3 mb-3 p-2 border rounded"
						type="text"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
					/>
					<div
						className="border rounded ml-5 cursor-pointer p-2 text-gray-600"
						onClick={() => handleNewTask()}
					>
						Add
					</div>
				</div>
			)}

			{tasks && tasks.length == 0 ? (
				<div className="h-[40vh] flex justify-center items-center">
					No Task Available Enjoy
				</div>
			) : (
				<div className="mt-4 flex flex-col md:grid md:grid-cols-2 w-[100%] ">
					{tasks.map((task, index) => (
						<div
							key={task._id}
							className=" p-2 my-2 md:w-[40vw] flex border rounded"
						>
							<input
								type="text"
								value={task.title}
								className={`font-bold w-[70%] ${
									task.completed ? "line-through" : ""
								}`}
								onChange={(e) => {
									const newTasks = [...tasks];
									newTasks.forEach((t) => {
										if (t._id === task._id) {
											t.title = e.target.value;
										}
									});
									setTasks(newTasks);
								}}
								disabled={isEdit ? undefined : true}
								rows={50}
								style={{ resize: "none" }}
							/>
							{/* <div className="font-bold w-[70%] ">{task.title}</div> */}
							<div className="flex  justify-evenly  w-[30%] h-fit items-center">
								{/* checkbox button */}
								<input
									type="checkbox"
									className="h-fit border border-green-500"
									checked={task.completed}
									onChange={() => handleComplete(task._id, task.completed)}
								/>
								{isEdit && index == editIndex ? (
									<>
										<RxUpdate
											className="cursor-pointer"
											onClick={() => {
												handleEdit(task._id);
												setEditIndex(null);
												setIsEdit(false);
											}}
										/>

										<GiCancel
											className="cursor-pointer"
											onClick={() => {
												getTasks();
												setEditIndex(null);
												setIsEdit(false);
											}}
										/>
									</>
								) : (
									<>
										{/* edit button */}
										<FiEdit
											className="mx-2 cursor-pointer"
											onClick={() => {
												setIsEdit(!isEdit);
												setEditIndex(index);
											}}
										/>
										{/* delete button */}
										<MdDelete
											className="cursor-pointer"
											onClick={() => {
												handleDelete(task._id);
											}}
										/>
									</>
								)}
							</div>
						</div>
					))}
				</div>
			)}
			{/* all tasks */}
		</div>
	);
}
