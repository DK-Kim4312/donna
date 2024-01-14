import React from 'react';

const EventBlock = ({ eventsData }) => {
    const startTime = eventsData.startTime
    const endTime = eventsData.endTime
    const title = eventsData.title
    const date = eventsData.date
    const weekday = eventsData.weekday

    function getMarginLeft(chartStartingMargin, chartBlockSize){
        if( weekday == 'Sun' ) {
            return chartStartingMargin;
        } else if( weekday == 'Mon' ) {
            return chartStartingMargin + chartBlockSize;
        } else if ( weekday == 'Tue' ) {
            return chartStartingMargin + chartBlockSize*2;
        } else if( weekday == 'Wed' ) {
            return chartStartingMargin + chartBlockSize*3;
        } else if ( weekday == 'Thu' ) {
            return chartStartingMargin + chartBlockSize*4;
        } else if( weekday == 'Fri' ) {
            return chartStartingMargin + chartBlockSize*5;
        } else if ( weekday == 'Sat' ) {
            return chartStartingMargin + chartBlockSize*6;
        }
    }

    const marginLeft = getMarginLeft(5, 9.5); //TODO: Fix



    return (
            <div className="absolute ml-[14.5vh] bg-[#52ab98] h-[5vh] w-[9.5vh] mt-[14.5vh] z-10 ">
                {title}
            </div>
    );
};

export default EventBlock;
