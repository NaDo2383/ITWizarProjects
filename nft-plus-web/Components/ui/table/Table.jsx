import { MdOutlineImageNotSupported } from "react-icons/md";
import Link from "next/link";
import Web3 from "web3";
import useArtworkTranslation from "locale/useArtworkTranslation";

function Table({ transaction, cols, rows }) {
  const { noContentI18 } = useArtworkTranslation();
  
  return (
    <div className="w-full">
      {rows && rows?.length !== 0 ? (
        <table className={`w-full h-auto border border-[#4E4E4E] overflow-auto`}>
          <thead
            className={`${transaction ? "" : "opacity-0 hidden"
              } w-full bg-[#f8f8f8]`}
          >
            <tr className={`w-full border-b border-[#4E4E4E] border-t-2`}>
              {cols.map((col, index) => {
                return (
                  <th
                    key={`column-${index}`}
                    className={`border-r border-[#4E4E4E] ${transaction ? "text-[#333]" : "text-black"
                      } py-2 font-normal`}
                  >
                    {col}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={`w-full text-center`}>
            {rows?.map((row, index) => {
              const {
                event,
                price,
                sellerName,
                buyerName,
                createdDate,
                period,
                agrementDate,
                sellerId,
                buyerId,
                currency,
              } = row;
              return transaction ? (
                <tr key={`item-${index}`} className="border-b border-[#4E4E4E]">
                  <td
                    className={`text-[#DDD] w-1/5 border-r border-[#4E4E4E] py-2 text-[15px] font-[300]`}
                  >
                    {event}
                  </td>
                  <td
                    className={`text-[#DDD] w-1/5 border-r border-[#4E4E4E] py-2 text-[15px] font-[400]`}
                  >
                    {Web3.utils.fromWei((price || "0").toString(), "ether")}{" "}
                    {currency}
                  </td>
                  <td
                    className={`text-[#DDD] w-1/5 border-r border-[#4E4E4E] py-2 text-[15px] underline font-[300]`}
                  >
                    <Link href={`/artist/${sellerId}`}>{sellerName}</Link>
                  </td>
                  <td
                    className={`text-[#DDD] w-1/5 border-r border-[#4E4E4E] py-2 text-[15px] underline font-[300]`}
                  >
                    <Link href={`/artist/${buyerId}`}>{buyerName}</Link>
                  </td>
                  <td
                    className={`text-[#DDD] w-1/5 border-r border-[#4E4E4E] py-2 text-[15px] font-[300]`}
                  >
                    {createdDate}
                  </td>
                </tr>
              ) : (
                <tr key={`item-${index}`} className="border-b border-[#4E4E4E]">
                  <td
                    className={`text-[#DDD] w-1/2 border-r border-[#4E4E4E] py-2 text-[13px] md:text-[15px] font-[300]`}
                  >
                    {period}
                  </td>
                  <td
                    className={`text-[#DDD] w-1/2 border-r border-[#4E4E4E] py-2 text-[13px] md:text-[15px] font-[300]`}
                  >
                    {agrementDate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="w-full lg:h-64 sm:h-64 h-16 flex flex-col items-center justify-center bg-[#1F1F1F]">
         {/* <MdOutlineImageNotSupported className="text-8xl text-[#666666]" /> */}
          <h4 className="lg:text-[16px] sm:text-[16px] text-[12px] font-[400] text-[#666666]">{noContentI18}</h4>
        </div>
      )}
    </div>
  )
}

export default Table