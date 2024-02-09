import { ArtDetailProvider } from "Components/entities/artwork/detail/useArtDetailContext";
import { LicenseProvider } from "Components/entities/license/useLicenseContext";
import Seo from "common/seo/Seo";
import dynamic from "next/dynamic";

const CreateArtworkLicenseRequest = dynamic(() => import("Components/entities/license/createLicenseRequest"), { ssr: false })

export default function LicenseRequest() {
  return (
    <>
        <Seo title="License Request" />
      <ArtDetailProvider>
          <LicenseProvider>
              <CreateArtworkLicenseRequest />
          </LicenseProvider>
      </ArtDetailProvider>
    </>
  );
}
