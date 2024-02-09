import Image from "next/image";
import art from "public/no_photo.png";
import { useArtDetailContext } from "./useArtDetailContext";
import { PlayCircle, VolumeUp } from "@mui/icons-material";
import { useState } from "react";
import AudioStream from "./VideoStream/AudioStream";
import VideoStream from "./VideoStream/videoStream";
import { isMobile } from "react-device-detect";
import useArtworkTranslation from "locale/useArtworkTranslation";

export default function ThumbNail() {
	const { artDetail } = useArtDetailContext();
	const { undiscoveredDetailI18 } = useArtworkTranslation();
	const [iconShow, setIconShow] = useState(false);

	// console.log(artDetail)

	return (
		<div
			className={`${!artDetail?.thumbnail_url && "bg-[#252525]"} ${artDetail?.thumbnail_url && "bg-[#252525]"
				} w-full h-full rounded-lg overflow-hidden relative `}>
			<div className="ThumbNailContainer w-full h-full flex justify-center items-center bg-[#252525] cursor-pointer">
				<div
					className={
						artDetail?.fileType === "VIDEO"
							? "w-full h-full"
							: " w-full h-full border border-[#252525] rounded-[5px]"
					}>
					{(!iconShow && artDetail?.fileType === "AUDIO") ||
						(iconShow && artDetail?.fileType === "AUDIO") ||
						(!iconShow &&
							artDetail?.fileType === "VIDEO" &&
							artDetail?.imageFile.url2) ||
						artDetail?.fileType === "IMAGE" ? (
						<Image
							src={
								artDetail?.thumbnailUrl3x
									? artDetail?.thumbnailUrl3x
									: artDetail?.imageFile.url2
										? artDetail?.imageFile.url2
										: art
							}
							priority
							onClick={() =>
								artDetail?.fileType !== "IMAGE" && setIconShow(!iconShow)
							}
							layout="fill"
							objectFit="contain"
							alt="artDetail-thumbnailUrl"
						/>
					) : (
						""
					)}
					{artDetail?.fileType === "VIDEO" && !iconShow ? (
						<div className=" absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[100px] h-[100px] bg-white rounded-full border shadow-xl z-[99]" id="videoIcon">
							<PlayCircle
								onClick={() => setIconShow(!iconShow)}
								style={{ width: "100px", height: "100px" }}
								className="w-[100px] h-[100px] cursor-pointer"
							/>
						</div>
					) : (
						artDetail?.fileType === "AUDIO" &&
						!iconShow && (
							<div className=" absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[100px] h-[100px] bg-white rounded-full border shadow-xl z-[99]" id="videoIcon">
								<VolumeUp
									onClick={() => setIconShow(!iconShow)}
									style={{ width: "100px", height: "100px" }}
									className="w-[100px] h-[100px] cursor-pointer"
								/>
							</div>
						)
					)}
					{artDetail?.fileType === "VIDEO" ? (
						<div
							// onClick={() => setIconShow(!iconShow)}
							className={
								iconShow || !artDetail?.imageFile.url2
									? " h-full cursor-pointer w-full overflow-hidden bg-cover bg-center flex justify-center items-center"
									: "none w-0 h-0 "
							}>
							<VideoStream
								setIconShow={setIconShow}
								iconShow={iconShow}
								url={artDetail?.imageUrl}
							/>
						</div>
					) : (
						artDetail?.fileType === "AUDIO" &&
						iconShow && (
							<div className="absolute AUDIO bottom-0 left-1/2 -translate-x-1/2 w-full p-2">
								<AudioStream
									src={artDetail?.imageUrl}
									setIconShow={setIconShow}
									iconShow={iconShow}
									loop
									playsInline
									autoPlay
								/>
							</div>
						)
					)}
				</div>
			</div>
			{!artDetail?.adDrop && artDetail?.isAd === true && (
				<div className="">
					<span className="absolute bottom-0 left-0 w-[100%] h-full py-[19px] xl:px-[4px] md:px-0 text-center justify-center text-white xl:text-[16px] sm:text-[14px] text-[10px] bg-[rgba(0,0,0,0.6)] align-middle flex content-center items-center">
						{undiscoveredDetailI18}
					</span>
				</div>
			)}
		</div>
	);
}
