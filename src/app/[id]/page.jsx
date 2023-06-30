"use client";
import React from "react";
import Tree from "../components/Tree";
import { useDirs } from "../hooks/useDirs";
import { useParams } from "next/navigation";
import { ACTIONS, MODES } from "../constants";

export default function TreeContainer() {
  const { fnDispatch, state } = useDirs();
  const { id } = useParams();
  const { status } = state;

  React.useEffect(() => {
    if (status === MODES.success) {
      fnDispatch({
        type: ACTIONS.updateTree,
        id: id,
      });
    }
  }, [status]);

  return (
    <>
      <Tree first={false} />
    </>
  );
}
