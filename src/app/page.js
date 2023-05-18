"use client";
import Tree from "./components/Tree";
import React from "react";
import { directories } from "./mocks/files.json";
import FileForm from "./components/FileForm";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center py-5">
      <section className="w-10/12 h-15 mb-5 md:w-1/2 flex gap-5 ">
        <h5 className="hidden text-white md:block">Destination: </h5>
        <div className="bg-[#D9D9D9] w-full rounded-sm px-1 ">
          <p>/Documents/Path</p>
        </div>
      </section>
      <Tree directories={directories} />
      <FileForm/>
      <section className="bg-[#3F3838] w-45 h-36 mt-4 justify-center items-center flex rounded-full">
        <p className="text-white"> Grafico del espacio </p>
      </section>
    </main>
  );
}
//#3F3838
