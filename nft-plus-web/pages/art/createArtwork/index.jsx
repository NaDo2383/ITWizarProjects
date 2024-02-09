import dynamic from "next/dynamic";
import ProtectedPage from "Components/entities/user/auth/ProtectedRoute";
import { ArtworkProvider } from "Components/entities/artwork/useArtworkContext";
import Seo from "common/seo/Seo";

const ClientSideCreateArtWork = dynamic( () => import("Components/entities/artwork/CreateArtwork"), { ssr: false } )

export default function CreateArtWork() {
    return (
        <>
            <Seo title="Create Artwork" />
            <ProtectedPage>
                <ArtworkProvider>
                    <ClientSideCreateArtWork />
                </ArtworkProvider>
            </ProtectedPage>                
        </>
    );
}
