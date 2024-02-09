import React, { useRef } from "react";

const AudioStream = ({ imageUrl, iconShow, setIconShow, ...props }) => {
	const playerRef = useRef();
	const handleProgress = (event) => {
		const audio = event.target;
		const currentTime = audio.currentTime;
		const duration = audio.duration;
		const progress = (currentTime / duration) * 100;
		if (
			(currentTime > 10 || Math.round(currentTime) === Math.floor(duration)) &&
			playerRef.current
		) {
			setIconShow(false);
			playerRef.current.pause();
			return;
		}
	};

	return (
		<>
			<audio
				src={imageUrl}
				controls
				onTimeUpdate={handleProgress}
				className="w-full"
				ref={playerRef}
				{...props}
			/>
		</>
	);
};

export default AudioStream;
