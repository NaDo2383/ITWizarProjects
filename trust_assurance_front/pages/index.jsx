import Layout from "@/components/layout/Layout";
import dynamic from "next/dynamic";
import { ArtworkProvider } from "@/features/artwork/useArtworkContext";
import { PopupProvider } from "@/common/popup/usePopupCtx";
// import ArtworkList from '@/features/artwork/list/ArtworkList'
const ArtworkList = dynamic(
    () => import("@/features/artwork/list/ArtworkList"),
    {
        ssr: false,
    }
);
export default function Home() {
    return (
        <>
            <ArtworkProvider>
                <PopupProvider>
                        <ArtworkList />
                </PopupProvider>
            </ArtworkProvider>
        </>
    );
}
