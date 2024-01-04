import React from 'react'
import Link from 'next/link';


export default async function ProfileTab() {
    const supabase = createServerComponentClient({ cookies });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className="relative inline-flex shrink-0 rounded-md bg-[#fff] w-[60%] h-12 top-[25px] left-[36px]">
            <button className="fit items-start bg-[#ccc] rounded-lg w-10 h-10 mt-1 ml-1">
                <div className="bg-[#transparent] text-white rounded-md ">UN</div>
            </button>
            <div className="ml-2 mt-1">
                { user
                        ? (<>
                            <div className="text-sm font-semibold">${user.firstName} ${user.lastName}</div>
                            <button className="text-xs h-0.5 w-13 font-light" variant="ghost">
                                &gt; Upgrade to Premium
                            </button>

                        </>)
                        : (<>
                            <Link href="/login">
                                <div className="text-sm font-semibold">Login</div>
                            </Link>

                        </>)}
            </div>
        </div>

    )
}
