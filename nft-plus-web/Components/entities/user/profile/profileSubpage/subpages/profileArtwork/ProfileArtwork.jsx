/**
 * @createdBy Phill Anderson 2023/3/20
 */
import React, { useState } from "react";
import useMyPageTranslation from "locale/useMypageTranslation";
import { motion } from "framer-motion";
import AnimateHeight from "react-animate-height";
import ArtTab from "./artTab/ArtTab";
import { BsChevronDown } from "react-icons/bs";
import SubpageResponsiveMenu from "Components/entities/user/profile/profileSubpage/SubpageResponsiveMenu";

function ProfileArtwork() {
  const { possessionI18 } = useMyPageTranslation();
  const [opened, setOpened] = useState(false);

  function isOpen() {
    setOpened(!opened);
  }

  return (
    <div>
      <div className="w-100 pb-10 flex items-center justify-between px-8">
        <h2
          style={{
            fontSize: 26,
            fontFamily: '"Noto Sans KR", sans-serif',
            fontWeight: 500
          }}>
          {possessionI18}
        </h2>
        <div onClick={isOpen} className="text-2xl cursor-pointer lg:hidden">
          <motion.div
            animate={{ rotate: opened ? [0, 180] : [180, 0] }}
            transition={{ duration: 0.4 }}>
            <BsChevronDown />
          </motion.div>
        </div>
      </div>
      <AnimateHeight
        duration={400}
        height={opened ? "auto" : 0}
        className="w-full transition duration-400 overflow-hidden px-5">
        <SubpageResponsiveMenu isMobile={true} />
      </AnimateHeight>
      <ArtTab />
    </div>
  );
}

export default ProfileArtwork;
