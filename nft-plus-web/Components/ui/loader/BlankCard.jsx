import {IoImagesOutline} from "react-icons/io5";

const Blank = ({isFirst}) => {
    return (
        <div className={`rounded-2xl relative overflow-hidden lg:h-auto shadow-xl ${isFirst ? "col-start-1 row-start-1 lg:row-end-3 xl:row-end-3 col-end-3 h-64 md:h-96" : "h-36 md:h-64"}`}>
            <div className={`w-full h-full absolute top-0 left-0 text-left flex items-center justify-center text-5xl px-[8%] py-[6%] text-white z-30`}>
                <IoImagesOutline />
            </div>
        </div>
    );
};

export default Blank;
