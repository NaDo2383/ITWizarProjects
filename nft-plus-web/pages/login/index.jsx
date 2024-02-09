import Image from "next/image";
import metaIco from "public/meta.svg";
import Seo from "common/seo/Seo";
import useAuthMetamask from "common/metamask/useAuthMetamask";
import { useGlobalContext } from "common/global/useGlobalContext";
import { useEffect } from "react";
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import { useRouter } from "next/router";

function LoginPage() {
	const { onAuthMetamask } = useAuthMetamask();
	const { setAuthUser } = useGlobalContext();
	const { authUser } = useAuthUser();
	const { push } = useRouter();

	async function handleLogin() {
		const loggedUserData = await onAuthMetamask().then((res) =>
			setAuthUser(res?.result)
		);
	}

	useEffect(() => {
		if (authUser) {
			push("/");
		}
	}, [authUser]);

	return (
		<>
			<Seo
				title="Connect | 탐탐 TAMTAM"
				pageDesc="디지털 아트의 모든 권리를 거래하는 NFT 마켓 플레이스 탐탐"
				keyWords="탐탐, NFT, 탐탐 NFT 마켓 플레이스, NFT 마켓, NFT 마켓플레이스, 탐탐 마켓, TAMTAM, TAMTAM NFT, NFT 아트, NFT 사진, NFT 그림, NFT 거래소, NFT 민팅, NFT 코인"
			/>
			<div className="w-full flex items-center py-60 justify-center">
				<button
					type="button"
					onClick={handleLogin}
					className={`mt-6 px-8 font-bold text-white border-2 border-gray-300 rounded-[10px] flex justify-center items-center gap-2`}>
					<Image src={metaIco} alt="metaIco" width={50} height={50} />
					<span className="font-semibold">Connect your MetaMask</span>
				</button>
			</div>
		</>
	);
}
export default LoginPage;
