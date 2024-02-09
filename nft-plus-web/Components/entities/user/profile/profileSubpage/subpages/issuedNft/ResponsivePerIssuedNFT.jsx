import React from "react";
import { ArtCreator } from "Components/ui/_moleculs/Mini";
import { StampTamTam } from "Components/ui/_moleculs/Stamps";
import DisplayProgressBtn from "./DisplayProgressBtn";

function PerArtProgress(props) {
	const {
		thumbnailUrl3x,
		tamtamApproved,
		artworkName,
		authorName,
		authorProfileImg,
		createdDate
	} = props;

	return (
		<tr>
			<td>
				<div className="flex justify-center mb-3">
					<img
						src={thumbnailUrl3x}
						width="100%"
						height="100%"
						className="w-[160px] h-[135px] rounded-xl object-cover"
						alt="artworkThumb3x"
					/>
				</div>
				<div className="mb-3">{createdDate.split(" ")[0]}</div>
			</td>
			<td>
				<div className="flex flex-col justify-center gap-2 mb-6">
					{tamtamApproved && (
						<StampTamTam src={"/star.png"} height={32} width={32} />
					)}
					<h2 className="text-[17px] mt-1 font-[500]  text-black tracking-0">
						{artworkName}
					</h2>
					<ArtCreator data={{ authorName, authorProfileImg }} />
				</div>
				<DisplayProgressBtn {...props} />
			</td>
		</tr>
	);
}

export default PerArtProgress;
