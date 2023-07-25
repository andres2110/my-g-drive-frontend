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
            </main>
          </PathProvider>
        </DirsProvider>
      </body>
    </html>
  );
}
