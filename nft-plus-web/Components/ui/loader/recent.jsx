const RecentWorkL = ({isMarket}) => {

    return (
        <div className={`${isMarket ? 'h-[500px]' : 'h-full'} w-full  flex animate-pulse border flex-col`}>
            <div className="w-full h-2/3 relative bg-gray-300">
                <div className="absolute h-full w-full top-0">
                    <div className="relative h-full w-full"></div>
                </div>
            </div>
            <div className={`flex-1`}>
                <div className="w-full flex flex-col text-left p-4 h-full">
                    <p className="pb-1 pt-1 mt-4 border-b mb-2 text-[#838383] text-sm font-[700] md:text-[15px] p-2 w-1/2 bg-gray-300"></p>
                    <p className="pb-1 pt-1 mt-2 border-b mb-2 text-[#838383] text-sm font-[700] md:text-[15px] p-2 w-1/2 bg-gray-300"></p>
                    <div className="flex-1 flex flex-row items-stretch">
                        <div className="flex flex-1 w-full items-center">
                            <div className="w-[31px] h-[31px] md:w-10 md:h-10 relative overflow-hidden rounded-full bg-gray-200"></div>
                            <p className="ml-2 text-[#444] text-base md:text-lg truncate flex-1 p-2 w-[50px] bg-gray-300 sm:text-lg  font-[400]"></p>
                        </div>
                        <div className="flex gap-2 justify-end w-full items-center">
                            <div className="flex h-6 w-[70px] items-center bg-gray-300">
                                <p className={`text-base text-[#555] md:text-base ml-px`}></p>
                            </div>
                            <div className="flex w-[70px] h-6 bg-gray-300 items-center">
                                <p className={`text-base text-[#555] md:text-base ml-px`}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RecentWorkL;
