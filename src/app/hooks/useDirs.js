import { useContext } from "react";
import { DirsContext } from "../context/directories";



export const useDirs = () => {
    const context = useContext(DirsContext);
    if(context === undefined){
        throw new Error('usePath must be within a PathProvider')
    }
    
    return context;
}