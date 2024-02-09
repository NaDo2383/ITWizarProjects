import React, { useState } from 'react'
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

function LanguageSwitcher() {
	const [isHover, setIsHover] = useState(false)
	const { locale, asPath } = useRouter();

	return (
		<Link href={asPath} locale={locale === "ko" ? "en" : "ko"}>
			<a id='language'
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				className="flex gap-1 justify-center">
				<div className="w-[13px] h-[13px]">
					{isHover ?
						<Image src={"/globe_white.svg"} width={13} height={13} alt="globe" />
						:
						<Image src={"/globe.svg"} width={13} height={13} alt="globe" />
					}
				</div>
				<h4 className="text-[15px] text-[#969696] font-[500]">
					{locale === "ko" ? "KOR" : "ENG"}
				</h4>
			</a>
		</Link>
	)
}

export default LanguageSwitcher