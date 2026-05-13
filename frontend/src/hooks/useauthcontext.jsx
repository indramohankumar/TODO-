import {useContext} from "react";
import {authcontext} from "../context/authcontext";
export const useAuthcontext=()=>{
    const context=useContext(authcontext);
    if(!context){
        throw Error("useAuthcontext must be used inside a Authcontextprovider");
    }   
    return context;
}