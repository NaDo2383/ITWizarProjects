import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

const VideoStream = ({ url, loop = false, iconShow, setIconShow }) => {
	const playerRef = useRef();
	const handleProgress = (event) => {
		const video = event.target;
		const currentTime = video.currentTime;
		const duration = video.duration;
		const progress = (currentTime / duration) * 100;
		if ((currentTime > 10 || currentTime === duration) && playerRef.current) {
			setIconShow(false);
			playerRef.current.pause();
			return;
		}
	};
	const [controlsVisible, setControlsVisible] = useState(false)
	const [isTalllerVideo, setIsTalllerVideo] = useState(true)

	useEffect(() => {
		if(!isMobile)
			return
		if (iconShow && playerRef.current) {
			playerRef.current.play();
		} else if (!iconShow && playerRef.current) {
			playerRef.current.currentTime = 0;
			playerRef.current.pause();
			setIconShow(false);
		}


	}, [iconShow, playerRef?.current]);

	useEffect(()=>{
		if(playerRef?.current?.clientHeight && playerRef?.current?.clientWidth){
			setIsTalllerVideo(playerRef.current.clientHeight>playerRef.current.clientWidth)
		}
	},[playerRef?.current?.clientHeight, playerRef?.current?.clientWidth])

	function handlePlay(){
		setIconShow(true)
	}

	function handlePause(){
		setIconShow(false)
	}

	function handleToggleVideo (){
		if(!isMobile)
			return
		if(playerRef?.current?.paused){
			playerRef?.current?.play()
			setControlsVisible(true)
		} else {
			playerRef?.current?.pause()
			setControlsVisible(true)
		}

	}

	//console.log(isTalllerVideo, playerRef.current?.clientHeight , playerRef.current?.clientWidth);
	return url ? (
		<div
			className={` ${
				loop &&
				"overflow-hidden w-full reactPlayer "
			} flex object-contain h-full ${!isTalllerVideo ? "w-full" : "" } justify-center items-center  `}
			onMouseEnter={() => !isMobile && setControlsVisible(true)}
			onMouseLeave={() => !isMobile && setControlsVisible(false)}
			onClick={()=> handleToggleVideo()}	
			>
			<video
				// src={url}
				className={`object-contain  ${!isTalllerVideo ? "w-full" : "h-full" } `}
				playsInline
				onPlay={()=>handlePlay()}
				onPause={()=>handlePause()}
				// width={!loop ? "100%" : "auto"}
				// height="100%"
				controls={controlsVisible}
				// onClick={() => setIconShow(!iconShow)}
				ref={playerRef}
				onTimeUpdate={handleProgress}
				// style={{ backgroundColor: "white"}}
			>
				<source src={url} type="video/mp4" />
			</video>
			{/* {!loop && <div className="overlay pointer-events-none" ></div>} */}
		</div>
	) : (
		<div className="flex items-center justify-center h-full mb-4 bg-gray-300 rounded dark:bg-gray-700">
			<svg
				className="w-12 h-12 text-gray-200 dark:text-gray-600"
				xmlns="http://www.w3.org/2000/svg"
				ariaHidden="true"
				fill="currentColor"
				viewBox="0 0 640 512">
				<path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
			</svg>
		</div>
	);
};

export default VideoStream;
