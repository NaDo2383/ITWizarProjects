import React from 'react'
import Title from 'Components/ui/typography/Title'
import NetWorkError from 'Components/ui/error/NetworkError'
import useCommonTranslation from "locale/useCommonTranslation";
import useServiceInfo from "Components/entities/serviceInfo/useServiceInfo"
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import PrivacyListByType from './PrivacyListByType';
import IFrame from 'Components/ui/Iframe';

function PrivacyPolicy() {
    const {
        privacyPolicy: privacyPolicyI18
    } = useCommonTranslation();

    const { getPrivacyPolicy, privacyPolicy } = useServiceInfo()
    const { locale } = useRouter()

    useEffect(() => {
        getPrivacyPolicy()
    }, [locale]);

    return (
        <div className="w-full py-8">
            <div className="container mx-auto">
                <div className="flex justify-center  text-center">
                    <Title title={privacyPolicyI18} />
                </div>
                <div className={`w-full rounded-xl`}>
                    {privacyPolicy ?
                        <>
                            <IFrame src={privacyPolicy.content} />
                            <PrivacyListByType />
                        </>
                        : <div className="w-full h-96">
                            <NetWorkError />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy