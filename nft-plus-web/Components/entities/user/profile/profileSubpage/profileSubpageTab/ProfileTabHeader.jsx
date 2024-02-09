import React, { useState, useEffect } from "react";
import useSubpage from "../useSubpage";
import ProfileTabLink from "./ProfileTabLink";
import ProfileResponsiveTabheader from "./ProfileResponsiveTabheader";
import { useRouter } from 'next/router'
import useProfile from "../../useProfile";

const ProfileHeader = () => {
  const { query } = useRouter()
  const { profileUser } = useProfile();

  const { headerItem, headerItem2, changeSubpage } = useSubpage()
  useEffect(() => {
    // өмнөх хуудаснаас mypage рүү шилжихдээ ямар subpage нээх эсэхийг зөвхөн энд бичиж өгнө үү!
    switch (query.subpage) {
      case 'issuedNft': changeSubpage(0); break;
      case 'licenseAgreement': changeSubpage(1); break;
      case 'purchasedNft': changeSubpage(2); break;
      case 'desiredNft': changeSubpage(3); break;
      case 'activityHistory': changeSubpage(4); break;
      default: changeSubpage(0); break;
    }
  }, [query])

  return (
    <div className="w-full flex items-center gap-6 justify-center">
      <div className="hidden sm:flex overflow-hidden w-full ">
        <ul
          id="typeList"
          className="w-full overflow-auto hidden invisible md:flex md:visible justify-center">
          {profileUser?.role !== "NORMAL" && headerItem?.slice(profileUser?.role == "TAMTAM" && 0, headerItem?.length)?.map((item, idx) => (
            <ProfileTabLink key={'profile-subpage-header-' + idx} {...item} id={idx} />
          ))}
          {profileUser?.role === "NORMAL" && headerItem2?.slice(profileUser?.role !== "TAMTAM" && 0, headerItem2?.length)?.map((item, idx) => (
            <ProfileTabLink key={'profile-subpage-header-' + idx} {...item} id={idx} />
          ))}
        </ul>
      </div>
      <ProfileResponsiveTabheader />
    </div>
  );
};

export default ProfileHeader;
