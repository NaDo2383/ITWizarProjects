import React from 'react'
import greenRectangle from "public/greenRectangle.png";
import Image from 'next/image';

function NodataMessage({ text }) {
    const theText = text.split(".")

  return (
    <div className="mt-8 col-span-full w-full h-[500px] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center text-[#666] lg:pt-[100px] lg:mb-[81px] sm:pt-[100px] sm:mb-[81px] pt-0 pb-0">
            <div className="flex flex-col items-center justify-center">
                <div className='lg:w-[242px] lg:h-[242px] sm:w-[242px] sm:h-[242px] w-[200px] h-[200px]'>
                    <Image src={greenRectangle} alt="greenRectangle" width={242} height={242} />
                </div>
                <p className=" font-medium lg:text-[20px] sm:text-[20px] text-[15px] text-white text-center">
                    { theText[0] || text }.<br/>
                    { theText[1] && theText[1] }
                </p>
            </div>
        </div>
    </div>
  )
}

export default NodataMessage