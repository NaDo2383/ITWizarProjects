import React, { useEffect, useState } from "react";
import Marquee from "../marquee/Marquee";
import useNotification from "Components/entities/notification/useNotification";
import { useRouter } from "next/router";

function VmButton() {
	const { locale } = useRouter();
	const { getTopNotification } = useNotification();
	const [riverNotification, setRiverNotification] = useState(null);
	
	function handleClick() {}
	useEffect(() => {
		getTopNotification().then((res) => {
			setRiverNotification(res.result);
		});
	}, [locale]);
	return (
		<button
			onClick={handleClick}
			className={`bg-black text-center text-white border border-[#000] text-[15px] font-medium rounded-full w-[200px] h-[32px] ${ riverNotification?.content ? 'block' : 'hidden' }`}>
			<Marquee>
				<div className="flex gap-4 h-[32px] items-center ">
					<p>{riverNotification?.content}</p>
					{riverNotification?.imageUrl && (
						<img
							src={riverNotification?.imageUrl}
							width={32}
							height={20}
							alt="vim image"
						/>
					)}
				</div>
			</Marquee>
		</button>
	);
}

export default VmButton;
