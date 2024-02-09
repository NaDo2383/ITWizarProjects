export default function SwitchButton({on, change , center, loading}) {
    return (
        <div onClick={change} className={`${center && 'mx-auto'} ${loading ? 'cursor-wait' : 'cursor-pointer'} border border-[#333333] transition duration-300 p-px bg-[#A9A9A9]  rounded-full w-10 h-6 flex items-center`}>
            <div style={{transition: "width .1s ease"}} className={`${on ? "w-full" : "w-[17px]"} h-[16px] duration-300 transition bg-[#fff] flex relative items-center  rounded-full overflow-hidden`}>
                <div style={{transition: "all .3s"}} className={`h-[16px] w-[17px] transition duration-300 rounded-full right-0 absolute top-0 bg-[#333]`}></div>
            </div>
        </div>
    );
}
