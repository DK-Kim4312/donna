// landing page
import React from "react";
import Link from "next/link";



export default function Landing() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#52ab9870]">
            <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
                <h1 className="text-6xl font-bold">
                    Welcome to Donna AI
                </h1>

                <p className="mt-3 text-2xl">
                    Chat with your Interactive Calendar Assistant Donna
                </p>

                <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
                    <Link
                        href="/main"
                        className="p-6 mt-6 text-left border w-96 rounded-xl bg-white hover:text-[#52ab98] focus:text-[#52ab98]"
                    >
                        <h3 className="text-2xl font-bold">Sign Up for Beta Testing &rarr;</h3>
                        <p className="mt-4 text-xl">
                            Try our beta stage product for free.
                        </p>
                    </Link>
                </div>
            </main>


            <footer className="flex items-center justify-center w-full h-24 border-t bg-white">
                <a
                    className="flex items-center justify-center"
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{" "}
                    <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
                </a>
            </footer>
        </div>
    );
}


