// /**
//  * @createdBy Phill Anderson 2022/12/19
//  */
// import React, {useState} from "react";
// import useArtworkTranslation from "locale/useArtworkTranslation";
// import {useGlobalModalContext} from "./_context";
// import Image from "next/image";
// import Checkbox from "../Checkbox";
// import MainPopup from "../MainPopup";
// import useArtDetail from "Components/ArtDetail/_useArtDetail";

// function ReportItPopup() {
//     const {plsSelectRepresentiveReasonI18, fileSelection: fileSelectionI18, unauthorizedUsePeoplesWorkI18, incaseVariousReasonsI18, copyrightViolationI18, writeReasonFirstI18, uploadFileI18, etcI18} = useArtworkTranslation();
//     const {id} = useArtDetail();
//     const {hideModal} = useGlobalModalContext();
//     const [isCheck, setIsCheck] = useState(false);
//     const [isCheck1, setIsCheck1] = useState(false);
//     const [isCheck2, setIsCheck2] = useState(false);
//     const [alertFileName, setAlertFileName] = useState(null);
//     const [reason, setReason] = useState("");
//     const [reportFile, setReportFile] = useState(null);
//     const [isEmpty, setIsEmpty] = useState(false);
//     const [errorCheck, setErrorCheck] = useState(false);
//     const [reportSuc, setReportSuc] = useState(false);

//     const reportItRefresh = () => {
//         setIsCheck1(false);
//         setIsCheck2(false);
//         setIsCheck(false);
//         setReason("");
//         setAlertFileName(null);
//         setReportFile(null);
//     };
//     const reportIt = async () => {
//         if (!isCheck1 && !isCheck2 && !isCheck) {
//             setErrorCheck(true);
//             setIsEmpty(true);
//             alert(selectReasonReportingI18);
//         } else if (reason.trim() == "") {
//             setErrorCheck(true);
//             setIsEmpty(true);
//         } else {
//             setErrorCheck(false);
//             setIsEmpty(false);
//             try {
//                 setLoading(true);
//                 const formData = new FormData();
//                 formData.append("reason", reason);
//                 formData.append("unauthorized", isCheck1);
//                 formData.append("violation", isCheck2);
//                 formData.append("other", isCheck);
//                 formData.append("artworkId", id);
//                 reportFile && formData.append("reportFile", reportFile);

//                 dispatch(
//                     createArtworkReport({
//                         body: formData,
//                     })
//                 );

//                 reportItRefresh();
//             } catch (err) {}
//             setReportSuc(true);
//         }
//     };
//     return (
//         <MainPopup>
//             <div className="full">
//                 <div className=" font-medium text-[22px]">
//                     <div className="flex justify-center items-center  font-medium text-[20px] mt-9">
//                         <Image src={erro} alt="" />
//                         <div className="ml-4">
//                             {incaseVariousReasonsI18}
//                             <br />
//                             {plsSelectRepresentiveReasonI18}
//                         </div>
//                     </div>
//                     <div className=" font-light text-[15px] mt-10">
//                         <div className={`${errorCheck === true ? "block" : "hidden"} text-center mb-6 text-sm text-[red]`}>
//                             <p>{writeReasonFirstI18}</p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <Checkbox onChange={() => setIsCheck1(!isCheck1)} checked={isCheck1} rounded={true} id="check1" />
//                             <label htmlFor="check1" className="cursor-pointer">
//                                 {unauthorizedUsePeoplesWorkI18}
//                             </label>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <Checkbox onChange={() => setIsCheck2(!isCheck2)} checked={isCheck2} rounded={true} id="check2" />
//                             <label htmlFor="check2" className="cursor-pointer">
//                                 {copyrightViolationI18}
//                             </label>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <Checkbox onChange={() => setIsCheck(!isCheck)} checked={isCheck} rounded={true} id="check3" />
//                             <label htmlFor="check3" className="cursor-pointer">
//                                 {etcI18}
//                             </label>
//                         </div>
//                         <textarea
//                             placeholder={placeholder}
//                             // disabled={!isCheck}
//                             value={reason}
//                             onChange={(e) => setReason(e.target.value)}
//                             className={`${isEmpty === true ? "border-red-600" : "border-black"} mt-3 resize-none w-full px-[13px] focus:outline-none py-[10px] text-gray-700 border rounded-lg  font-light leading[28px] text-[15px]`}
//                             rows="3"></textarea>
//                         {/* <input onChange={(e) => setReportFile(e.target.files[0])} type="file" name="" id="" /> */}
//                         <div className="flex items-center mt-4 gap-2">
//                             <input
//                                 type="file"
//                                 id="alertFileName"
//                                 hidden
//                                 onChange={(e) => {
//                                     if (e.target.files.length !== 0) {
//                                         setAlertFileName(e.target.files[0].name);
//                                         setReportFile(e.target.files[0]);
//                                     }
//                                 }}
//                             />
//                             {alertFileName ? (
//                                 <div className="font-light text-[15px] truncate flex items-center text-gray-400 border border-[#cccccc] h-[40px] w-full sm:w-[440px] px-2 rounded-lg">{alertFileName}</div>
//                             ) : (
//                                 <div className="font-light text-[15px] truncate flex items-center text-gray-400 border border-[#cccccc] h-[40px] w-full sm:w-[440px] px-2 rounded-lg">{uploadFileI18}</div>
//                             )}
//                             <label htmlFor="alertFileName">
//                                 <div className="cursor-pointer border border-[#000] w-[77px] py-2 px-2 rounded-lg bg-[#f5f5f5] no-underline">
//                                     <p className="font-light text-[#000]">{fileSelectionI18}</p>
//                                 </div>
//                             </label>
//                         </div>
//                     </div>
//                 </div>
//                 <button onClick={reportIt}>confirm</button>
//                 <button onClick={hideModal}>cancel</button>
//             </div>
//         </MainPopup>
//     );
// }

// export default ReportItPopup;
