import { useContext } from "react";
import { PathContext } from "../context/path.jsx";


export const usePath = () => {
    const context = useContext(PathContext);
    if(context === undefined){
        throw new Error('usePath must be within a PathProvider')
    }
    
    return context;
}