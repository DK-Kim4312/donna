// To Be Implemented: InputWithLabel component
export function InputWithLabel(props) {
    return (
        <div className="w-[357px] h-[60px] pl-3 pr-[198px] pb-[41px] rounded-lg border border-black justify-start items-center inline-flex">
            <div className="self-stretch px-2 bg-white justify-center items-center gap-2.5 inline-flex">
                <div className="text-neutral-500 text-[25px] font-light font-['Poppins']">{props.text}</div>
            </div>
        </div>
    );
}