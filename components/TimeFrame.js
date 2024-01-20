import TimeSlot from './TimeSlot'

export default function TimeFrame({calendarDays}) {
    return (
        <div className="inline-flex">
            {calendarDays.map((day, index) => (
                <div key={"Events Box" + index} className="">
                    <TimeSlot date={day} hour={hour} isFrontTime={true} />
                    <TimeSlot date={day} hour={hour} isFrontTime={false} />
                </div>
            ))}
        </div>
    )
}