import React from 'react'
import Link from 'next/link';
import { useContext } from 'react';
import { LoginContext } from '../app/page';

export default function ProfileTab() {
    let isLoggedIn = false;
    return (
        <div className="flex flex-column">
            <button className="fit items-start bg-[#52ab98] p-2 rounded-lg w-10 h-10">
                <div className="bg-[#transparent] text-white rounded-md ">UN</div>
            </button>
            <div className="ml-2">
                {isLoggedIn ? (
                    <>
                        <div className="text-sm font-semibold">username</div>
                        <button className="text-xs h-0.5 w-13 font-light" variant="ghost">
                            &gt; Upgrade to Premium
                        </button>

                    </>
                ) : (
                    <>
                    <Link href="/login">
                        <div className="text-sm font-semibold">Login</div>
                    </Link>
                        
                    </>
                )}
            </div>
        </div>

    )
}
