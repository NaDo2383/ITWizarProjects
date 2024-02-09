import Artist from "Components/entities/artist/ArtistDetail";
import { ArtworkProvider } from "Components/entities/artwork/useArtworkContext";
import { getPreRenderModel } from "common/axios/crud";
import Seo from "common/seo/Seo";
import { apis } from "utils/libs";

function ArtistPage(props) {
    return (
        <>
            <Seo 
                title="Artist"
                preloadImg={props?.artist?.profileThumbUrl ? props.artist.profileThumbUrl : null}  
            />
            <Artist artist={props.artist} />
        </>
    )
}
export async function getServerSideProps(context) {
    const id = context.query.id
    const res = await getPreRenderModel(apis.artist + `/${id}`)
    const artist = await res?.result

    if(!artist) {
        return {
            props: {
                message: 'not found'
            }
        }
    }
    return {
        props: { artist }
    }
}
export default ArtistPage;
