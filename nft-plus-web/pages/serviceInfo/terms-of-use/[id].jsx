import React from "react";
import dynamic from "next/dynamic";
import Seo from "common/seo/Seo";

const ClientSideTermsOfUseDetail = dynamic(
	() => import("Components/entities/serviceInfo/terms/TermsOfUseDetail"),
	{ ssr: false }
);
function TermsOfUseDetail() {
	return <>
			<Seo title="Terms-of-use"/>
			<ClientSideTermsOfUseDetail />
		</>
}

export default TermsOfUseDetail;
