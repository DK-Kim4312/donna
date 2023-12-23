export default function ProfileTab() {
    return (
        <div className="flex flex-column">
            <button className="fit items-start bg-[#52ab98] p-2 rounded-lg w-10 h-10">
                <div className="bg-[#transparent] text-white rounded-md ">UN</div>
            </button>
            <div className="ml-2">
                <div className="text-sm font-semibold">USERNAME</div>
                <button className="text-xs h-0.5 w-13 font-light" variant="ghost">
                    &gt; Upgrade to Premium
                </button>
            </div>

        </div>

    )
}
