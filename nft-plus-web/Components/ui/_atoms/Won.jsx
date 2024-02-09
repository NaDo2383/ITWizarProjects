import useCurrency from 'common/metamask/useCurrency'
import React, { useEffect, useState } from 'react'
import { FaWonSign } from "react-icons/fa";

function Won({ value, currency }) {
    const { excreptWon, toWon } = useCurrency()
	const [convertedWon, setConvertedWon] = useState(null);

    useEffect(() => {
		toWon( value, currency, true).then((res) =>
			setConvertedWon(res)
		);
	}, [value]);
	
  return (
    <div className="flex items-center text-[#8E8E8E] sm:text-[14px] text-[11px] font-[400]">
		<FaWonSign />
		<p className="sm:text-[14px] text-[11px] text-[#8E8E8E]">
			{excreptWon(convertedWon)}
		</p>
	</div>
  )
}

export default Won