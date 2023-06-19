  "use client";
import "./globals.css";
import { Inter } from "next/font/google";
import FileForm from "./components/FileForm";
import { PathProvider } from "./context/path.jsx";
import PathContainer from "./components/PathContainer";
import { DirsProvider } from "./context/directories";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <DirsProvider>
          <PathProvider>
            <main className="flex h-screen flex-col items-center py-5 gap-2">
              <PathContainer />
              {children}
              <FileForm />
              <section className="bg-[#3F3838] w-45 h-36 mt-4 justify-center items-center flex rounded-full">
                <p className="text-white"> Grafico del espacio </p>
              </section>
            </main>
          </PathProvider>
        </DirsProvider>
      </body>
    </html>
  );
}
