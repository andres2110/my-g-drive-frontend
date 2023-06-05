"use client";
import Tree from "./components/Tree";
import React from "react";
import FileForm from "./components/FileForm";
import { PathProvider } from "./context/path.jsx";
import PathContainer from "./components/PathContainer";
import { DirsProvider } from "./context/directories";

export default function Home() {
  return (
    <DirsProvider>
      <PathProvider>
        <main className="flex h-screen flex-col items-center py-5">
          <PathContainer />
          <Tree />
          <FileForm />
          <section className="bg-[#3F3838] w-45 h-36 mt-4 justify-center items-center flex rounded-full">
            <p className="text-white"> Grafico del espacio </p>
          </section>
        </main>
      </PathProvider>
    </DirsProvider>
  );
}
//#3F3838
