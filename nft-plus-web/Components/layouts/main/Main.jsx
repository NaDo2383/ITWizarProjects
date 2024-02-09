import { useGlobalContext } from "common/global/useGlobalContext";
import React from "react";

const Main = (props) => {
	const { children } = props;
	const { globalItems } = useGlobalContext();
	return (
		<main
			style={{
				paddingTop: `${globalItems?.header?.clientData?.clientHeight}px`,
				minHeight: "80vh",
				background: "#161717",
			}}>
			{children}
		</main>
	);
};

export default Main;
