import React, {useEffect, useState} from "react";
import { HiCheck } from "react-icons/hi";
import usePopup from 'Components/ui/popup/usePopup'
import useMyPageTranslation from 'locale/useMypageTranslation'
import useArtworkTranslation from "locale/useArtworkTranslation";

function LicensePopupTable() {
    const { getCurrentModalprops } = usePopup()
    const {
        worknameI18, author_and_copyright_licenserI18, copyright_userI18,
        subject_rightI18,
        applicantI18,
        addressI18,
        contactI18,
        license_periodI18,
        license_payoutI18,
        applicantNameI18,
        sumI18,
        payment_periodI18,
        time_limitI18,
        purpose_to_useI18
    } = useMyPageTranslation();
    const { allRightsI18 } = useArtworkTranslation();
    const [thisProps, setThisProps] = useState(null)

    useEffect(() => {
        getCurrentModalprops().then(res => setThisProps(res))
    }, [])

    return (
        <div className='sm:pt-8 tracking-tighter max-w-[620px] mx-auto h-[500px] sm:h-fit'>
            <table className="table-fixed w-full">
                <thead className="w-full bg-white">
                    <tr className="table-tr h-[48px]">
                        <th className="table-header">
                            {worknameI18}
                        </th>
                        <th className="table-body">
                            {thisProps?.license?.artworkName ? thisProps?.license?.artworkName : " "}
                        </th>
                    </tr>
                </thead>
                <tbody className="w-full">
                    <tr className="table-tr h-[68px]">
                        <td className="table-header border-l-0 text-left">
                            {author_and_copyright_licenserI18}
                        </td>
                        <td className="table-body border-r-0 text-left">
                            {thisProps?.license?.artworkOwnerName ? thisProps?.license?.artworkOwnerName : " "}
                        </td>
                    </tr>
                    <tr className="table-tr h-[49px]">
                        <td className="table-header border-l-0 text-left">
                            {copyright_userI18}
                        </td>
                        <td className="table-body border-r-0 text-left">
                            {thisProps?.license?.buyerName ? thisProps?.license?.buyerName : " "}
                        </td>
                    </tr>
                    <tr className="table-tr h-[106px]">
                        <td className="table-header border-l-0 text-left">
                            {subject_rightI18}
                        </td>
                        <td className="table-body border-r-0 text-left">
                            {thisProps?.license?.rights &&
                                thisProps?.license?.rights.map((item) => (
                                    <div
                                        key={item.id}
                                        className="inline-flex  items-center"
                                    >
                                        <HiCheck className="text-[#ff00e4] text-lg" />
                                        <p className="ml-[4px] mr-[10px]">
                                            {allRightsI18[item.code]}
                                        </p>
                                    </div>
                                ))}
                        </td>
                    </tr>
                    <tr className="table-tr h-[127px]">
                        <td className="table-header border-l-0 text-left">
                            {applicantI18}
                        </td>
                        <td className="table-body border-r-0">
                            <ul className="">
                                <li className="flex items-center">
                                    <div className="w-[3px] h-[3px] bg-bgcolor mr-[5px]"></div>
                                    {applicantNameI18} :{" "}
                                    {thisProps?.license?.applicantName ? thisProps?.license?.applicantName : " "}
                                </li>
                                <li className="flex items-center">
                                    <div className="w-[3px] h-[3px] bg-bgcolo mr-[5px]"></div>
                                    <p className="text-tcolor">
                                        {addressI18} :{" "}
                                        {thisProps?.license?.applicantAddress
                                            ? thisProps?.license?.applicantAddress
                                            : " "}
                                    </p>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-[3px] h-[3px] bg-bgcolor mr-[5px]"></div>
                                    {contactI18} :{" "}
                                    {thisProps?.license?.applicantContact ? thisProps?.license?.applicantContact : " "}
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr className="table-tr h-[48px]">
                        <td className="table-header border-l-0 text-left">
                            {license_periodI18}
                        </td>
                        <td className="table-body border-r-0 text-left">
                            <p className=" font-[300] text-tcolor">
                                {thisProps?.license?.permissionPeriod ? thisProps?.license?.permissionPeriod : " "}
                            </p>
                        </td>
                    </tr>
                    <tr className="table-tr h-[49px]">
                        <td className="table-header border-l-0 text-left">
                            {license_payoutI18}
                        </td>
                        <td className="table-body border-r-0 text-left">
                            <div className="flex flex-row">
                                <p className=" font-[500] text-tcolor">
                                    {thisProps?.license?.paymentAmount ? thisProps?.license?.paymentAmount : " "}{" "}
                                    {thisProps?.license?.artworkCurrency}
                                </p>
                                <p className=" font-[300] text-tcolor ml-3">
                                    {" "}
                                    ({sumI18})
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr className="table-tr h-[49px]">
                        <td className="table-header border-l-0 text-left">
                            {payment_periodI18}
                        </td>
                        <td className="table-body border-r-0 text-[#FF0000] text-left">
                            {time_limitI18}
                        </td>
                    </tr>
                    <tr className="table-tr h-[103px]">
                        <td className="table-header border-l-0 text-left">
                            <p>{purpose_to_useI18}</p>
                        </td>
                        <td className="table-body border-r-0 text-left">
                            {thisProps?.license?.purpose ? thisProps?.license?.purpose : " "}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default LicensePopupTable