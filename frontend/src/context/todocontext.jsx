import {createContext,useReducer}from "react";
export const todocontext=createContext();
export const todoreducer=(state,action)=>{
    switch(action.type){
        case "SET_TODOS":
            return{todos:action.payload};   
        case "ADD_TODO":
            return{todos:[action.payload,...state.todos]};
        case "DELETE_TODO":
            return{todos:state.todos.filter((t)=>t._id!==action.payload._id)};
        case "UPDATE_TODO":
            return{todos:state.todos.map((t)=>t._id===action.payload._id ? action.payload : t)};
        default:
            return state;
    }
}
export const Todocontextprovider=({children})=>{
    const [state,dispatch]=useReducer(todoreducer,{todos:null});
    return(
        <todocontext.Provider value={{...state,dispatch}}>
            {children}
        </todocontext.Provider>
    )
}