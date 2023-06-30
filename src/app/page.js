"use client";
import Tree from "./components/Tree";
import React from "react";
import { useDirs } from "./hooks/useDirs";
import { ACTIONS, MODES } from "./constants";

export default function Home() {
  const { fnDispatch, state } = useDirs();
  const { status } = state;
  React.useEffect(() => {
    if (status === MODES.success) {
      fnDispatch({
        type: ACTIONS.updateTree,
        id: "",
      });
    }
  }, [status]);
  return (
    <>
      {status === MODES.loading ? (
        <div className="text-yellow-500">Loading...</div>
      ) : status === MODES.error ? (
        <div className="text-red-400">No data</div>
      ) : (
        <Tree first={true} />
      )}
    </>
  );
}
