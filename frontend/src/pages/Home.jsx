import React, { useEffect } from "react";
import TodoDetails from "../components/TodoDetails";
import TodoForm from "../components/todofrom";
import { useTodocontext } from "../components/usetodocontext";
import { useAuthcontext } from "../hooks/useauthcontext";

function Home() {
    const { todos, dispatch } = useTodocontext();
    const { user } = useAuthcontext();

    useEffect(() => {
        const fetchTodos = async () => {
            // This establishes the connection between our React Frontend and our Node/Express Backend.
            // We set the API URL to port 3000 where our backend server is listening.
            const apiurl = import.meta.env.VITE_API_URL || "http://localhost:3000";
            
            // We use fetch() to make an HTTP GET request to the backend route '/api/todos'.
            // We also send the user's secure token in the Authorization header to prove they are logged in.
            const response = await fetch(`${apiurl}/api/todos`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_TODOS", payload: json });
            }
        };

        if (user) {
            fetchTodos();
        }
    }, [dispatch, user]);

    return (
        <div className="flex flex-col md:flex-row gap-8 mt-8">
            <div className="flex-1 flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Your Todos</h2>
                {todos && todos.length === 0 && (
                    <p className="text-gray-500 italic">No todos yet. Create one to get started!</p>
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
