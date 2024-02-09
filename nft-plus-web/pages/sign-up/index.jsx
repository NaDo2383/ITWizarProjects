import React from "react";
import dynamic from "next/dynamic";

const ClientSideSignup = dynamic(() =>
	import("Components/entities/user/auth/auth-feature/sign_up/SignUp")
);

function SignupPage() {
	return <ClientSideSignup />;
}

export default SignupPage;
