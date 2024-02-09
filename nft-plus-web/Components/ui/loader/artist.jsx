const NftPlusL = ({isEven}) => {
    return <div className="w-full h-full  flex flex-col animate-pulse">
        <div className="h-2/3 w-full relative bg-gray-200"></div>
        <div className="w-full flex-1 bg-gray-500 relative">
            <div className="absolute z-30 left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-20 h-20 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
                <div className="w-full relative flex items-center justify-center h-full text-center text-white"></div>
            </div>
            <div className={`absolute left-0 top-0 w-full h-full ${isEven ? 'bg-gray-300' : ''} bg-opacity-50 text-center flex flex-col justify-end items-center text-white`}>
                <p className="mb-4 text-lg w-1/2 py-2 bg-gray-300"></p>
                <h2 className="mb-10 text-xl lg:text-2xl font-bold w-2/3 py-2 bg-gray-300"></h2>
            </div>
        </div>
    </div>
}

export default NftPlusL