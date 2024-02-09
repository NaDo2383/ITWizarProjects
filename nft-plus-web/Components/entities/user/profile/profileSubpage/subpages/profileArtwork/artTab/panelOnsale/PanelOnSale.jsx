import React, { useEffect } from "react";
import Loader from "Components/ui/loader";
import useArtwork from "Components/entities/artwork/useArtwork";
import useAuthUser from "Components/entities/user/auth/useAuthUser";
import useMyPageTranslation from "locale/useMypageTranslation";
import ItsEmpty from "Components/ui/error/ItsEmpty";
import PerWork from "../panelHolding/PerWork";
import PerWorkInfo from "../panelHolding/PerWorkInfo";
import MergedRights from "../panelHolding/MergedRights";
import { IcoDownload } from "Components/ui/icon/icons";
import PaginationNice from "Components/ui/pagination/PaginationNice";
import { OwnsAllLicenses } from "Components/ui/_moleculs/Mini";
import OwnsSomeLicenses from "../panelHolding/OwnsSomeLicenses";
import { downloadImage } from "utils/file";

function OnSalePanel() {
	const {
		typeI18,
		work18,
		author18,
		title_work18,
		retainedLicenseI18,
		creativeWorkI18,
		transactionWorkI18,
		oiginalDownloadI18
	} = useMyPageTranslation();
	const { authUser } = useAuthUser();
	const {
		changeArtPagination,
		getStockArtworks,
		artPagination,
		setArtPagination,
		artworkLoading,
		artworksByStocked
	} = useArtwork();


	async function handlePagination(e, value) {
		await changeArtPagination(value);
		await getStockArtworks(value);
	}
	useEffect(() => {
		getStockArtworks();
		return () => {
			setArtPagination((prev) => ({ ...prev, page: 1 }));
		};
	}, []);

	return (
		<>
			{artworkLoading?.artworksByStockedLoading ? (
				<Loader />
			) : (
				<div>
					{artworksByStocked?.result?.content?.length > 0 ? (
						<>
							<table
								role="table for holding artworks profile page"
								className="hidden md:block">
								<colgroup>
									<col width="3%" />
									<col width="8%" />
									<col width="15%" />
									<col width="8%" />
									<col width="5%" />
								</colgroup>
								<thead>
									<tr>
										<td>{typeI18}</td>
										<td>{work18}</td>
										<td>
											{author18}/{title_work18}
										</td>
										<td>{retainedLicenseI18}</td>
										<td>{oiginalDownloadI18}</td>
									</tr>
								</thead>
								<tbody>
									{artworksByStocked?.result.content.map((artwork, idx) => {
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
												<td className="text-[#5A5D5A]">
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
													<button
														onClick={() => {
															downloadImage(
																artwork?.imageFile,
																artwork?.ipfsUrl,
																artwork?.fileType
															);
														}}
														type="button">
														<IcoDownload />
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							<table className="md:hidden">
								<tbody>
									{getStockArtworks?.content?.map((artwork, idx) => {
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
											licenseRights
										} = artwork;
										return (
											<tr key={"holding-work-" + idx} className="flex flex-col">
												<td>
													<PerWork
														data={{
															artworkId,
															img: artwork.thumbnailUrl2x,
															heartCount
														}}
													/>
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
													<div className="mt-4 mx-6">
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
													</div>
													<div
														className="mt-4"
														onClick={() => {
															downloadImage(
																artwork?.imageFile,
																artwork?.ipfsUrl,
																artwork?.fileType
															);
														}}>
														<IcoDownload />
													</div>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							<div className="flex w-full justify-center pt-[100px]">
								<PaginationNice

								
									data={{
										data: artworksByStocked?.result,
										page: artPagination?.page
									}}
									onChange={handlePagination}
								/>
							</div>
						</>
					) : (
						<ItsEmpty />
					)}
				</div>
			)}
		</>
	);
}

export default OnSalePanel;
