/**
 * @createdBy duka 2023/4
 */
export default function EditRow({ title, children }) {
  return (
    <div className="flex xs:flex-col sm:flex-row lg:flex-row flex-col lg:border-b sm:border-b border-n0 xs:border-0 border-[#232323]">
      <div className="flex items-center lg:py-[22px] sm:py-[22px] xs:py-0 pr-2 md:min-w-[280px] sm:min-w-[175px] min-w-[125px]">
        <p className="tracking-[-1px] lg:text-[18px] sm:text-[18px] xs:text-[15px] text-[15px] text-[#DDDDDD] capitalize  whitespace-pre-line">{title}</p>
      </div>
      <div className="flex items-center lg:pt-[11px] lg:pb-[11px] sm:pt-[11px] sm:pb-[11px] pt-[8px] pb-[35px] w-full">
        <div className="w-full flex items-center flex-wrap lg:text-[18px] sm:text-[18px] xs:text-[15px] text-[15px]">{children}</div>
      </div>
    </div>
  );
}
