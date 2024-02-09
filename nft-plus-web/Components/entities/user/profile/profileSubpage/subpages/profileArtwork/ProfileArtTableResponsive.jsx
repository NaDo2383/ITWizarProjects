import useAuthUser from "Components/entities/user/auth/useAuthUser";
import React from "react";
import MergedRights from "./artTab/panelHolding/MergedRights";
import OwnsSomeLicenses from "./artTab/panelHolding/OwnsSomeLicenses";
import PerWork from "./artTab/panelHolding/PerWork";
import PerWorkInfo from "./artTab/panelHolding/PerWorkInfo";
import { IcoDownload } from "Components/ui/icon/icons";
import { OwnsAllLicenses } from "Components/ui/_moleculs/Mini";
import useArtwork from "Components/entities/artwork/useArtwork";

function ProfileArtTableResponsive(props) {
	const { data } = props;
	const { authUser } = useAuthUser();
	const { changeArtPagination } = useArtwork();

	async function handlePagination(e, value) {
		await changeArtPagination(value);
	}
	return (
		<div>
			<table className="md:hidden">
				<tbody>
					{data?.content?.map((artwork, idx) => {
						const {
							id: artworkId,
							heartCount,
							artworkName,
							authorName,
							authorId,
							authorProfileImg,
							tamtamApproved,
							copyrightRegistered,
							exposeVerify,
							isVerified,
							rights,
							licenseRights,
							fileType,
							imageUrl
						} = artwork;
						return (
							<tr key={"holding-work-" + idx}>
								<td>
									{authUser?.id === authorId
										? creativeWorkI18
										: transactionWorkI18}
								</td>
								<td>
									<PerWork
										data={{
											artworkId,
											img: artwork.thumbnailUrl2x,
											heartCount,
											fileType,
											imageUrl
										}}
									/>
								</td>
								<td>
									<PerWorkInfo
										data={{
											artworkId,
											artworkName,
											authorName,
											authorProfileImg,
											tamtamApproved,
											copyrightRegistered,
											exposeVerify,
											isVerified
										}}
									/>
								</td>
								<td>
									{authUser?.id === authorId ? (
										rights?.length === 7 ? (
											<OwnsAllLicenses />
										) : (
											<OwnsSomeLicenses rights={rights} />
										)
									) : (
										<MergedRights
											data={licenseRights ? licenseRights : rights}
										/>
									)}
								</td>
								<td>
									<IcoDownload />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default ProfileArtTableResponsive;
