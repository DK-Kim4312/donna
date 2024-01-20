import React from "react"
export default function EventBlock(
    width, 
    height,
    yPosition,
    xPosition,
    eventId,
    eventName
    ) {

    return (
        <div
            style={{
                position: 'absolute',
                top: `${yPosition}px`,
                left:`${xPosition}px`,
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: 'blue',
                borderRadius: '5px',
                border: '1px solid black',
            }}
        >
            {eventName}
        </div>
    )
}