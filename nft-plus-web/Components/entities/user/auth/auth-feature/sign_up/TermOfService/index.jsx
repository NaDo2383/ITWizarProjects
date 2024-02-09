/**
 * @createdBy Narada0927 2022
 * @maintainedBy Phill Anderson 2023/4/13
 */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import Checkbox from "Components/ui/checkbox/Checkbox";
import Loading from "Components/ui/loader";
import useCommonTranslation from "locale/useCommonTranslation";
import useAlertTranslation from "locale/useAlertTranslation";
import useServiceInfo from "Components/entities/serviceInfo/useServiceInfo";

const TermsAndService = ({ setTabNumber }) => {
  const {
    agreeTitleI18,
    termsOfUseI18,
    agreeTermsI18,
    privacyPolicyI18,
    iAgreeTextI18,
    idVerificationI18,
    authenticateI18
  } = useCommonTranslation();
  const { agreeTermsI18: agreeTermsPersonalInfoI18 } = useAlertTranslation();
  const { privacyPolicy, termsOfUse, getTerms, getPrivacyPolicy } =
    useServiceInfo();
  const [termAccepted, setTermAccepted] = useState(false);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [popup, setPopup] = useState(null);
  const form = useRef();
  const [token, setToken] = useState();

  useEffect(() => {
    const bla = async () => {
      const { data } = await axios.post(process.env.url + "/checkplus", {
        returnUrl: process.env.niceApiUrl
      });
      setToken(data);
      localStorage.setItem("requestNumber", data.requestNumber);
    };
    bla();
  }, []);

  const checkTerms = () => {
    if (!termAccepted || !privacyPolicyAccepted) {
      alert(agreeTermsPersonalInfoI18);
    }
  };

  useEffect(() => {
    getTerms();
  }, []);

  useEffect(() => {
    getPrivacyPolicy();
  }, []);

  useEffect(() => {
    if (popup?.closed && popup) {
      setPopup(null);
    }
  }, [popup?.closed, popup]);

  return (
    <div className="">
      <div className="w-full text-center">
        <h2 className="text-[24px] font-[500]  mb-8">
          {agreeTitleI18}
        </h2>
        <div className="w-full md:w-[710px] h-60">
          <h2 className="font-[20px] mb-3">{termsOfUseI18}</h2>
          <div className="w-full border-2 border-gray-300 overflow-auto h-full bg-gray-100 p-4">
            {termsOfUse?.content ? parse(termsOfUse?.content) : <Loading />}
          </div>
          <div className="w-full mt-2 flex items-center justify-end gap-1">
            <label htmlFor="term" className="text-[#333]">
              {agreeTermsI18}
            </label>
            <Checkbox
              checked={termAccepted}
              onChange={(e) => setTermAccepted(e.target.checked)}
              id="term"
            />
          </div>
        </div>
        <div className="w-full md:w-[710px] h-60 mt-28">
          <h2 className="font-[20px] mb-3">{privacyPolicyI18}</h2>
          <div className="w-full border-2 border-gray-300 overflow-auto h-full bg-gray-100 p-4">
            {privacyPolicy?.content ? (
              parse(privacyPolicy?.content)
            ) : (
              <Loading />
            )}
          </div>
          <div className="w-full mt-2 flex items-center justify-end gap-1">
            <label htmlFor="privacy" className="text-[#333]">
              {iAgreeTextI18}
            </label>
            <Checkbox
              checked={privacyPolicyAccepted}
              onChange={(e) => setPrivacyPolicyAccepted(e.target.checked)}
              id="privacy"
            />
          </div>
        </div>
        <div className="w-full md:w-[710px] h-56 mt-28 mb-8">
          <h2 className="font-[20px] mb-3">{idVerificationI18}</h2>

          {termAccepted && privacyPolicyAccepted ? (
            <button className="w-10/12 mt-5 py-3 rounded-md bg-[#333] text-white">
              <form ref={form} name="form_chk" method="get">
                <input type="hidden" name="m" value="checkplusService" />
                <input
                  type="hidden"
                  name="EncodeData"
                  value={token?.encData || ""}
                />
                <input type="hidden" name="recvMethodType" value="get" />

                <p
                  className="cursor-pointer font-bold"
                  onClick={() => setTabNumber(1)}>
                  {authenticateI18}
                </p>
              </form>
            </button>
          ) : (
            <button
              onClick={checkTerms}
              className="w-10/12 mt-5 py-3 rounded-md bg-[#333] text-white">
              <p className="cursor-pointer font-bold">{authenticateI18}</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsAndService;
