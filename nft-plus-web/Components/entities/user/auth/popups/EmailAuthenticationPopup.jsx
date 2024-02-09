import MainPopup from "Components/ui/popup/MainPopup";
import usePopup from "Components/ui/popup/usePopup";
import useCommonTranslation from "locale/useCommonTranslation";
import moment from "moment";
import maile from "public/maill.svg";
import mail from "public/sobak.svg";
import { useRouter } from "next/router";
import Image from "next/image";
import { MdOutlineWatchLater } from "react-icons/md";
import { useEffect, useState } from "react";

function EmailAuthenticationPopup() {
  const { locale } = useRouter();
  const [showResendButton, setShowResendButton] = useState(false);
  const [timer, setTimer] = useState(5 * 60 * 1000);
  const [sending, verCode] = useState(true);
  const { popupProps, getCurrentModalprops } = usePopup();
  const {
    mailSentI18,
    mailSentDescI18,
    verificationWarningI18,
    valid24HoursI18,
    noSeeI18,
    checkValidityPeriodI18,
    mailResentAfterI18,
    resendVerificationI18,
    linkmailI18
  } = useCommonTranslation();

  const resend = async () => {
    try {
      verCode(true);
      const { data } = await axios.get(
        `${process.env.url}/register_verification_resend?type=resend&token=${popupProps.resendToken}`
      );
      if (data) {
        setShowResendButton(false);
        setTimer(5 * 60 * 1000);
        verCode(false);
        alert("check your email...");
      }
    } catch (err) {
      if (err.response?.status === 400) {
        alert("email is verified");
        verCode(false);
      } else {
        alert("something went wrong!");
        verCode(false);
      }
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      // if(timer > 290000){
      if (timer > 0 && sending) {
        setTimer(moment(timer).subtract("1", "second"));
      } else {
        setShowResendButton(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, sending]);

  useEffect(() => {
    getCurrentModalprops();
  }, [getCurrentModalprops]);

  return (
    <MainPopup width={450}>
      <div className="rounded-xl overflow-hidden bg-white">
        <div className="flex flex-col w-full px-8 rounded-md items-center bg-[#f8f8f8]">
          <div className="relative flex justify-center items-center">
            <Image src={maile} alt="maile" />
            <div className="absolute left-1/2 top-6 transform -translate-x-1/2">
              <div className="relative">
                <Image src={mail} alt="mail" />
              </div>
            </div>
          </div>
          <div className="my-4 text-center sm:text-left">
            <h2 className="font-[600] text-[32px] text-[#333] text-center tracking-[-2px] mb-5">
              {mailSentI18}
            </h2>
            <p className="text-[#333] font-[300] tracking-[-1px] text-center text-lg leading-[27px]">
              <span className="font-bold underline">
                {popupProps?.authEmail}
              </span>{" "}
              {mailSentDescI18}
            </p>
            <p className="text-[#333] font-[300] tracking-[-1px] text-center text-lg leading-[27px]">
              {verificationWarningI18}
            </p>
            <br />
            <p className="text-[#333] font-[300] tracking-[-1px] text-center text-lg leading-[27px]">
              {linkmailI18} <span className="font-bold">{valid24HoursI18}</span>
              {locale !== "en" && noSeeI18} <br />
              {checkValidityPeriodI18}
            </p>
            <br />
            <p className="leading-snug text-center">
              <MdOutlineWatchLater className="inline-block text-[20px] align-text-bottom mr-1"></MdOutlineWatchLater>
              {moment(timer).format("mm분 : ss초")}
              <span className="pl-2 text-red-400">{mailResentAfterI18}</span>
            </p>
            {
              <button
                onClick={() => resend()}
                disabled={timer > 0 || sending}
                className={`w-full mt-6 px-4 py-4 rounded-md bg-[#333] ${
                  sending && "cursor-wait bg-opacity-60"
                } text-white ${
                  timer > 0 && "cursor-not-allowed bg-opacity-60"
                }`}>
                {resendVerificationI18}
              </button>
            }
          </div>
        </div>
      </div>
    </MainPopup>
  );
}

export default EmailAuthenticationPopup;
