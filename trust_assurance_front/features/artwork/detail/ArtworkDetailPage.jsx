import React from "react";
import Thumbnail from "./Thumbnail";
import MainInfo from "./MainInfo";
import LicenseTransactionHistory from "./LicenseTransactionHistory";
import RightsManagementHistory from "./RightsManagementHistory";
import LicenseTermsAndConditions from "./LicenseTermsAndConditions";
import MediaInfo from "./MediaInfo";
import { useRouter } from "next/router";
import useArtworks from "../useArtworks";
import { useEffect } from "react";

export default function ArtworkDetailPage() {
    const { query } = useRouter();
    const { getArtworkDetail, getLicenseAndCopyrightList } = useArtworks();


    useEffect(() => {
        getArtworkDetail(query?.id)
        getLicenseAndCopyrightList(query?.id)
    }, []);

    return (
        <div>
            <div className="tf-section-2 product-detail">
                <div className="themesflat-container">
                    <div className="row">
                        <Thumbnail />
                        <MainInfo />
                        <div className="col-md-12">
                            <MediaInfo />
                            <LicenseTermsAndConditions />
                        </div>
                        <LicenseTransactionHistory />
                        <RightsManagementHistory />
                    </div>
                </div>
            </div>
        </div>
    );
}
