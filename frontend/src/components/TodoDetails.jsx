import React from "react";
import { useTodocontext } from "./usetodocontext";
import { useAuthcontext } from "../hooks/useauthcontext";

function TodoDetails({ todo }) {
    const { dispatch } = useTodocontext();
    const { user } = useAuthcontext();

    const handleDelete = async () => {
        if (!user) {
            return;
        }

        const apiurl = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const response = await fetch(`${apiurl}/api/todos/${todo._id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "DELETE_TODO", payload: json });
        }
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex justify-between items-start transition-transform hover:-translate-y-1 hover:shadow-lg">
            <div className="flex flex-col gap-2">
                <h4 className="text-xl font-bold text-purple-700">{todo.title}</h4>
                <p className="text-gray-600 text-sm">{todo.description}</p>
                <div className="flex gap-4 mt-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-purple-100 text-purple-800 rounded-md">
                        Priority: {todo.priority}
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-800 rounded-md">
                        {new Date(todo.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
            <button 
                onClick={handleDelete}
                className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                title="Delete Todo"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    );
}

export default TodoDetails;
