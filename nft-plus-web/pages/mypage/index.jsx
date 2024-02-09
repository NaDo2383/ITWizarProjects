import dynamic from "next/dynamic";
import { ArtworkProvider } from "Components/entities/artwork/useArtworkContext";
import Seo from "common/seo/Seo";
const ClientSideProfile = dynamic(() => import("Components/entities/user/profile/Profile"), { ssr: false })
const ProtectedPage = dynamic(()=> import("Components/entities/user/auth/ProtectedRoute"), {ssr: false })

export default function Mypage() {
  return (
    <>
      <Seo title="Profile"/>
      <ProtectedPage>
          <ArtworkProvider>
              <ClientSideProfile />
          </ArtworkProvider>
      </ProtectedPage>
    </>
  );
}
