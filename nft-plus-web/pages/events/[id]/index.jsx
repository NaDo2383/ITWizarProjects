import ArtDetail from "Components/entities/artwork/detail/ArtDetail";
import { ArtDetailProvider } from "Components/entities/artwork/detail/useArtDetailContext";
import { ArtworkProvider } from "Components/entities/artwork/useArtworkContext";
import { EventProvider } from "Components/entities/events/useEventContext";
import { getPreRenderModel } from "common/axios/crud";
import Seo from "common/seo/Seo";
import { useRouter } from "next/router";
import { apis } from "utils/libs";

function EventDetailPreview(props) {
	const {artwork} = props; 
	const router = useRouter();
	
	return (
		<>
			<Seo title="Event"/>
			<EventProvider>
			<ArtworkProvider>
					<ArtDetailProvider>
						<ArtDetail artwork={artwork} isEvent />
					</ArtDetailProvider>
				</ArtworkProvider>
			</EventProvider>
		</>
	);
}
export default EventDetailPreview;

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
