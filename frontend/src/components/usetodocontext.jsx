import {useContext} from "react";
import {todocontext} from "../context/todocontext";
export const useTodocontext=()=>{
    const context=useContext(todocontext);
    if(!context){
        throw Error("useTodocontext must be used inside a Todocontextprovider");
    }
    return context;
}