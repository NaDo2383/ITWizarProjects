import React from "react";
import dynamic from "next/dynamic";
import Seo from "common/seo/Seo";

const ClientPrivacyPolicyDetail = dynamic(
	() =>
		import("Components/entities/serviceInfo/privacyPolicy/PrivacyPolicyDetail"),
	{ ssr: false }
);
function PrivacyPolicyDetailPage() {
	return <>
			<Seo title="Privacy-policy"/>
			<ClientPrivacyPolicyDetail />
			</>
}

export default PrivacyPolicyDetailPage;
