import React, { useState } from "react";
import { useTodocontext } from "./usetodocontext";
import { useAuthcontext } from "../hooks/useauthcontext";
import axios from "axios";

function TodoDetails({ todo }) {
    const { dispatch } = useTodocontext();
    const { user } = useAuthcontext();
    
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDescription, setEditDescription] = useState(todo.description);
    const [editPriority, setEditPriority] = useState(todo.priority);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiurl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    const handleDelete = async () => {
        if (!user) return;
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.delete(`${apiurl}/api/todos/${todo._id}`, {
                headers: { "Authorization": `Bearer ${user.token}` }
            });
            dispatch({ type: "DELETE_TODO", payload: response.data });
        } catch (err) {
            setError("Failed to delete todo");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateStatus = async (e) => {
        if (!user) return;
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.patch(`${apiurl}/api/todos/${todo._id}`, 
                { completed: e.target.checked },
                { headers: { "Authorization": `Bearer ${user.token}` } }
            );
            dispatch({ type: "UPDATE_TODO", payload: response.data });
        } catch (err) {
            setError("Failed to update status");
            e.target.checked = !e.target.checked; // revert visual change
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveEdit = async () => {
        if (!user) return;
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.patch(`${apiurl}/api/todos/${todo._id}`, 
                { 
                    title: editTitle, 
                    description: editDescription, 
                    priority: editPriority 
                },
                { headers: { "Authorization": `Bearer ${user.token}` } }
            );
            dispatch({ type: "UPDATE_TODO", payload: response.data });
            setIsEditing(false);
        } catch (err) {
            setError("Failed to update todo");
        } finally {
            setIsLoading(false);
        }
    };

    if (isEditing) {
        return (
            <div className="bg-gray-50 p-4 mb-4 rounded border border-gray-300 shadow-sm">
                <input 
                    type="text" 
                    value={editTitle} 
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <textarea 
                    value={editDescription} 
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <select 
                    value={editPriority} 
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                
                <div className="flex gap-2">
                    <button 
                        onClick={handleSaveEdit} 
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded disabled:bg-blue-300"
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                    <button 
                        onClick={() => setIsEditing(false)} 
                        disabled={isLoading}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 rounded disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`p-4 mb-4 rounded border shadow-sm flex flex-col sm:flex-row justify-between items-start transition-colors ${todo.completed ? 'bg-gray-100 border-gray-200 opacity-70' : 'bg-white border-gray-300 hover:border-blue-300'}`}>
            <div className="flex items-start gap-3 w-full">
                <input 
                    type="checkbox" 
                    checked={todo.completed || false} 
                    onChange={handleUpdateStatus}
                    disabled={isLoading}
                    className="mt-1.5 h-4 w-4 cursor-pointer"
                />
                
                <div className="flex-1">
                    <h4 className={`font-semibold text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {todo.title}
                    </h4>
                    <p className={`text-sm mt-1 ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                        {todo.description}
                    </p>
                    
                    <div className="mt-3 text-xs flex gap-3 items-center">
                        <span className={`px-2 py-0.5 rounded text-white ${
                            todo.priority === 'high' ? 'bg-red-400' : 
                            todo.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                        }`}>
                            {todo.priority}
                        </span>
                        <span className="text-gray-400 font-medium">
                            {new Date(todo.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
                </div>
            </div>

            <div className="mt-3 sm:mt-0 flex gap-3 items-center">
                <button 
                    onClick={() => setIsEditing(true)} 
                    disabled={isLoading}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors disabled:opacity-50"
                >
                    Edit
                </button>
                <button 
                    onClick={handleDelete} 
                    disabled={isLoading}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors disabled:opacity-50"
                >
                    {isLoading ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    );
}

export default TodoDetails;
