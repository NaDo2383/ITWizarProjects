import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import useCommonTranslation from "../locale/useCommonTranslation";

export default function SuccessNice() {
  const route = useRouter();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const { EncodeData } = route.query;
  const [ageErr, setAgeErr] = useState(false);
  const { plsWaitForMomentI18, processingI18 } = useCommonTranslation();

  useEffect(() => {
    async function _verifyUser() {
      try {
        const { data } = await axios.post(
          process.env.url + "/checkplus/success",
          {
            EncodeData,
            requestNumber: localStorage.requestNumber,
          }
        );
        setLoading(false);
        setUserInfo(data.result);
      } catch (err) {
        setError(err.message);
      }
    }
    if (EncodeData) {
      _verifyUser();
    }
  }, [EncodeData]);

  useEffect(() => {
    if (userInfo) {
      const { BIRTHDATE } = userInfo;
      if (BIRTHDATE) {
        const today = new Date();
        const year = +BIRTHDATE.slice(0, 4);
        const month = +BIRTHDATE.slice(4, 6) - 1;
        const date = +BIRTHDATE.slice(6);
        const bday = new Date(year, month, date);
        let age = today.getFullYear() - bday.getFullYear();
        const m = today.getMonth() - bday.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < bday.getDate())) {
          age--;
        }

        if (age < 14) {
          setAgeErr(true);
        } else {
          localStorage.setItem("dupinfo", JSON.stringify(userInfo));
        }
      } else {
        alert("error");
      }
      if (window.opener && window.opener !== window) {
        window.close();
      } else {
        route.push("/new-user?niceIdVerified=true");
      }
    }
  }, [userInfo]);

  return (
    <div>
      {!ageErr ? (
        <div className="w-full h-screen flex items-center justify-center text-xl text-center">
          <p>{processingI18}</p>
          <p>{plsWaitForMomentI18}</p>
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <p>your age is under 14!</p>
          <button className="w-[250px] bg-[#333] text-white py-2">Close</button>
        </div>
      )}
    </div>
  );
}

// http://localhost:3000/checkplus_success?EncodeData=AgAFQlg5NDXBKyXUoAuUhjBFcz6jTPdoCSxqItXCRTlUAMWoJZ3feXoUp1BZowFPTnGLGsWHcDf%2BOr1ImOfgITf0JYQ5uqqLvif3Y0BlIDewRV/WHIdYQRK8QO6Q9n2z//Yl6toVLtfR33Yh0S5jljUyusNs1jzjrPB/MuLuvsoiWN3FhEXY06D6i8m4UMFzt9FjTdVzbfhSaYhSvd43XujP23GISz5KQmGaZcowYVBQG879%2BJYM55zt85ReMAawEE/6sJONSA%2BOCt5BDlPfHrGiXEQ3n%2BHiqxVIHwmbOdutbmhg1vRhofyaefreT/XXaHOK4KIV8J3zeCt/DEp2plk6j6f7Aw5hMh%2B1J0akGUGlD2YLA6u8VkH6ViqcwqcPzOOKaRvDOIYmmhHuaQ4FjYvr4P/B3X9FgMqZ%2B4m/6y/mt9Mwz3sxMnBbfs/t9gdKAZ0a6XwDbIYdXuessqXgeuz311jGl48k%2BySl8hlBmRmO%2BD10qLpEsoj6AbqBLXo4xaAhMF3SDVSAYk84aQcPyzA/0EOswqnWju3nmOe7FDG4IdBkh25cwg==
