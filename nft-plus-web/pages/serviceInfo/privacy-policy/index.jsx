import Seo from "common/seo/Seo";
import dynamic from "next/dynamic";

const ClientSidePrivacyPolicy = dynamic(
	() => import("Components/entities/serviceInfo/privacyPolicy/PrivacyPolicy"),
	{ ssr: false }
);

function PrivacyPolicyPage() {
	return <>
			<Seo title="Privacy-policy"/>
			<ClientSidePrivacyPolicy />
			</>
}

export default PrivacyPolicyPage;
