import React from 'react'
import Link from 'next/link';

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserDetailsQuery } from '../lib/redux/auth/authService'
import { logout, setCredentials } from '../lib/redux/auth/authSlice'

export default function ProfileTab() {
    const { userInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    // automatically authenticate user if token is found
    const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
        // perform a refetch every 15mins
        pollingInterval: 900000,
    })

    useEffect(() => {
        if (data) dispatch(setCredentials(data))
    }, [data, dispatch])

    console.log(data)
    let isLoggedIn = false;
    return (
        <div className="relative inline-flex shrink-0 rounded-md bg-[#fff] w-[60%] h-12 top-[25px] left-[36px]">
            <button className="fit items-start bg-[#ccc] rounded-lg w-10 h-10 mt-1 ml-1">
                <div className="bg-[#transparent] text-white rounded-md ">UN</div>
            </button>
            <div className="ml-2 mt-1">
                {isFetching
                    ? (<>
                        <div className="text-sm font-semibold">Fetching...</div>
                    </>)
                    : userInfo !== null
                        ? (<>
                            <div className="text-sm font-semibold">${userInfo.firstName} ${userInfo.lastName}</div>
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
