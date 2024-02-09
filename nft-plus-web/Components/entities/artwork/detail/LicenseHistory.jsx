import useArtworkTranslation from "locale/useArtworkTranslation";
import React, { useEffect, useState } from "react";
import useArtDetail from "./useArtDetail";
import useArtwork from "../useArtwork";
import { PieChart } from "react-minimal-pie-chart";
import { useRouter } from "next/router";
import Table from "Components/ui/table/Table";
import moment from "moment";

function LicenseHistory() {
	const { locale } = useRouter();
	const {
		licenseTransactionsI18,
		nodataI18,
		periodOfUseI18,
		licenseAgreementDateI18,
		allRightsI18,
		unableToApllyI18,
		caseI18
	} = useArtworkTranslation();
	const { contractDocumentsList,  artDetail } = useArtDetail();
	const [chartList, setChartList] = useState(null);
	const [lices, setLices] = useState([]);
	const [selected, setSelected] = useState(0);
	const [selectedCode, setSelectedCode] = useState("");
	const rightTableHead = [periodOfUseI18, licenseAgreementDateI18];

	function calcRights(rights) {
		if (rights?.length === 0) return;
		const val = rights?.map((right, idx) => {
			return allRightsI18[rights.code];
		});
		return val;
	}
	const checkRights = (code, index) => {
		setSelected(index);
		setSelectedCode(code);
	};

	// useEffect(() => {
	// 	getArtRights().then((res) => {
	// 		const val = calcRights(res);
	// 	});
	// }, [locale]);


	function getColor (code){
		const red = Math.floor(Math.random() * 256);
		const green = Math.floor(Math.random() * 256);
		const blue = Math.floor(Math.random() * 256);
		let color = '';
		switch(code) {
			case "reproduction" :
				color = "#ff9126";
				break;
			case "publicPerformance" :
				color = "#fdcc0d"
				break;
			case "publicTransmission" :
				color = "#ef4971";
				break;
			case "publicExhibition" : 
				color = "#705fc9";
				break;	 	
			case "distribution" :
				color = "#0e85c8";
				break;
			case "rental" :
				color = "#44bed4";
				break;
			case "derivativeWork" :
				color = "#3fb048";
				break;
			default : 
				color = `rgb(${red}, ${green} , ${blue})`;
				break;	 				
		}
		return color;
	}
	useEffect(() => {
		const makeList = () => {
			let arr = [];
			let arr2 = [];
			if (contractDocumentsList && contractDocumentsList.length > 0 ) {
				contractDocumentsList?.forEach((el) => {
					arr2.push({
						agrementDate: moment(new Date(el.contractDate)).format(
							"YYYY-MM-DD"
						),
						period:
							moment(new Date(el.startDate)).format("YYYY-MM-DD") +
							" ~ " +
							moment(new Date(el.endDate)).format("YYYY-MM-DD"),
						code: el.rights[0]?.code || null
					});
					el.rights?.forEach((elem) => {
						const index = arr.findIndex((item) => item?.name == elem.code);
						if(index < 0){
							arr.push({
								name: elem.code,
								value: 1,
								color: getColor(elem.code)
							});
						} else {
							arr[index] = {
								...arr[index],
								value: arr[index].value + 1
							};
						}
					});

				});
			}
			setChartList(arr);
			setLices(arr2);
		};
		makeList();
	}, [contractDocumentsList]);

	useEffect(() => {
		if(artDetail?.rights.length > 0){
			setSelected(0);
			setSelectedCode(artDetail?.rights[0].code);
		}
	}, [artDetail?.rights]);

	return (
		<div className="w-full sm:p-[30px] p-[15px] sm:mt-[30px] mt-[15px] rounded-[5px] bg-[#252525]">
			<div className="desc-titleContainer">
				<h3 className="artwork-title">{licenseTransactionsI18}</h3>
			</div>
			<div className="w-full flex sm:pb-4 gap-[27px] sm:gap-6 2xl:gap-12 flex-col md:flex-col lg:flex-col xl:flex-col 2xl:flex-row items-stretch">
				{chartList && chartList.length !== 0 ? (
					<div className="w-full lg:w-2/5 h-auto gap-4 flex flex-col xl:flex-row relative">
						<div className="w-full xl:w-1/3 flex-stretch flex items-end">
							<ul className="flex xl:flex-col gap-4 xl:gap-0 flex-wrap">
								{chartList &&
									chartList.map((right, index) => (
										<li
											key={`right-${index}`}
											className="flex items-center gap-2 tracking-[-1px] mb-2 font-[300] text-[#DDD] text-xs">
											<p
												style={{
													backgroundColor: right.color
												}}
												className="w-4 h-4"></p>
											<p className="w-max sm:text-[16px] text-[12px]">
												{allRightsI18[right.name] ==
												"공중송신권(방송권,전송권,디지털음성송신권)"
													? allRightsI18[right.name].split("(")[0].trim()
													: allRightsI18[right.name]}{" "}
												({right.value}
												{caseI18})
											</p>
										</li>
									))}
							</ul>
						</div>
						<div className="w-full sm:w-2/3 mx-auto xl:w-2/3 relative sm:px-0 px-[23px]">
							<PieChart
								data={chartList}
								lineWidth={60}
								label={(data) => {
									return `${Math.round(data.dataEntry.percentage)}%`;
								}}
								labelPosition={70}
								labelStyle={{
									fill: "white",
									fontSize: "4px",
									fontWeight: 500,
									fontStyle: "italic",
									fontFamily: "Poppins"
								}}
							/>
						</div>
					</div>
				) : (
					<div className="w-full 2xl:w-[35%] xl:w-full md:w-full lg:w-full h-auto gap-4 flex flex-col xl:flex-row relative">
						<div className="nodata">
							<h4 className="nodata-title">{nodataI18}</h4>
						</div>
					</div>
				)}
				{
					<div className="w-full 2xl:w-4/6 xl:w-full md:w-full sm:w-full">
						<div className="flex items-center flex-wrap  gap-2">
							{artDetail?.rights.length > 0 ? (
								artDetail?.rights.map((right, idx) => (
									<button
										onClick={() => checkRights(right.code, idx)}
										className={`${
											idx === selected
												? "font-normal text-white border-[#383392] bg-[#383392]"
												: "font-[300] text-[#DDD] border-[#C5C8D2]"
										} rounded-full border py-[3px] px-[17px] lg:text-[14px] text-[12px] text-[#DDD]`}
										key={`right-${idx}`}>
										{allRightsI18[right.code] ===
										"공중송신권(방송권,전송권,디지털음성송신권)"
											? allRightsI18[right.code].split("(")[0].trim()
											: allRightsI18[right.code]}
									</button>
								))
							) : (
								<p className="mt-4 text-lg text-gray-600">{unableToApllyI18}</p>
							)}
						</div>
						<div className="w-full lg:h-[300px] sm:h-[250px] h-[94px] overflow-auto sm:mt-[30px] mt-[15px] relative">
							<div className="licenseTable-container">
								<div className="w-1/2 licenseTable">{periodOfUseI18}</div>
								<div className="w-1/2 licenseTable">
									{licenseAgreementDateI18}
								</div>
							</div>
							<Table
								transaction={false}
								cols={rightTableHead}
								rows={lices.filter((el) => el.code == selectedCode)}
							/>
						</div>
					</div>
				}
			</div>
		</div>
	);
}

export default LicenseHistory;
