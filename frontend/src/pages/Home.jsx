import React, { useEffect, useState } from "react";
import TodoDetails from "../components/TodoDetails";
import TodoForm from "../components/todofrom";
import { useTodocontext } from "../components/usetodocontext";
import { useAuthcontext } from "../hooks/useauthcontext";
import axios from "axios";

function Home() {
    const { todos, dispatch } = useTodocontext();
    const { user } = useAuthcontext();
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchTodos = async (query = "") => {
        if (!user) return;
        
        setIsLoading(true);
        setError(null);
        
        try {
            const apiurl = import.meta.env.VITE_API_URL || "http://localhost:3000";
            let url = `${apiurl}/api/todos`;
            if (query) {
                url += `?search=${encodeURIComponent(query)}`;
            }
            
            const response = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            
            dispatch({ type: "SET_TODOS", payload: response.data });
        } catch (err) {
            setError(err.response?.data?.error || "Failed to fetch todos. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchTodos();
        }
    }, [dispatch, user]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchTodos(searchQuery);
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 mt-8">
            <div className="flex-1 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
                    
                    <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full sm:w-auto">
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search tasks..." 
                            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500 w-full sm:w-64"
                        />
                        <button 
                            type="submit"
                            className="bg-gray-800 text-white px-4 py-1 rounded text-sm hover:bg-gray-700 transition"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded border border-red-200">
                        {error}
                    </div>
                )}

                {isLoading && !todos && (
                    <p className="text-gray-500 italic">Loading your tasks...</p>
                )}

                {!isLoading && todos && todos.length === 0 && (
                    <div className="text-center py-10 bg-gray-50 rounded border border-gray-200 border-dashed">
                        <p className="text-gray-500">No tasks found.</p>
                        {searchQuery && (
                            <button 
                                onClick={() => { setSearchQuery(""); fetchTodos(""); }}
                                className="text-blue-500 underline mt-2 text-sm"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                )}

                {todos && todos.map((todo) => (
                    <TodoDetails key={todo._id} todo={todo} />
                ))}
            </div>
            
            <div className="w-full md:w-1/3">
                <TodoForm />
            </div>
        </div>
    );
}

export default Home;
