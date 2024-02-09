import {
	FitScreen,
	PauseSharp,
	PlayArrowSharp,
	VolumeMute,
	VolumeUp
} from "@mui/icons-material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const TenSecTempPlayer = ({ zurag, tenSecTemp, img }) => {
	const ref = useRef();
	const [isPlay, setIsPlay] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const handleProgress = (event) => {
		const video = event.target;
		const currentTime = video.currentTime;
		setCurrentTime(currentTime);
		const duration = video.duration;
		const progress = (currentTime / duration) * 100;
		if (Math.round(currentTime) === Math.floor(duration) && ref.current) {
			ref.current.currentTime = 0;
			ref.current.pause();
			setIsPlay(false);
			return;
		}
	};

	useEffect(() => {}, [currentTime]);

	const onLoad = () => {
		const video = ref.current;
		setDuration(Math.floor(video.duration));
	};

	useEffect(() => {
		if (ref.current) {
			if (isPlay) {
				ref.current.play();
			} else {
				ref.current.pause();
			}
		}
	}, [isPlay]);

	useEffect(() => {
		if (ref.current) {
			ref.current.muted = isMuted;
		}
	}, [isMuted]);

	return (
		<>
			{["video/mp4", "video/quicktime", "video/avi"].includes(zurag?.type) ? (
				<>
					<div className="relative w-full">
						<video
							ref={ref}
							onTimeUpdate={handleProgress}
							onLoadedData={onLoad}
							src={
								["video/mp4", "video/avi", "video/quicktime"].includes(
									zurag?.type
								)
									? tenSecTemp
									: img
							}
						/>
						<source
							src={
								["video/mp4", "video/avi", "video/quicktime"].includes(
									zurag?.type
								)
									? tenSecTemp
									: img
							}
							type="video/mp4"
						/>
						<div className="absolute z-50 w-full h-8">
							<div className="relative  bottom-16 left-0 bg-gradient-to-t from-black w-full">
								<div className="w-full flex justify-between items-center text-white -8">
									<div className="flex items-center gap-2 h-16">
										{isPlay ? (
											<PauseSharp
												onClick={() => setIsPlay(!isPlay)}
												style={{
													width: "30px",
													height: "30px",
													display: "block",
													color: "white !important"
												}}
												className="text-white cursor-pointer"
												color="white"
											/>
										) : (
											<PlayArrowSharp
												onClick={() => setIsPlay(!isPlay)}
												sx={{
													width: "30px",
													height: "30px",
													display: "block",
													color: "white !important"
												}}
												color="white"
												className="text-white cursor-pointer"
											/>
										)}
										00:{Math.floor(currentTime) < 10 && 0}
										{Math.floor(currentTime)}/00:{Math.floor(duration) < 0 && 0}
										{Math.floor(duration)}
									</div>
									<div className="flex gap-1 w-[100px]">
										{isMuted ? (
											<VolumeMute
												onClick={() => setIsMuted(!isMuted)}
												style={{
													width: "30px",
													height: "30px",
													display: "block",
													color: "white !important"
												}}
												color="white"
												className="text-white cursor-pointer"
											/>
										) : (
											<VolumeUp
												color="white"
												onClick={() => setIsMuted(!isMuted)}
												style={{
													width: "30px",
													height: "30px",
													display: "block",
													color: "white !important"
												}}
												className="text-white cursor-pointer"
											/>
										)}
										<FitScreen
											color="white"
											onClick={() => ref.current.webkitRequestFullScreen()}
											style={{
												width: "30px",
												height: "30px",
												display: "block",
												color: "white !important"
											}}
											className="text-white cursor-pointer"
										/>
									</div>
								</div>
							</div>
							<div className="relative w-[480px] mt-3 h-1 overflow-hidden rounded-full">
								<span
									style={{ width: "30px" }}
									className="h-full bg-white"></span>
								<span className="w-full h-full bg-black"></span>
							</div>
						</div>
					</div>
				</>
			) : ["audio/mpeg", "audio/mp3", "audio/wav"].includes(zurag?.type) ? (
				<div className="relative w-full min-h-[200px] flex justify-center items-end">
					<audio
						ref={ref}
						onLoadedData={onLoad}
						onTimeUpdate={handleProgress}
						src={
							["audio/mpeg", "audio/mp3", "audio/wav"].includes(zurag?.type)
								? tenSecTemp
								: img
						}
					/>
					<div className="absolute z-50 w-full">
						<div className="relative  -bottom-4 left-0 bg-gradient-to-t from-black w-full ">
							<div className="w-full flex justify-between items-center text-white -8">
								<div className="flex items-center gap-2 h-16">
									{isPlay ? (
										<PauseSharp
											onClick={() => setIsPlay(!isPlay)}
											style={{
												width: "30px",
												height: "30px",
												display: "block",
												color: "white !important"
											}}
											className="text-white cursor-pointer"
										/>
									) : (
										<PlayArrowSharp
											onClick={() => setIsPlay(!isPlay)}
											style={{
												width: "30px",
												height: "30px",
												display: "block",
												color: "white !important"
											}}
											className="text-white cursor-pointer"
										/>
									)}
									00:{Math.floor(currentTime) < 10 && 0}
									{Math.floor(currentTime)}/00:{Math.floor(duration) < 0 && 0}
									{Math.floor(duration)}
								</div>
								<div className="flex gap-1 w-[60px]">
									{isMuted ? (
										<VolumeMute
											onClick={() => setIsMuted(!isMuted)}
											style={{
												width: "30px",
												height: "30px",
												display: "block",
												color: "white !important "
											}}
											className="text-white cursor-pointer"
										/>
									) : (
										<VolumeUp
											onClick={() => setIsMuted(!isMuted)}
											style={{
												width: "30px",
												height: "30px",
												display: "block",
												color: "white !important"
											}}
											className="text-white cursor-pointer"
										/>
									)}
								</div>
							</div>
						</div>
						<div className="relative w-[480px] mt-3 h-1 overflow-hidden rounded-full">
							<span
								style={{ width: "30px" }}
								className="h-full bg-white"></span>
							<span className="w-full h-full bg-black"></span>
						</div>
					</div>
				</div>
			) : (
				<Image  src={img} alt="img" layout="fill" objectFit="contain" />
			)}
		</>
	);
};

export default TenSecTempPlayer;
