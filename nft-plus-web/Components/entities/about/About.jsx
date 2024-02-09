import Title from "Components/ui/typography/Title";
import AboutTab from "./aboutTab/AboutTab";
import Container from "Components/ui/containers/Container";
import useCommonTranslation from "locale/useCommonTranslation";

function AboutUs() {
  const { menuTexts } = useCommonTranslation();
    
  return (
    <Container>
        <div className="flex flex-col justify-center text-center">
            <h2 className="text-[#E0E6E8] sm:text-[30px] text-[20px] font-medium flex items-center justify-center sm:my-[80px] mt-[25px] mb-[14px]">{menuTexts.submenu_IntroductionI18}</h2>
            <AboutTab />
        </div>
    </Container>
  );
}
export default AboutUs