import React, { useState } from "react";
import Image from "next/image";
import { useGlobalContext } from "common/global/useGlobalContext";
import defaultProImg from "public/def_pro.png";
import { motion } from "framer-motion";
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import useCommonTranslation from "locale/useCommonTranslation";
import { useRouter } from "next/router";

function ProfileImg() {
	const { authUser } = useGlobalContext();
	
	return (
		<div className="h-[24px] w-[24px] rounded-full overflow-hidden">
			<Image
					src={
						authUser
							? authUser?.profileImgUrl
								? authUser?.profileImgUrl
									: "/def_pro.png"
								: "/default_user_profile.svg"
					}
					style={{
						verticalAlign: "middle",
						borderRadius: "50%",
						objectFit: "cover"
					}}
					className=" object-cover "
					width={24}
					height={24}
					alt="globe"
			/>
		</div>
	);
}

export default ProfileImg;
