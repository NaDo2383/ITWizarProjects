import Link from "next/link";
import useMypageTranslation from "locale/useMypageTranslation";

export default function SubpageResponsiveMenu({ isMobile }) {
	const {
		sidebarI18,
		possessionI18,
		rights_registrationI18,
		ownership_transiction_historyI18,
		license_agreement_detailsI18,
		edit_personal_informationI18,
		personal_information_management_subtitleI18,
		notification_settingI18,
		withdrawalI18
	} = useMypageTranslation();

	return (
		<div
			className={`${isMobile ? "w-full block lg:hidden" : "w-52 hidden lg:block"
				}`}>
			{!isMobile && (
				<div className="w-100 pb-10 pt-10 text-center border-b border-solid border-[#333]">
					<h2
						style={{
							fontSize: 28,
							fontFamily: '"Open Sans", sans-serif',
							fontWeight: 600
						}}>
						My Page
					</h2>
				</div>
			)}
			<div
				className={`${isMobile ? "flex justify-between items-start pb-12" : "block"
					}`}>
				<div
					className={`${isMobile ? "border-r w-1/2" : "border-b py-7 w-full"
						} border-solid border-gray-300`}>
					<h2
						style={{
							fontSize: 18,
							fontFamily: '"Noto Sans KR", sans-serif',
							fontWeight: 700
						}}>
						{sidebarI18}
					</h2>
					<ul
						style={{
							fontFamily: '"Noto Sans KR", sans-serif',
							fontWeight: 300,
							marginTop: "6px"
						}}
						className="text-sm sm:text-[15px]">
						<li
							className={`mt-2 mb-1 ${typeof window !== "undefined" &&
								window.location.pathname === "/mypage" &&
								"text-[#ff00e4] flex items-center justify-between"
								}`}>
							<Link href={"/mypage"} className>
								{possessionI18}
							</Link>
						</li>
						<li
							className={`mb-1 ${typeof window !== "undefined" &&
								window.location.pathname === "/mypage/sell-right" &&
								"text-[#ff00e4] flex items-center justify-between"
								}`}>
							<Link href="/mypage/sell-right" className>
								{rights_registrationI18}
							</Link>
						</li>
						<li
							className={`mb-1 ${typeof window !== "undefined" &&
								window.location.pathname === "/mypage/own-log" &&
								"text-[#ff00e4] flex items-center justify-between"
								}`}>
							<Link href="/mypage/own-log" className>
								{ownership_transiction_historyI18}
							</Link>
						</li>
						<li
							className={`${typeof window !== "undefined" &&
								window.location.pathname === "/mypage/transaction-log" &&
								"text-[#ff00e4] flex items-center justify-between"
								}`}>
							<Link href="/mypage/transaction-log" className>
								{license_agreement_detailsI18}
							</Link>
						</li>
					</ul>
				</div>
				{/*
        <div
          className={`${
            isMobile
              ? "border-r w-1/3 flex flex-col"
              : "border-b py-7 w-full"
          } border-solid border-gray-300`}
        >
          <h2
            style={{
              fontSize: 18,
              fontFamily: '"Noto Sans KR", sans-serif',
              fontWeight: 700,
              marginBottom: ".25rem",
              marginLeft: "6px"
            }}
          >
            {wallet_management_subtitleI18}
          </h2>
          <ul
            style={{
              fontSize: 15,
              fontFamily: '"Noto Sans KR", sans-serif',
              fontWeight: 300,
              marginLeft: "6px",
              marginTop: "6px"
            }}
          >
            <li
              className={`mb-1 ${
                typeof window !== "undefined" &&
                window.location.pathname === "/mypage/wallet" &&
                "text-[#ff00e4] flex items-center justify-between"
              }`}
            >
              <Link href="/mypage/wallet" className>
                {registered_walletI18}
              </Link>
            </li>
          </ul>
        </div>
        */}
				<div
					className={`${isMobile ? "w-1/2 flex flex-col" : "py-7 w-full"
						} border-solid border-gray-300`}>
					<h2
						style={{
							fontSize: 18,
							fontFamily: '"Noto Sans KR", sans-serif',
							fontWeight: 700,
							marginLeft: "6px"
						}}>
						{personal_information_management_subtitleI18}
					</h2>
					<ul
						style={{
							fontSize: 15,
							fontFamily: '"Noto Sans KR", sans-serif',
							fontWeight: 300,
							marginLeft: "6px",
							marginTop: "6px"
						}}>
						<li
							className={`mb-1 ${typeof window !== "undefined" &&
								window.location.pathname === "/mypage" &&
								"text-[#ff00e4] flex items-center justify-between"
								}`}>
							<Link href="/mypage/profile" className>
								{edit_personal_informationI18}
							</Link>
						</li>
						<li
							className={`mb-1 ${typeof window !== "undefined" &&
								window.location.pathname === "/mypage/alarm" &&
								"text-[#ff00e4] flex items-center justify-between"
								}`}>
							<Link href="/mypage/alarm" className>
								{notification_settingI18}
							</Link>
						</li>
						<li
							className={`mb-1 ${typeof window !== "undefined" &&
								window.location.pathname === "/mypage/deactivate" &&
								"text-[#ff00e4] flex items-center justify-between"
								}`}>
							<Link href="/mypage/deactivate" className>
								{withdrawalI18}
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
