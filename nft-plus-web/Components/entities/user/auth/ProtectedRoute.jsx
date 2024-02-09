import { useRouter } from "next/router";
import useAuthUser, { useCheckUser } from "./useAuthUser";
import { useEffect, useState } from "react";
import useProfile from "../profile/useProfile";
import { useGlobalContext } from "common/global/useGlobalContext";

const ProtectedPage = ({ children }) => {
	const { push, pathname, query } = useRouter();
	const { isLoggedIn, loggedUser } = useCheckUser();
	const { authUser, logOut } = useAuthUser();
	const { hardRender } = useGlobalContext()
	const { getUserProfile } = useProfile();
	const [ reallyLoggedIn, setReallyLoggedIn ] = useState(false)

	// useEffect(() => {
	// 	if (typeof window !== undefined) {
	// 		console.log('isAuthenticated', isAuthenticated)
	// 		if (!isAuthenticated) {
	// 			push("/");
	// 			return;
	// 		}
	// 	}
	// }, [loggedUser]);

	useEffect(() => {
		getUserProfile();
	}, [ authUser, hardRender ]);
	
	useEffect(() => {
		const isAuthenticated = isLoggedIn()
		if( !isAuthenticated ) { 
			logOut()
		}
		 setReallyLoggedIn(isAuthenticated)
	},[pathname, query])

	return <>{ reallyLoggedIn ? children : null }</>;
};

export default ProtectedPage;
