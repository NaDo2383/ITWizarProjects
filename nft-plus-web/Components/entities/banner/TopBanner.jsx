/**
 * @createdBy duka 6/22
 */
import useMainPageTranslation from "locale/useMainPageTranslation";

const TopBanner = () => {
	const { topBannerDesc } = useMainPageTranslation();
	
	return (
		<>
			<div className=" banner-top">
				<section className="absolute top-0 left-0 w-full h-full">
					<span className="absolute lg:top-[600px] lg:right-[400px] md:top-[600px] md:right-[400px]  sm:top-[300px] sm:right-[200px] w-[4px] h-[4px] rounded-full shootingStars shootingStar1"></span>
					<span className="absolute lg:top-[700px] lg:left-[350px] md:top-[550px] md:left-[350px] sm:top-[250px] sm:left-[150px] w-[4px] h-[4px] rounded-full shootingStars shootingStar2"></span>
				</section>
				<div
					className="absolute 2xl:-top-[503px] xl:-top-[353px] lg:-top-[215px] top-[-205px] bg-w-[150px] 2xl:w-[800px] xl:w-[556px] lg:w-[340px] w-[150px] bg-h-[150px] 2xl:h-[800px] xl:h-[556px] h-[150px] lg:h-[340px] 2xl:bg-[length:800px_800px] xl:bg-[length:556px_556px] lg:bg-[length:340px_340px] bg-cover lg:left-[15%] left-[5%] bg-no-repeat blur-sm md:blur-none"
					style={{
						backgroundImage: "url('/headCork.png')"
					}}>
					{/* <Image src={headCork} alt="headCork" /> */}
				</div>

				<div className="relative flex flex-col justify-center items-center lg:px-0 md:px-20 px-4 mt-[120px] md:mt-[0px]">
					<h1 className="max-w-[1098px] lg:text-[60px] md:text-[40px] text-[22px] font-bold text-center font-mont gradient-background leading-[134.9%]">
						Total Art Management, 
						<br /> 
						Total Artist Management
					</h1>
					<p className="lg:text-[22px] md:text-[18px] text-[15px] text-[#9898A8] font-[400] font-mont leading-[134.9%] mt-4 lg:mb-40 md:mb-20 text-center z-10">
						{topBannerDesc}
					</p>
				</div>				
			</div>
		</>
	);
};

export default TopBanner;
