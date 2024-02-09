import { apis } from "utils/libs";
import { getPreRenderModel } from "common/axios/crud";
import { ArtDetailProvider } from "Components/entities/artwork/detail/useArtDetailContext";
import ArtDetail from "Components/entities/artwork/detail/ArtDetail";
import { ArtworkProvider } from "Components/entities/artwork/useArtworkContext";
import Seo from "common/seo/Seo";

 function ArtDetailPreview(props) {
    const { artwork } = props
    
    return (
      <>
        <Seo title={artwork?.artworkName}/>
        <ArtworkProvider>
            <ArtDetailProvider>
                <ArtDetail artwork={ artwork } />
            </ArtDetailProvider>
        </ArtworkProvider>
      </>
    );
}
export default ArtDetailPreview;

export async function getServerSideProps(context) {
  const id = context.query.id;
  const res = await getPreRenderModel(apis.artworkDetail + "/" + id);
  const artwork = await res?.result;

  if (!artwork) {
    return {
      props: {
        message: "not found"
      }
    };
  }
  return { props: { artwork } };
}
