import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import display from "public/SuperToroid-Iridescent.png";
import Title from "Components/ui/typography/Title";
import { useRouter } from "next/router";
import Loading from "Components/ui/loader";
import axios from "axios";
import MobileNav from "Components/layouts/mobileMenu/MobileMenu";
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import useCommonTranslation from "locale/useCommonTranslation";
import usePopup from "Components/ui/popup/usePopup";
import useMyPageTranslation from "locale/useMypageTranslation";
import useProfile from "Components/entities/user/profile/useProfile";

export default function Verify() {
	const {
		checkYorMailVerifyI18,
		emailAlreadyVerifiedI18,
	} = useCommonTranslation();
	const { hideAllModals } = usePopup()
	const {goToMainPageI18, verifyUserI18} = useMyPageTranslation()
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [approved, setApproved] = useState(false);
	const [openNav, setOpenNav] = useState(false);
	const {getUserProfile} = useProfile()
	const router = useRouter();
	const { type, token } = router.query;

	useEffect(() => {
		async function verifyUser(tpe, tkn) {
			try {
				setLoading(true);
				const { data } = await axios.get(
					`${process.env.url}/register_verification?type=${tpe}&token=${tkn}`
				);
				if (data) {
					localStorage.setItem("user",JSON.stringify(data))
					setLoading(false);
					setSuccess(true);
				}
			} catch (err) {
				if (err && err.response.status === 500) {
					setLoading(false);
					setSuccess(false);
				}

				if (err && err.response.status === 404) {
					setLoading(false);
					setApproved(true);
				}
				if (err && err.response.status === 400) {
					setLoading(false);
					router.push("/")
				}
			} finally {
				setLoading(false);
				getUserProfile()
			}
		}
		hideAllModals()
		if (type && token) {
			verifyUser(type, token);
		}
	}, [token, type]);


	return (
		<div className="w-full  tracking-tight  overflow-auto flex flex-col justify-between text-[#333]">
			<Head>
				<title>Verify registration | TAMTAM</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="  w-full flex items-center flex-col justify-center ">
				{loading ? (
					<div className="w-full h-[500px]">
						<Loading />
					</div>
				) : (
					 (
							<div className=" px-4 w-full h-[calc(100vh*0.7)] flex flex-col justify-center items-center gap-[35px]">
								
								<div className="mb-[5px]">
									<div className="relative w-[150px] h-[150px]">
										<Image src={display} alt="display" />
									</div>
								</div>
									
								<div className="text-center sm:text-left">
									<h3 className="font-[500] text-center text-[20px] text-[#E0E6E8]">
										{success ?  verifyUserI18 : approved  ? emailAlreadyVerifiedI18 : checkYorMailVerifyI18 }
									</h3>
								</div>
								<button
									onClick={() => router.push("/")}
									className=" px-5 text-[18px] font-[500] py-[10px] whitespace-nowrap w-min rounded-md bg-[#FB3873] text-white">
									{goToMainPageI18}
								</button>
							</div>
					)
				)}
			</div>
			<MobileNav opened={openNav} />
		</div>
	);
}