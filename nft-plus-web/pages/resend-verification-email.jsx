import { useState, useEffect } from "react";
import Image from "next/image";
import man from "public/man.png";
import regpen from "public/regpen.png";
import display from "public/display.png";
import Title from "Components/ui/typography/Title";
import { useRouter } from "next/router";
import Loading from "Components/ui/loader";
import axios from "axios";
import mail from "public/sobak.svg";
import maile from "public/maill.svg";
import MobileNav from "Components/layouts/mobileMenu/MobileMenu";
import useCommonTranslation from "locale/useCommonTranslation";

export default function ResendVerificationEmail() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [timeout, setTimeout] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter(true);
  const { locale } = router;
  const { type, token, email } = router.query;
  const {
    signupI18,
    mailSentI18,
    idEnteredWhenSignUpI18,
    verificationWarningI18,
    linkmailI18,
    valid24HoursI18,
    noSeeI18,
    checkValidityPeriodI18,
    TokenExpiredI18
  } = useCommonTranslation();
  
  useEffect(() => {
    async function verifyUser(tpe, tkn) {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.url}/register_verification_resend?type=${tpe}&token=${tkn}&lang=${locale}`
        );
        if (data) {
          setLoading(false);
          setSuccess(true);
          setTimeout(false);
        }
      } catch (err) {
        if (
          err &&
          (err.response.status === 500 ||
            err.response.status === 401 ||
            err.response.status === 405)
        ) {
          setLoading(false);
          setSuccess(false);
          setTimeout(true);
        }
      }
    }

    if (type && token) {
      verifyUser(type, token);
    }
  }, [token, type]);

  return (
    <div className="w-full h-screen tracking-tight bg-white overflow-auto flex flex-col justify-between">
      {loading && (
        <div className="w-full h-[500px]">
          <Loading />
        </div>
      )}
      {success && (
        <div className="flex-1 w-full flex items-center flex-col py-10 justify-center ">
          <Title title={signupI18} />
          <div className="flex flex-col md:w-[750px] px-8 py-12 rounded-md items-center bg-[#f8f8f8]">
            <div className="relative flex justify-center items-center">
              <Image  src={maile} alt="maile" />
              <div className="absolute left-1/2 top-6 transform -translate-x-1/2">
                <div className="relative">
                  <Image  src={mail} alt="mail" />
                </div>
              </div>
            </div>
            <div className="my-8 text-center sm:text-left">
              <h2 className="font-[600] text-[32px] text-[#333] text-center tracking-[-2px] mb-5">
                {mailSentI18}
              </h2>
              <p className="text-[#333] font-[300] tracking-[-1px] text-center text-lg leading-[27px]">
                {email && email}
                {idEnteredWhenSignUpI18}
              </p>
              <p className="text-[#333] font-[300] tracking-[-1px] text-center text-lg leading-[27px]">
                {verificationWarningI18}
              </p>
              <br />
              <p className="text-[#333] font-[300] tracking-[-1px] text-center text-lg leading-[27px]">
                {linkmailI18}{" "}
                <span className="font-[600]">{valid24HoursI18}</span>
                {noSeeI18} <br />
                {checkValidityPeriodI18}
              </p>
            </div>
          </div>
        </div>
      )}
      {timeout && (
        <div className="flex-1 w-full flex items-center flex-col py-10 justify-center ">
          <Title title={TokenExpiredI18} />
          <div className="flex flex-col sm:flex-row items-center gap-14">
            <div className="relative flex justify-center items-center">
              <Image src={display} alt="display" />
              <div className="absolute top-[15px]">
                <div className="relative">
                  <Image src={regpen} alt="regpen" />
                </div>
              </div>
              <div className="absolute bottom-[-5px] right-[10px]">
                <div className="relative">
                  <Image src={man} alt="man" />
                </div>
              </div>
            </div>
            <div className="my-8 md:my-16 text-center sm:text-left">
              <p className="text-[#333] font-[300]">{errorTryAgainI18}</p>
            </div>
          </div>
        </div>
      )}
      <MobileNav opened={openNav} />
    </div>
  );
}
