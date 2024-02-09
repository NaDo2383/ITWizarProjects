import React from 'react'
import { useEffect } from "react";
import Title from "Components/ui/typography/Title";
import NetWorkError from "Components/ui/error/NetworkError";
import useServiceInfo from "Components/entities/serviceInfo/useServiceInfo"
import { useRouter } from "next/router";
import useCommonTranslation from "locale/useCommonTranslation";
import TermsListByType from './TermsListByType';
import IFrame from 'Components/ui/Iframe';

function TermsOfUse() {
  const { termsOfService: termsOfServiceI18 } = useCommonTranslation();
  const { getTerms, termsOfUse } = useServiceInfo()
  const { locale } = useRouter()

  useEffect(() => {
    getTerms()
  }, [locale]);

  return (
    <div className="w-full py-8">
      <div className="container mx-auto pb-8">
        <div className="flex justify-center  text-center">
          <Title title={termsOfServiceI18} />
        </div>
        <div className={`w-full rounded-xl`}>
          {termsOfUse ?
            <>
              <div className='relative w-full h-auto min-h-screen  '>
                <IFrame src={termsOfUse.content} />
              </div>
              <TermsListByType />
            </>
            :
            <div className="w-full h-96">
              <NetWorkError />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default TermsOfUse