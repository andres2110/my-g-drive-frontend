"use client";
import React from "react";
import Tree from "../components/Tree";
import { useDirs } from "../hooks/useDirs";
import { useParams } from "next/navigation";
import { ACTIONS } from "../constants";

export default function TreeContainer() {
  const { fnDispatch } = useDirs();
  const { id } = useParams();

  React.useEffect(() => {
    fnDispatch({
      type: ACTIONS.updateTree,
      path: "-",
      id: id,
    });
  }, []);

  return (
    <>
      <Tree first={false} />
    </>
  );
}
