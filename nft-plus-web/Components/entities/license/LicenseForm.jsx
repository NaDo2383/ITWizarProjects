import React, { useEffect, useState } from "react";
import Checkbox from "Components/ui/checkbox/Checkbox";
import IC_CALEDAR from "public/IC_CALEDAR.png";
import Image from "next/image";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
	LocalizationProvider,
	PickersDay,
	DatePicker,
	CalendarPickerSkeleton
} from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { FaWonSign } from "react-icons/fa";
import useArtDetail from "../artwork/detail/useArtDetail";
import useMyPageTranslation from "locale/useMypageTranslation";
import useAuthUser from "../user/auth/useAuthUser";
import useLicenseForm from "./useLicenseForm";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useCurrency from "common/metamask/useCurrency";
import { useGlobalContext } from "common/global/useGlobalContext";

function LicenseForm() {
	const {
		aplicantInputPlaceholder1I18,
		licensePayoutInputPlaceholderI18,
		textareaPlaceholderI18,
		allRightsI18,
		plsSelectAtLeast1I18
	} = useArtworkTranslation();
	const {
		worknameI18,
		author_and_copyright_licenserI18,
		copyright_userI18,
		subject_rightI18,
		applicantI18,
		applicantNameI18,
		applicantLegalEntityI18,
		addressI18,
		contactI18,
		license_periodI18,
		license_payoutI18,
		sumI18,
		payment_periodI18,
		timeI18,
		purpose_to_useI18
	} = useMyPageTranslation();
	const { authUser } = useAuthUser();
	const { artDetail } = useArtDetail();
	const {
		handleChangeInput,
		licenseForm,
		licenseFormError,
		handleChangeContact,
		handleStartDate,
		handleEndDate,
		handleMonthChange,
		setLicenseForm,
		setLicenseFormError,
		sendLicenseRequest,
		datePickerState,
		setDatePickerState,
		tomDate,
		formatDate,
		formatDate1,
		handleSelectRight,
		handleChangePaymentAmount
	} = useLicenseForm();
	const { toWon, excreptWon } = useCurrency();
	const [convertedWon, setConvertedWon] = useState(null);
	const { activeWallets } = useGlobalContext();

	useEffect(() => {
		toWon(licenseForm?.paymentAmount, artDetail?.currency, true).then((res) =>
			setConvertedWon(res)
		);
	}, [artDetail, activeWallets, licenseForm.paymentAmount]);

	return (
		<div className="hidden md:block w-full mt-8">
			<table className="table-fixed w-full">
				<thead className="w-full">
					<tr className="w-full text-left border-t h-[48px] border-bcolor">
						<th className="w-3/12 border-r  font-[400] tracking-[-1px] text-[15px] text-black border-bcolor">
							{worknameI18}
						</th>
						<th className="licenseForm-td pl-[18px] border-r-0">
							{artDetail?.artworkName}
						</th>
					</tr>
				</thead>
				<tbody className="w-full">
					<tr className="w-full text-left border-t h-[68px] border-bcolor">
						<td className="h-[68] licenseForm-td border-l-0">
							{author_and_copyright_licenserI18}
						</td>
						<td className="h-[68px] licenseForm-td pl-[18px] border-r-0">
							{artDetail?.authorName}
						</td>
					</tr>
					<tr className="w-full border-t h-[49px] border-bcolor">
						<td className="licenseForm-td border-l-0">{copyright_userI18}</td>
						<td className="licenseForm-td pl-[18px] border-r-0">
							{authUser?.nickName}
						</td>
					</tr>
					<tr className="w-full text-left border-t h-[106px] border-bcolor">
						<td className="h-[106px] licenseForm-td border-l-0">
							{subject_rightI18}
						</td>
						<td className="h-[106px] licenseForm-td pl-[18px] border-r-0">
							{artDetail?.rights.map((el, index) => (
								<label
									key={`right-${index}`}
									htmlFor={`checkbox-${el.id}`}
									className="inline-flex pointer items-center">
									<Checkbox
										id={`checkbox-${el.id}`}
										onChange={() => handleSelectRight(el)}
									/>
									<p className="ml-[4px] mr-[10px]">{allRightsI18[el.code]}</p>
								</label>
							))}
							{licenseFormError.rights && (
								<p className="text-[red] flex">{plsSelectAtLeast1I18}</p>
							)}
						</td>
					</tr>
					<tr className="w-full text-left border-t h-[127spx] border-bcolor">
						<td className="licenseForm-td border-l-0">{applicantI18}</td>
						<td className="licenseForm-td pl-[18px] border-r-0">
							<div className="flex items-center mb-2">
								<div className="flex flex-col mr-1">
									<span className="w-24">{applicantNameI18}</span>
									<span className="w-24">{applicantLegalEntityI18}</span>
								</div>
								<input
									className={`h-9 w-full border rounded-md p-3`}
									style={{
										borderColor: licenseFormError?.applicantName
											? "red"
											: "#cccccc"
									}}
									type="text"
									name="applicantName"
									value={licenseForm?.applicantName || ""}
									onChange={handleChangeInput}
									placeholder={aplicantInputPlaceholder1I18}
								/>
							</div>
							<div className="flex items-center mb-2">
								<span className="w-32">{addressI18} </span>
								<input
									className={`h-9 w-full border rounded-md p-3`}
									style={{
										borderColor: licenseFormError?.applicantAddress
											? "red"
											: "#cccccc"
									}}
									type="text"
									name="applicantAddress"
									value={licenseForm?.applicantAddress || ""}
									onChange={handleChangeInput}
								/>
							</div>
							<div className="flex items-center mb-2">
								<span className="w-32"> {contactI18}</span>
								<input
									className={`h-9 w-full border rounded-md p-3 ${
										licenseFormError?.applicantContact
											? "border-red-400"
											: "border-[#ccc]"
									}`}
									style={{
										borderColor: licenseFormError?.applicantContact
											? "red"
											: "#cccccc"
									}}
									type="text"
									name="applicantContact"
									value={licenseForm?.applicantContact || ""}
									inputMode="numeric"
									onChange={handleChangeContact}
								/>
							</div>
						</td>
					</tr>
					<tr className="w-full text-left border-t h-[48px] border-bcolor">
						<td className="licenseForm-td border-l-0">{license_periodI18}</td>
						<td className="licenseForm-td pl-[18px] border-r-0">
							<div className="flex items-center mt-2 sm:mt-0">
								<div className="py-2 pr-2">
									<Image src={IC_CALEDAR} alt="IC_CALEDAR"  />
								</div>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										value={licenseForm?.licenseStart}
										loading={datePickerState.isLoading}
										inputFormat="yyyy/MM/dd"
										mask="____/__/__"
										onChange={handleStartDate}
										onMonthChange={handleMonthChange}
										renderInput={(params) => <TextField {...params} />}
										renderLoading={() => <CalendarPickerSkeleton />}
										renderDay={(day, _value, DayComponentProps) => {
											const isSelected =
												!DayComponentProps.outsideCurrentMonth &&
												datePickerState.highlightedDays.indexOf(day.getDate()) >
													0;

											return <PickersDay {...DayComponentProps} />;
										}}
										disablePast={true}
										minDate={tomDate}
									/>
								</LocalizationProvider>
								<span className="mx-2">~</span>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										value={licenseForm?.licenseEnd}
										loading={datePickerState.isLoading}
										inputFormat="yyyy/MM/dd"
										mask="____/__/__"
										onChange={handleEndDate}
										onMonthChange={handleMonthChange}
										renderInput={(params) => <TextField {...params} />}
										renderLoading={() => <CalendarPickerSkeleton />}
										renderDay={(day, _value, DayComponentProps) => {
											const isSelected =
												!DayComponentProps.outsideCurrentMonth &&
												datePickerState.highlightedDays.indexOf(day.getDate()) >
													0;

											return <PickersDay {...DayComponentProps} />;
										}}
										disablePast={true}
										minDate={licenseForm?.licenseStart}
									/>
								</LocalizationProvider>
							</div>
						</td>
					</tr>
					<tr className="w-full text-left border-t h-[49px] border-bcolor">
						<td className="h-[49px] licenseForm-td border-l-0">
							{license_payoutI18}
						</td>
						<td className="h-[49px]licenseForm-td pl-[18px] border-r-0">
							<div className="flex items-center">
								<input
									className={`border rounded-md py-2 px-2 w-[165px] mr-2 ${
										licenseFormError.paymentAmount
											? "border-red-400"
											: "border-[#ccc]"
									}`}
									name="paymentAmount"
									inputMode="numeric"
									placeholder={licensePayoutInputPlaceholderI18}
									value={licenseForm?.paymentAmount}
									onChange={handleChangePaymentAmount}
									pattern="[0-9]+"
								/>
								<span className=" font-medium text-[15px] mr-2">
									{artDetail?.currency === "MATIC" ? "MATIC" : "EYES"} ({sumI18}
									)
								</span>
								{licenseForm?.paymentAmount && (
									<div className="flex items-center text-[#666]">
										<FaWonSign />
										{excreptWon(convertedWon)}
									</div>
								)}
							</div>
						</td>
					</tr>
					<tr className="w-full text-left border-t h-[49px] border-bcolor">
						<td className="licenseForm-td border-l-0">{payment_periodI18}</td>
						<td className="licenseForm-td pl-[18px] border-r-0">
							<div className="sm:flex flex-row">
								<p className="flex pr-1 text-red-600">
									{formatDate1(
										(licenseForm?.licenseStart || new Date())
											.toLocaleDateString("ko-KR")
											.replaceAll(". ", "-")
											.replace(".", "")
									)}
								</p>
								<div className="flex text-red-600">{timeI18}</div>
							</div>
						</td>
					</tr>
					<tr className="w-full text-left border-y h-[103px] border-bcolor mb-[50px]">
						<td className="h-[77px] licenseForm-td border-l-0">
							<p>{purpose_to_useI18}</p>
						</td>
						<td className="licenseForm-td pl-[18px] border-r-0">
							<textarea
								placeholder={textareaPlaceholderI18}
								name="purpose"
								className={`resize-none w-full px-[14px] py-[10px] text-gray-700 border rounded-lg focus:outline-none  font-[300] leading[28px] tracking[-1px] text-[15px] text-tcolor ${
									licenseFormError.purpose ? "border-red-400" : "border-[#ccc]"
								}`}
								rows="3"
								value={licenseForm.purpose}
								onChange={handleChangeInput}
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default LicenseForm;
