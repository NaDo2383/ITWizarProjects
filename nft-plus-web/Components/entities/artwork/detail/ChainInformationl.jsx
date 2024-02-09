import useArtworkTranslation from "locale/useArtworkTranslation";
import React from "react";
import { tamtamNftAddress } from "common/metamask/blockchain/constant.mjs";
import useArtDetail from "./useArtDetail";
import { ethers } from "ethers";
import EditRowForChainInfo from "Components/ui/table/EditRowForChainInfo";

function ChainInformation({ isEvent }) {
	const { chainInfoI18 } = useArtworkTranslation();
	const { artDetail } = useArtDetail();
	// const { convertIntoBigNumber } = useCurrency()
	// const converted = convertIntoBigNumber(artDetail?.tokenId)
	return (
		<div className="w-full ">
			{!isEvent && (
				<h3 className="lg:text-[22px] sm:text-[20px] text-[14px] font-[500] text-[#fff] lg:pl-[30px]">
					{chainInfoI18}
				</h3>
			)}

			<div className="w-full flex flex-col gap-1 sm:pt-[27px] pt-[15px] overflow-x-auto chainInformation">
				<EditRowForChainInfo title="BlockChain" bordert={true} isEvent={isEvent}>
					<div className="w-full custom-row-value-top">
						<p className={`font-[400] text-[#DDD] sm:text-[14px] text-[12px] break-all ${isEvent && "text-[14px]"}`} style={{ color: '#ddd' }}>
							{artDetail?.mintStatus === "MINTED" ? "Polygon" : "X"}
						</p>
					</div>
				</EditRowForChainInfo>
				<EditRowForChainInfo title="Contract" isEvent={isEvent}>
					<a
						href={`${process.env.polygonscanUrl}/address/${tamtamNftAddress}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<p className={`font-[400] text-[#DDD] sm:text-[14px] text-[12px] break-all no-underline ${isEvent && "text-[14px]"}`} style={{ color: '#ddd' }}>
							{artDetail?.mintStatus === "MINTED" ? tamtamNftAddress : "X"}
						</p>
					</a>
				</EditRowForChainInfo>
				<EditRowForChainInfo title="TokenID" isEvent={isEvent}>
					<p className={`font-[400] text-[#DDD] sm:text-[14px] text-[12px] break-all ${isEvent && "text-[14px]"}`} style={{ color: '#ddd' }}>
						{artDetail?.mintStatus === "MINTED"
							? artDetail?.tokenId
								? ethers.BigNumber.from(artDetail?.tokenId.toString())._hex.slice(0, 4)
								: "X"
							: "X"}
					</p>
				</EditRowForChainInfo>
				<EditRowForChainInfo title="Transaction Hash" isEvent={isEvent}>
					<a
						href={`${process.env.polygonscanUrl}/tx/${artDetail?.nftContractAddress}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<p className={`font-[400] text-[#DDD] sm:text-[14px] text-[12px] break-all no-underline sm:max-w-[400px] w-full ${isEvent ? "text-[14px] whitespace-normal" : 'whitespace-nowrap'}`} style={{ color: '#ddd' }}>
							<span className="break-all">
								{artDetail?.mintStatus === "MINTED" ? artDetail?.nftContractAddress : "X"}
							</span>
						</p>
					</a>
				</EditRowForChainInfo>
			</div>

		</div>
	);
}

export default ChainInformation;
