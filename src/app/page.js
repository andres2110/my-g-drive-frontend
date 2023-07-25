"use client";
import Tree from "./components/Tree";
import React from "react";
import { useDirs } from "./hooks/useDirs";
import { ACTIONS, MODES } from "./constants";

export default function Home() {
  const { state } = useDirs();
  const { status } = state;
  return (
    <>
      {status === MODES.loading ? (
        <div className="text-yellow-500">Loading...</div>
      ) : status === MODES.success ? (
        <Tree />
        // <div className="text-red-400">{state.status}</div>
      ) : (
        <div className="text-red-400">{state.error}</div>
      )}
    </>
  );
}
