import useArtworkTranslation from "../../../../locale/useArtworkTranslation";
import CompleteImg from "../../public/confetti.svg";
import Image from "next/image";
import MainLayer from "./MainLayer";
import { useRouter } from "next/router";

export default function CompleteCompetitionLayer({ isOpen }) {
  const { firstCompleteI18, sendI18, viewExibitsI18, checkStatusI18 } =
    useArtworkTranslation();
  const { push } = useRouter();
  
  return (
    <MainLayer isOpen={isOpen} width="relative max-w-[650px]">
      <button onClick={() => push("/mypage/sell-right")} className="absolute top-5 right-5 text-2xl">
        <Image src="/close.svg" alt="closeBtn" width="20" height="20" />
      </button>
      <div className="flex flex-col justify-center items-center bg-white w-full tracking-tighter py-10 px-[50.5px]">
          <Image  src={CompleteImg} alt="CompleteImg" />
        <div className="pt-[25px] pb-8">
          <h2 className="tracking-[-1px] text-[30px] text-center mx-[50x] px-[20px] font-medium">
            {firstCompleteI18}
          </h2>
          <p className="text-[24px] font-[350px]">{sendI18} ​</p>
        </div>
        <div className="flex flex-col items-center justify-end gap-5">
          <button
            className="bg-gradient-to-r from-[#FE8243] via-[#FF5675] to-[#FE25D5] text-white py-[10px] cursor-pointer text-center  w-[470px] rounded-xl"
            onClick={() => push("/competitions")}
          >
            <h2 className="text-2xl font-medium">{viewExibitsI18}</h2>
          </button>
          <button
            className="bg-[#333] text-white py-[10px]  text-center  w-[470px] rounded-xl"
            onClick={() => push("/mypage/sell-right")}
          >
            <h2 className=" text-2xl font-medium">{checkStatusI18}</h2>
          </button>
        </div>
      </div>
    </MainLayer>
  );
}
