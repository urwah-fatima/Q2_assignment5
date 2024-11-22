'use client' // Indicates that this is a client-side component
import React, { useState } from "react";

// Define the structure of a task
interface Task {
  text: string; // The task description
  completed: boolean; // Indicates if the task is completed
}

// Main ToDo application component
const ToDoApp = () => {
  // State for the current input task
  const [task, setTask] = useState<string>("");
  // State for the list of tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  // Function to add a new task
  const addTask = () => {
    if (task.trim() !== "") {
      // Add new task to the list only if it's not empty
      setTasks([...tasks, { text: task, completed: false }]);
      setTask(""); // Clear the input field after adding
    }
  };

  // Function to toggle task completion status
  const toggleTaskCompletion = (index: number) => {
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Function to delete a task
  const deleteTask = (indexToDelete: number) => {
    // Filter out the task at the specified index
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  return (
    // Main container - centers content vertically and horizontally
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Centered Box - contains all todo app elements */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-500">
          TO-DOs
        </h1>

        {/* Input Field and Add Button - for adding new tasks */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Task List - displays all added tasks */}
        <ul className="space-y-2">
          {tasks.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-50 p-2 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4 space-x-2">
                {/* Checkbox for task completion */}
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTaskCompletion(index)}
                  className="mr-2 rounded text-blue-500 focus:ring-0"
                />
                {/* Task Text (strikethrough if completed) */}
                <span
                  className={`${
                    item.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {item.text}
                </span>
              </div>
              {/* Delete button - removes the task from the list */}
              <button
                onClick={() => deleteTask(index)}
                className="px-2 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Export the ToDoApp component as the default export
export default ToDoApp;