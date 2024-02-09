/**
 * @createdBy duka
 */
import { useState } from "react";
import Image from "next/image";
import useArtworkTranslation from "locale/useArtworkTranslation";
import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import PopupContainer from "Components/ui/popup/popupMaterials/PopupContainer";
import PopupContent from "Components/ui/popup/popupMaterials/PopupContent";
import PopupActionButtons from "Components/ui/popup/popupMaterials/PopupActionButtons";
import closeIcon from "public/close.svg";
import useCrud from "common/axios/crud";
import { useRouter } from "next/router";
import useCommonTranslation from "locale/useCommonTranslation";
import useAlertTranslation from "locale/useAlertTranslation";
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import CheckboxRounded from "Components/ui/checkbox/CheckboxRounded";

const ReportPopup = () => {
	const { selectReasonReportingI18 } = useAlertTranslation();
	const { reportPlaceholderI18 } = useCommonTranslation();
	const {
		reportI18,
		cancel,
		reportReceivedI18,
		incaseVariousReasonsI18,
		plsSelectRepresentiveReasonI18,
		unauthorizedUsePeoplesWorkI18,
		copyrightViolationI18,
		etcI18,
		uploadFileI18,
		fileSelection: fileSelectionI18,
		writeReasonFirstI18,
		mobileFileInputLabelOptional
	} = useArtworkTranslation();
	const { authUser } = useAuthUser();
	const { query } = useRouter();
	const { postModel } = useCrud();
	const { handleShowModal, hideModal, MODAL_TYPES, popupProps } = usePopup();
	const [form, setForm] = useState({
		unauthorized: false,
		violation: false,
		other: false,
		reason: "",
		reportFile: null
	});
	const [formError, setFormError] = useState({
		unauthorized: null,
		violation: null,
		other: null,
		reason: null,
		reportFile: null
	});
	function handleCheck(e) {
		const { name, checked } = e.target;
		setForm(prev => ({ ...prev, [name]: checked }));
	}
	function handleText(e) {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
		setFormError((prev) => ({ ...prev, [name]: null }));
	}
	function handleFile(e) {
		const { name, files } = e.target;
		setForm((prev) => ({ ...prev, [name]: files[0] }));
	}

	async function sendReport() {
		try {
			const formData = new FormData();
			formData.append("reason", form.reason);
			formData.append("unauthorized", form.unauthorized);
			formData.append("violation", form.violation);
			formData.append("other", form.other);
			formData.append("artworkId", query?.id);
			form.reportFile && formData.append("reportFile", form.reportFile);
			postModel("/artwork/report/register", formData, true);
		} catch (e) {
			console.error(e);
		}
	}

	async function handleReport() {
		if (authUser.id)
			if (form.reason === "") {
				setFormError((prev) => ({ ...prev, reason: writeReasonFirstI18 }));
				return;
			}
		if (!form.unauthorized && !form.violation && !form.other) {
			alert(selectReasonReportingI18);
			return;
		}
		sendReport().then(() => handleShowModal(MODAL_TYPES.REPORT_DECLARATION));
	}

	return (
		<MainPopup width={530}>
			<PopupContainer>
				<div className="flex flex-row justify-between">
					<div className="block sm:hidden w-[25px] h-[25px]"></div>
					<h3 className="sm:text-[22px] text-[18px] text-[#fff] sm:font-bold font-medium">{reportI18}</h3>
					<button onClick={() => hideModal()} className="sm:w-[29px] sm:h-[29px] w-[25px] h-[25px] self-center">
						<Image src={closeIcon} alt="closeIcon" />
					</button>
				</div>
				<PopupContent>
					<div className="w-full font-medium text-[22px] mt-[30px]">
						<p className="sm:text-[18px] text-[14px] text-[#DDD] font-[400]">
							{incaseVariousReasonsI18} <br className="hidden sm:block" />{" "}
							{plsSelectRepresentiveReasonI18}
						</p>
						<div className="font-light text-[15px] mt-[30px]">
							{formError.reason && (
								<div className="block text-center mb-6 text-sm text-[red]">
									<p>{formError.reason}</p>
								</div>
							)}
							<div className="flex items-center gap-2">
								{/* <RadioBox
									id="check1"
									value={1}
									name="unauthorized"
									onChange={(e) => handleCheck(e)}
									checked={true}
								/> */}
								<CheckboxRounded
									id="public"
									name="unauthorized"
									checked={form.unauthorized}
									onChange={handleCheck}
									rounded={true}
								/>
								<label htmlFor="check1" className="cursor-pointer text-[#B0B0B0] font-[400] sm:text-[15px] text-[14px]">
									{unauthorizedUsePeoplesWorkI18}
								</label>
							</div>
							<div className="flex items-center gap-2">
								{/* <RadioBox
									id="check2"
									value={2}
									name="violation"
									onChange={(e) => handleCheck(e)}
									checked={form.violation}
								/> */}
								<CheckboxRounded
									id="public"
									name="violation"
									checked={form.violation}
									onChange={handleCheck}
									rounded={true}
								/>
								<label htmlFor="check2" className="cursor-pointer text-[#B0B0B0] font-[400] sm:text-[15px] text-[14px]">
									{copyrightViolationI18}
								</label>
							</div>
							<div className="flex items-center gap-2">
								{/* <RadioBox
									id="check3"
									value={3}
									name="other"
									checked={form.other}
									onChange={(e) => handleCheck(e)}
								/> */}
								<CheckboxRounded
									id="public"
									name="other"
									checked={form.other}
									onChange={handleCheck}
									rounded={true}
								/>
								<label htmlFor="check3" className="cursor-pointer text-[#B0B0B0] font-[400] sm:text-[15px] text-[14px]">
									{etcI18}
								</label>
							</div>
							<textarea
								rows="3"
								name="reason"
								value={form.reason}
								onChange={handleText}
								className={`min-h-[130px] reportPopup-textarea text-white border-[0.5px] border-[#0F1111] bg-[#0F1111] placeholder-[#5A5A5A] sm:text-[15px] text-[14px] ${formError.reason && "border-red-400"
									}`}
								placeholder={reportPlaceholderI18}
							/>
							<div></div>
							<div className="flex flex-col sm:mt-4 mt-[25px] gap-[10px]">
								<h2 className="sm:text-[16px] text-[14px]">{mobileFileInputLabelOptional}</h2>
								<div className="flex flex-row gap-2">
								<input
									hidden
									type="file"
									name="reportFile"
									id="alertFileName"
									onChange={handleFile}
									className="sm:text-[15px] text-[14px]"
								/>
								<div className="reportPopu-fileName">
									{form?.reportFile
										? form?.reportFile?.name
										: formError?.reportFile
											? "report file error"
											: uploadFileI18}
								</div>
								<label htmlFor="alertFileName">
									<div className="reportPopu-label h-[40px] items-center flex">
										<p className="font-[400] text-white sm:text-[18px] text-[15px]">
											{fileSelectionI18}
										</p>
									</div>
								</label>
								</div>
							</div>
						</div>
					</div>
					<div onClick={() => handleReport()} className="sm:hidden w-full bg-[#FB3873] rounded-[5px] flex justify-center items-center h-[40px] mt-[60px] text-[15px] font-medium text-[#fff]">
						{reportReceivedI18}
					</div>
				</PopupContent>
			</PopupContainer>
			<div className="pb-4 pr-4 pt-[10px] hidden sm:block">
				<PopupActionButtons
					no={() => hideModal()}
					yes={() => handleReport()}
					btnTexts={{ no: cancel, yes: reportReceivedI18 }}
				/>
			</div>
		</MainPopup>
	);
};

export default ReportPopup;
