/**
 * @createdBy duka
 */
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import useElementPosition from "common/window/useElementPosition";
const ProfileAvatar = dynamic(() => import("./ProfileAvatar"), { ssr: false });
import useProfile from "../useProfile";
import { useRouter } from "next/router";

function ProfileBanner() {
	const { profileUser, getUserProfile } = useProfile();
	const profileBannerRef = useRef(null);
	useElementPosition(profileBannerRef, { globalName: "profileBanner" });
	const theImg = profileUser?.bgFileUrl;
	const { query } = useRouter()

	return (
		<div ref={profileBannerRef} className={`relative container mx-auto ${query.subpage && "sm:block hidden"}`}>
			{profileUser?.bgFileUrl ? (
				<div>
					<img
						src={theImg}
						alt="my-page-banner-image"
						className="w-full max-h-[230px] overflow-hidden rounded-[10px] object-cover"
					/>
				</div>
			) : (
				<div className="w-full min-h-[230px] overflow-hidden rounded-[10px] object-cover bg-[rgba(39,39,39)]"></div>
			)}
			<ProfileAvatar />
		</div>
	);
}

export default ProfileBanner;
