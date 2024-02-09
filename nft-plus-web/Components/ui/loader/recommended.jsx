const CardL = ({isFirst , cardLoading}) => {
    return <div className={`rounded-2xl relative overflow-hidden lg:h-auto shadow-xl ${isFirst ? 'col-start-1 row-start-1 lg:row-end-3 xl:row-end-3 col-end-3 h-64 md:h-96' : 'h-36 md:h-64'}`}>
        
        <div className={`w-full h-full absolute top-0 left-0 bg-gradient-to-b ${cardLoading && 'animate-pulse'} from-transWhite to-transBlack text-left flex items-end px-[8%] py-[6%] text-white z-30`}>
            <h2 className={`${isFirst ? 'text-lg md:text-2xl' : 'text-base md:text-lg'} font-[600]`}></h2>
        </div>
    </div>
}

export default CardL;