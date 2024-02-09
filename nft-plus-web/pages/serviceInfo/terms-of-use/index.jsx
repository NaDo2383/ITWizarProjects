import Seo from "common/seo/Seo";
import dynamic from "next/dynamic";

const ClientSideTermsOfUse = dynamic(() =>
	import("Components/entities/serviceInfo/terms/TermsOfUse")
);

function TermsOfUse() {
	return <>
				<Seo title="Terms-of-use"/>
				<ClientSideTermsOfUse />
			</>
}

export default TermsOfUse;
