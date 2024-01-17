import React, { useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';


export default function Week() {
    const { daySelected } = useContext(GlobalContext);
    const weekDay = dayjs(daySelected).format("ddd");
    const monthDay = dayjs(daySelected).format("MMM DD");


    const hours = [];
    for (let i = 0; i < 24; i++) {
        hours.push(i);
    }

    return (
        <div className="bg-white p-4 w-[100%]">
            <div className="flex ml-[5vw]">
                <div className="flex flex-col">
                    <div  className="bg-[#fff] text-center font-bold border border-y-0 h-6 w-[66.5vw]">{weekDay}</div>
                    <div className="bg-[#fff] text-center text-[#52AB98] font-bold border border-t-0 h-6 w-[66.5vw]">{monthDay}</div>
                </div>
            </div>
            <div className="flex">
                <div className="bg-[#fff] text-gray-400 text-center h-12 w-[5vw]">all day</div>

                <div className="flex">
                    <div className="bg-[#fff] text-center border border-t-0 h-12 w-[66.5vw]">{ }</div>
                </div>

            </div>
            <div className="max-h-[600px] overflow-auto">
                {hours.map((hour) => (
                    <div key={"Hours" + hour} className="flex ">
                        <div className="bg-[#fff] text-gray-400 p-2 text-center w-[5vw]">
                            {hour < 10 ? `0${hour}:00` : `${hour}:00`}
                        </div>
                        <div className="inline-flex  justify-between">

                            <div className="bg-[#fff] p-2 text-center border w-[66.5vw] h-12">{ }</div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
