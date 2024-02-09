import React, { useEffect } from 'react'
import AssetDetailThumbnail from 'a/features/asset/detail/AssetDetailThumbnail'
import AssetDetailMainInfo from 'a/features/asset/detail/AssetDetailMainInfo'
import AssetInformation from 'a/features/asset/detail/AssetInformation'
import SignLicenseAgreement from 'a/features/asset/detail/SignLicenseAgreement'
import { FormProvider } from 'a/components/ui/form/store/useFormCtx'
import FormRow from 'a/components/ui/form/FormRow'
import useAsset from '../useAsset'
import { useRouter } from 'next/router'
import AssetLicenseList from './AssetLicenseList'

function AssetDetail() {
    const { query } = useRouter()
    const { getAssetDetail } = useAsset()

    useEffect(() => {
        if (query?.id) {
            getAssetDetail(query?.id)
        }
    }, [query?.id])

    return (
        <FormProvider>
            <FormRow>
                <section className="relative lg:mt-24 lg:pb-24 mt-24 pb-24 w-full">
                    <div className="container w-full">
                        <div className="flex sm:flex-row flex-col mb-8 gap-[20px] w-full">
                            <AssetDetailThumbnail />
                            <AssetDetailMainInfo />
                        </div>
                        <AssetInformation />
                        <AssetLicenseList />
                        <SignLicenseAgreement id={query?.id} />
                    </div>
                </section>
            </FormRow>
        </FormProvider>
    )
}

export default AssetDetail
