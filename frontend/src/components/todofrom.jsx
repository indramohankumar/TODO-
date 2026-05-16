import React, { useState } from "react";
import { useTodocontext } from "./usetodocontext";
import { useAuthcontext } from "../hooks/useauthcontext";
import axios from "axios";

function TodoForm() {
    const { dispatch } = useTodocontext();
    const { user } = useAuthcontext();
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            setError("You must be logged in");
            return;
        }

        if (!title.trim() || !description.trim()) {
            setError("Title and description are required.");
            return;
        }

        setIsLoading(true);
        setError(null);

        const todo = { title, description, priority };

        try {
            const apiurl = import.meta.env.VITE_API_URL || "http://localhost:3000";
            const response = await axios.post(`${apiurl}/api/todos`, todo, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            });

            setTitle("");
            setDescription("");
            setPriority("medium");
            setError(null);
            
            dispatch({ type: "ADD_TODO", payload: response.data });
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred while creating the todo");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form 
            className="bg-white p-6 rounded border border-gray-200 shadow-sm flex flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
                Create a New Task
            </h3>

            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                    placeholder="Task title"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600 mb-1">
                    Description
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 min-h-[80px]"
                    placeholder="Task details"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600 mb-1">
                    Priority
                </label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="border border-gray-300 p-2 rounded bg-white focus:outline-none focus:border-blue-500"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors mt-2 disabled:bg-blue-300"
            >
                {isLoading ? "Adding Task..." : "Add Task"}
            </button>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded mt-2">
                    {error}
                </div>
            )}
        </form>
    );
}

export default TodoForm;