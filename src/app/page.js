"use client";
import Tree from "./components/Tree";
import React from "react";
import { useDirs } from "./hooks/useDirs";
import { ACTIONS } from "./constants";

export default function Home() {

  const {fnDispatch} = useDirs();
  
  React.useEffect(()=>{
    fnDispatch({
      type:ACTIONS.updateTree,
      path:''
    })
  },[])
  return (
    <>
      <Tree first={true}/>
    </>

  );
}

