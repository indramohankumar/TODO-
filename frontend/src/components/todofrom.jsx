import React,{useState} from "react";
import { useTodocontext } from "./usetodocontext";
import { useAuthcontext } from "../hooks/useauthcontext";
function TodoForm() {
    const {dispatch}=useTodocontext();
    const {user}=useAuthcontext();
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [priority,setPriority]=useState("medium");
    const [error,setError]=useState(null);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!user){
            setError("You must be logged in");
            return;
        }
        const todo={title,description,priority};
        try{
            const apiurl=import.meta.env.VITE_API_URL || "http://localhost:3000";
            const response=await fetch(`${apiurl}/api/todos`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${user.token}`
                },
                body:JSON.stringify(todo)
            });
            const json=await response.json();
            if(!response.ok){
                setError(json.error);
            }
            if(response.ok){
                setTitle("");
                setDescription("");
                setPriority("");
                setError(null);
                dispatch({type:"ADD_TODO",payload:json});
            }
        }catch(error){
            setError("An error occurred while creating the todo");
        }
    }
    return(
        <form className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Create a New Todo</h3>
            
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Title:</label>
                <input 
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                    type="text" 
                    onChange={(e)=>setTitle(e.target.value)} 
                    value={title} 
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Description:</label>
                <input 
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                    type="text" 
                    onChange={(e)=>setDescription(e.target.value)} 
                    value={description} 
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Priority:</label>
                <select 
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow bg-white"
                    onChange={(e)=>setPriority(e.target.value)} 
                    value={priority}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <button 
                className="mt-2 bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors shadow-md active:scale-95"
                type="submit"
            >
                Add Todo
            </button>

            {error && <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg text-sm text-center mt-2">{error}</div>}
        </form>
    )
}
export default TodoForm;