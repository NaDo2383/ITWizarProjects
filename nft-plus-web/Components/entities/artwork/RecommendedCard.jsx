import Image from "next/image";
import shape1 from "public/Shape1.svg";
import shape2 from "public/Shape2.svg";
import shape3 from "public/Shape3.svg";
import useMainPageTranslation from "locale/useMainPageTranslation";

const RecommendedCard = () => {
	const {
		recommendTitle1_1,
		recommendTitle1_2,
		recommendTitle2_1,
		recommendTitle2_2,
		recommendTitle3_1,
		recommendTitle3_2,
		recommendDesc1_1,
		recommendDesc1_2,
		recommendDesc1_3,
		recommendDesc2_1,
		recommendDesc2_2,
		recommendDesc2_3,
		recommendDesc3_1,
		recommendDesc3_2,
		recommendDesc3_3
	} = useMainPageTranslation();

	return (
		<>
			<div
				className="w-full px-4 sm:px-0 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 sm:gap-6 gap-[20px] relative "
				style={{ zIndex: "20" }}>
				<div className="mainCard h-full upper-layer min-w-[328px] sm:rounded-[32px] rounded-[5px] min-h-[103px] sm:max-h-[510px] 2xl:w-[450px]">
					<div className="md:p-[70px_40px_50px_40px] p-[15px_0px_15px_22px] flex flex-col items-start h-full">
						<div className="flex">
							<div className="lg:w-[100px] d-none none lg:h-[100px] sm:w-[80px] sm:h-[80px] sm:mb-[40px] w-[14.028px] h-[13.958px] glow-2" style={{ bottom: "2px" }}>
								<Image src={shape1} alt="shape1" className="hidden" />
							</div>
							<h6 className="tamtamValueHeader sm:hidden w-full lg:max-w-3/4  text-[15px] font-inter">
								작가와 직접 맺는 라이선스 계약
							</h6>
						</div>

						<h6 className="tamtamValueHeader hidden sm:block w-full lg:max-w-3/4 font-inter mb-[10px]">
							{recommendTitle1_1}
							<br />{recommendTitle1_2}
						</h6>
						<p
							className="lg:text-[18px] text-[12px] font-[350] tracking-tighter leading-normal"
							style={{ color: "rgba(255, 255, 255, 0.6)", fontWeight: "350" }}>
							{recommendDesc1_1} <br /> {recommendDesc1_2} <br /> {recommendDesc1_3}
						</p>
					</div>
				</div>
				<div className="mainCard h-full upper-layer min-w-[328px] sm:rounded-[32px] rounded-[5px] min-h-[103px] sm:max-h-[510px] 2xl:w-[450px]">
					<div className="md:p-[70px_40px_50px_40px] p-[15px_0px_15px_22px] flex flex-col items-start h-full">
						<div className="flex">
							<div className="lg:w-[100px] d-none none lg:h-[100px] sm:w-[80px] sm:h-[80px] sm:mb-[40px] w-[14.028px] h-[13.958px] glow-2" style={{ bottom: "3px" }}>
								<Image src={shape2} alt="shape2" className="hidden" />
							</div>
							<h6 className="tamtamValueHeader sm:hidden w-full lg:max-w-3/4 text-[15px] font-inter sm:leading-0 leading-5">
								청년 신진 작가 인큐베이팅 플랫폼
							</h6>
						</div>
						<h6 className="tamtamValueHeader hidden sm:block w-full lg:max-w-3/4 font-inter mb-[10px] leading-">
							{recommendTitle2_1}
							<br />{recommendTitle2_2}
						</h6>
						<p
							className="lg:text-[18px] text-[12px] font-[350px] leading-normal"
							style={{ color: "rgba(255, 255, 255, 0.6)", fontWeight: "350" }}>
							{recommendDesc2_1} <br />{recommendDesc2_2} <br className="hidden sm:block" /> {recommendDesc2_3}
						</p>
					</div>
				</div>
				<div className="mainCard h-full upper-layer min-w-[328px] sm:rounded-[32px] rounded-[5px] min-h-[103px] sm:max-h-[510px] 2xl:w-[450px]">
					<div className="md:p-[70px_40px_50px_40px] p-[15px_0px_15px_22px] flex flex-col items-start h-full">
						<div className="flex">
							<div className="lg:w-[100px] sm:d-none sm:none lg:h-[100px] sm:w-[80px] sm:h-[80px] sm:mb-[40px] w-[14px] h-[14px] glow-3">
								<Image src={shape3} alt="shape3" className="hidden" />
							</div>
							<h6 className="tamtamValueHeader sm:hidden w-full lg:max-w-3/4 text-[15px] whitespace-nowrap">
								스마트 컨트랙트를 통한 안전한 NFT 거래
							</h6>
						</div>
						<h6 className="tamtamValueHeader hidden sm:block w-full lg:max-w-3/4 font-inter leading-normal mb-[10px]">
							{recommendTitle3_1}
							<br />{recommendTitle3_2}
						</h6>
						<p
							className="lg:text-[18px] text-[12px] font-[400px] text-[#fff] tracking-tighter"
							style={{ color: "rgba(255, 255, 255, 0.6)", fontWeight: "350", lineHeight: "160%" }}>
							{recommendDesc3_1} <br /> {recommendDesc3_2} <br className="sm:hidden" /> {recommendDesc3_3}
						</p>
					</div>
				</div>
				{/* <div
					className="w-full  px-4 sm:px-0 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 absolute left-0 top-0 right-0  "
					style={{ zIndex: "3" }}>
					<div className=" h-full min-h-[400px] sm:min-h-[475px]">
						<div className="p-[79px_40px_50px_40px]  flex flex-col  justify-between items-start  h-full">
							<div className="lg:w-[100px] lg:h-[100px] w-[80px] h-[80px] mb-[20px]">
								<Image src={shape1} alt="shape1" />
							</div>
							<h6 className="tamtamValueHeader max-w-3/4 h-full ">
								작가와 직접 맺는 라이선스 계약
							</h6>
							<p
								className="lg:text-[18px] text-[14px] font-[350px] lg:pr-12"
								style={{ color: "rgba(255, 255, 255, 0.6)" }}>
								저작권 라이선스 거래부터, 계약 관리까지! 표준 계약서로 안전한
								NFT 저작권 거래와 함께 추가 수익을 창출할 수 있어요.
							</p>
						</div>
					</div>
					<div className=" h-fullx min-h-[400px] sm:min-h-[475px]">
						<div className="p-[79px_40px_50px_40px]  flex flex-col  justify-between items-start  h-full">
							<div className="lg:w-[100px] lg:h-[100px] w-[80px] h-[80px] mb-[20px]">
								<Image src={shape2} alt="shape2" />
							</div>
							<h6 className="tamtamValueHeader max-w-3/4 h-full ">
								청년 신진 작가 인큐베이팅 플랫폼
							</h6>
							<p
								className="lg:text-[18px] text-[14px] font-[350px] lg:pr-12"
								style={{ color: "rgba(255, 255, 255, 0.6)" }}>
								나의 첫 NFT 제작은 탐탐에서부터, 탐탐에서 작품 큐레이팅과 탐탐
								크리에이터 베네핏의 기회를 누려보세요
							</p>
						</div>
					</div>
					<div className=" h-full min-h-[400px] sm:min-h-[475px]">
						<div className="p-[79px_40px_50px_40px]  flex flex-col  justify-between items-start h-full">
							<div className="lg:w-[100px] lg:h-[100px] w-[80px] h-[80px] mb-[20px]">
								<Image src={shape3} alt="shape3" />
							</div>
							<h6 className="tamtamValueHeader max-w-3/4 h-full  ">
								스마트 컨트랙트를 통한 안전한 NFT 소유권 거래
							</h6>
							<p
								className="lg:text-[18px] text-[14px] font-[350px] lg:pr-12"
								style={{ color: "rgba(255, 255, 255, 0.6)" }}>
								도용된 NFT와 저작권 침해 걱정은 그만! 소유권과 저작권 검증을
								완료된 탐탐 크리에이터의 작품을 안심하고 거래해 보세요.
							</p>
						</div>
					</div>
				</div>
				<div
					className="w-full px-4 sm:px-0 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 absolute left-0 top-0 right-0 left-0 "
					style={{ zIndex: "3" }}>
					<div className=" h-full  min-h-[400px] sm:min-h-[475px]">
						<div className="p-[79px_40px_50px_40px]  flex flex-col  justify-between items-start   h-full">
							<div className="lg:w-[100px] lg:h-[100px] w-[80px] h-[80px] mb-[20px]">
								<Image src={shape1} alt="shape1" />
							</div>
							<h6 className="tamtamValueHeader max-w-3/4 h-full font-inter">
								작가와 직접 맺는 라이선스 계약 
							</h6>
							<p
								className="lg:text-[18px] text-[14px] font-[350px] lg:pr-12"
								style={{ color: "rgba(255, 255, 255, 0.6)" }}>
								저작권 라이선스 거래부터, 계약 관리까지! 표준 계약서로 안전한
								NFT 저작권 거래와 함께 추가 수익을 창출할 수 있어요.
							</p>
						</div>
					</div>
					<div className=" h-full  min-h-[400px] sm:min-h-[475px]">
						<div className="p-[79px_40px_50px_40px]  flex flex-col  justify-between items-start  h-full">
							<div className="lg:w-[100px] lg:h-[100px] w-[80px] h-[80px] mb-[20px]">
								<Image src={shape2} alt="shape2" />
							</div>
							<h6 className="tamtamValueHeader max-w-3/4 h-full ">
								청년 신진 작가 인큐베이팅 플랫폼
							</h6>
							<p
								className="lg:text-[18px] text-[14px] font-[350px] lg:pr-12"
								style={{ color: "rgba(255, 255, 255, 0.6)" }}>
								나의 첫 NFT 제작은 탐탐에서부터, 탐탐에서 작품 큐레이팅과 탐탐
								크리에이터 베네핏의 기회를 누려보세요
							</p>
						</div>
					</div>
					<div className=" h-full  min-h-[400px] sm:min-h-[475px]">
						<div className="p-[79px_40px_50px_40px]  flex flex-col  justify-between items-start  h-full">
							<div className="lg:w-[100px] lg:h-[100px] w-[80px] h-[80px] mb-[20px]">
								<Image src={shape3} alt="shape3" />
							</div>
							<h6 className={`tamtamValueHeader max-w-3/4 h-full `}>
								스마트 컨트랙트를 통한 안전한 NFT 소유권 거래
							</h6>
							<p
								className="lg:text-[18px] text-[14px] font-[350px] lg:pr-12"
								style={{ color: "rgba(255, 255, 255, 0.6)" }}>
								도용된 NFT와 저작권 침해 걱정은 그만! 소유권과 저작권 검증을
								완료된 탐탐 크리에이터의 작품을 안심하고 거래해 보세요.
							</p>
						</div>
					</div>
				</div> */}
				<div
					className="absolute bottom-[-50px] right-[-150px] h-[61px] w-[60px] bg-no-repeat bg-center "
					style={{
						backgroundImage: "url('/star2.png')"
					}}>
				</div>
			</div>
		</>
	);
};

export default RecommendedCard;
