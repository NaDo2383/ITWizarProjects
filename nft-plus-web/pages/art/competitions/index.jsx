import { ArtworkProvider } from "Components/entities/artwork/useArtworkContext";
import Seo from "common/seo/Seo";
import dynamic from "next/dynamic";

const ClientSideCompetitions = dynamic(() => import("Components/entities/competition/ClientSideCompetitions"),{ ssr: false });

function Competitions() {
  return (
    <>
      <Seo title="Competitions"/>
      <ArtworkProvider>
        <ClientSideCompetitions />
      </ArtworkProvider>
    </>
  );
}

export default Competitions;
