import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimateHeight from "react-animate-height";
import useArtwork from "Components/entities/artwork/useArtwork";
import ResponsivePerArtProgress from "./ResponsivePerIssuedNFT";
import { BsChevronDown } from "react-icons/bs";
import useMyPageTranslation from "locale/useMypageTranslation";
import SubpageResponsiveMenu from "Components/entities/user/profile/profileSubpage/SubpageResponsiveMenu";

function ResponsiveArtworkRegProgress() {
  const { artworksPending } = useArtwork();
  const { rights_registrationI18 } = useMyPageTranslation();
  const [opened, setOpened] = useState(false);

  function isOpen() {
    setOpened(!opened);
  }

  return (
    <div className="md:hidden lg:flex px-5 md:px-20 gap-14">
      <div className="flex w-100 pb-10 items-center justify-between md:hidden">
        <h2
          style={{
            fontSize: 26,
            fontFamily: '"Noto Sans KR", sans-serif',
            fontWeight: 500
          }}>
          {rights_registrationI18}
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
        className="w-full transition duration-400 overflow-hidden">
        <SubpageResponsiveMenu isMobile={true} />
      </AnimateHeight>
      <table className="md:hidden">
        <tbody>
          {artworksPending?.result?.content.map((artwork, idx) => (
            <ResponsivePerArtProgress
              key={"art-progress3-" + idx}
              {...artwork}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResponsiveArtworkRegProgress;
