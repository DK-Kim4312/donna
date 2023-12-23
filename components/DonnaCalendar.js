
export default function Component() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex space-x-2">
          <button className="bg-gray-300">{`<`}</button>
          <button className="bg-gray-300">Today</button>
          <button className="bg-gray-300">{`>`}</button>
        </div>
        <div className="flex space-x-2">
          <button variant="ghost">Day</button>
          <button variant="ghost">Week</button>
          <button variant="ghost">Month</button>
          <button variant="ghost">Year</button>
        </div>
      </div>
    </div>
  )
}

