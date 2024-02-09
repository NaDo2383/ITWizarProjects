import React from 'react'

const MainInfoSkeleton = () => {
  return (
    <div className="artDetail w-full h-full overflow-hidden relative bg-[#252525] p-[30px] border border-[#252525] rounded-[5px]">
      <div className="flex flex-col md:flex-row gap-1 items-end md:items-center justify-between mt-[40px]">
        <div className="flex flex-col">
          <div className="bg-gray-500 h-8 w-48 rounded-lg animate-pulse"></div>
        </div>
        <div className="bg-gray-500 h-8 w-32 rounded-lg animate-pulse"></div>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-16 items-center mt-[20px]">
        <div className="w-32 h-32 bg-gray-500 rounded-full animate-pulse"></div>
      </div>
      <div className="w-full">
        <div className="pb-2 w-full">
          <p className="text-[#DDD] font-[500] mb-[13px] text-[18px] mt-[74px]">
            Price
          </p>
          <div className="flex items-start md:items-center justify-between flex-col md:flex-row mb-[10px]">
            <div className="flex gap-2 items-center">
              <span className="flex justify-center bg-gray-500 h-6 w-6 rounded-full animate-pulse"></span>              
              <div className="flex items-center text-[#8E8E8E] mt-2 text-[14px] font-[400] animate-pulse">   
                <p className="text-[14px] text-[#8E8E8E] bg-gray-500 h-4 w-24 rounded"></p>
              </div>
            </div>
            <div className="flex flex-row">
              <p className="font-[400] text-[#fff] tracking-[-1px] text-[14px] mt-2 mx-2 bg-gray-500 h-4 w-16 rounded"></p>
              <span className="font-[400] text-[#fff] tracking-[-1px] text-[14px] mt-2 bg-gray-500 h-4 w-8 rounded"></span>
            </div>
          </div>
          <div className="flex gap-2.5">
            <div className="bg-gray-500 h-10 w-40 rounded animate-pulse"></div>
            <div className="bg-gray-500 h-10 w-40 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="pt-[5px] pb-4 w-full">
          <div className="bg-gray-500 h-8 w-40 rounded animate-pulse mb-4"></div>
          <div className="mb-4">
            <div className="py-2 w-full text-[#333] ">
              <h5 className="font-[500] text-[18px] text-[#DDDDDD]">
                Certified Work
              </h5>
              <ul className=" mt-2 flex flex-wrap gap-1.5">
                <li className="bg-gray-500 animate-pulse w-36 h-6 rounded"></li>
                <li className="bg-gray-500 animate-pulse w-24 h-6 rounded"></li>
                <li className="bg-gray-500 animate-pulse w-28 h-6 rounded"></li>
              </ul>
            </div>
            <div className="py-2 w-full">
              <h5 className="font-[500] text-[18px] text-[#DDD]">
                Art Details
              </h5>
              <ul className=" mt-2 flex flex-wrap gap-2.5">
                <li className="bg-gray-500 animate-pulse w-12 h-4 rounded"></li>
                <li className="bg-gray-500 animate-pulse w-16 h-4 rounded"></li>
                <li className="bg-gray-500 animate-pulse w-20 h-4 rounded"></li>
                <li className="bg-gray-500 animate-pulse w-28 h-4 rounded"></li>
              </ul>
            </div>
            <div className="py-2 w-full">
              <h5 className="font-[500] text-[18px] text-[#DDD]">
                License Available
              </h5>
              <ul className="license flex items-center flex-wrap gap-2">
                <div className="bg-gray-500 h-10 w-40 rounded animate-pulse"></div>
                <div className="bg-gray-500 h-10 w-40 rounded animate-pulse"></div>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-2 w-full gap-2">
          <div className="bg-gray-500 h-10 w-40 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default MainInfoSkeleton
