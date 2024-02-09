import useArtworkTranslation from "locale/useArtworkTranslation";
import Link from "next/link";
import React from "react";
import useArtDetail from "./useArtDetail";
import { MdOutlineImageNotSupported } from "react-icons/md";
import useCurrency from "common/metamask/useCurrency";

function TransactionHistory(props) {
	const { isEvent } = props;
	const { ownershipTransactionsI18, noContentI18 } = useArtworkTranslation();
	const { artDetail } = useArtDetail();
	const { toEthers } = useCurrency();

	return (
		<div className="w-full">
			{!isEvent && (
				<div className="sm:pb-[30px] pb-[15px]">
					<h3 className="artwork-title">{ownershipTransactionsI18}</h3>
				</div>
			)}    
			<div className="pt-0 w-full overflow-x-auto chainInformation">
				<table className={`w-full ${isEvent && "mt-[20px]"}`}>
					<thead className="w-full bg-[#2F2E39]"> 
						<tr>
							<th className={`${isEvent?"text-[14px] text-[#DDD] font-medium pt-[4px] pb-[4px]":"transaction-th"}`}>Event</th>
							<th className={`${isEvent?"text-[14px] text-[#DDD] font-medium pt-[4px] pb-[4px]":"transaction-th"}`}>Price</th>
							<th className={`${isEvent?"text-[14px] text-[#DDD] font-medium pt-[4px] pb-[4px]":"transaction-th"}`}>From</th>
							<th className={`${isEvent?"text-[14px] text-[#DDD] font-medium pt-[4px] pb-[4px]":"transaction-th"}`}>To</th>
							<th className={`${isEvent?"text-[14px] text-[#DDD] font-medium pt-[4px] pb-[4px]":"transaction-th"}`}>Date</th>
						</tr>
					</thead>
					<tbody className="text-center">
						{artDetail?.ownershipLogs.length > 0 ? (
							artDetail?.ownershipLogs.map((log, idx) => (
								<tr key={"log-" + idx} >
									<td className={`transaction-td ${isEvent?"border-0 text-[14px]":""}`}>{log.event}</td>
									<td className={`transaction-td ${isEvent?"border-0 text-[14px]":""}`}>
										<span className="font-[700] text-[14px] text-[#DDD]">{toEthers(log.price)} </span>
										<span className="font-[400] text-[14px] text-[#DDD]">{log.currency}</span>
									</td>
									<td className={`transaction-td underline ${isEvent?"border-0 text-[14px]":""}`}>
										<Link href={"/artist/" + log.sellerId}>
											<a>{log.sellerName}</a>
										</Link>
									</td>
									<td className={`transaction-td underline ${isEvent?"border-0 text-[14px]":""}`}>
										<Link href={"/artist/" + log.buyerId}>
											<a>{log.buyerName}</a>
										</Link>
									</td>
									<td className={`transaction-td ${isEvent?"border-0 text-[14px]":""}`}>{log.createdDate}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={5}>
									<div className="w-full h-64 flex flex-col items-center justify-center">
										<MdOutlineImageNotSupported className="text-8xl text-[#666]" />
										<h4 className="font-[500]">{noContentI18}</h4>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default TransactionHistory;
