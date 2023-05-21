import React from "react";
import { usePath } from "../hooks/usePath";

export default function PathContainer() {
  const { path } = usePath();
  return (
    <section className="w-10/12 h-15 mb-5 md:w-1/2 flex gap-5 ">
      <h5 className="hidden text-white md:block">Destination: </h5>
      <div className="bg-[#D9D9D9] w-full rounded-sm px-1 ">
        <p>{path}</p>
      </div>
    </section>
  );
}
