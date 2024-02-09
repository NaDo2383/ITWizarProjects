import ArtworkRegProgress from "./issuedNft/IssuedNFT";
import LicenseAgreement from "./licenseAgreement/LicenseAgreement";
import OwnershipTransaction from "./activityHistory/ActivityHistory";
import ProfileArtwork from "./profileArtwork/ProfileArtwork";

export const subpages = [
  <ProfileArtwork key={1} />,
  <ArtworkRegProgress key={2} />,
  <OwnershipTransaction key={3} />,
  <LicenseAgreement key={4} />,
];
