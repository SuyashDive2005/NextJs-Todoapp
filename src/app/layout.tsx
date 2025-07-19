import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <nav className="bg-blue-200 shadow-md rounded-full p-4 mb-6 border border-blue-400 max-w-4xl ">
            <div className="flex items-center space-x-6 align-middle">
              <h1 className="text-xl font-semibold text-gray-800">Todo App</h1>
              <div className="flex space-x-4 justify-center pl-40 font-bold">
                <Link 
                  href="/add-todo" 
                  className="px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50  hover:shadow-md hover:scale-105 hover:rounded-4xl rounded-md transition-colors duration-200 font-medium"
                >
                  Add Todo
                </Link>
                <Link 
                  href="/all-todos" 
                  className="px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 hover:shadow-md hover:scale-105 hover:rounded-4xl rounded-md transition-colors duration-200 font-medium"
                >
                  All Todos
                </Link>
              </div>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}