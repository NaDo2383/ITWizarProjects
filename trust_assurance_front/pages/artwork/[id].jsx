import React, { useState } from "react";
import ArtworkDetailPage from "@/features/artwork/detail/ArtworkDetailPage";
import { PopupProvider } from "@/common/popup/usePopupCtx";
import { ArtworkProvider } from "@/features/artwork/useArtworkContext";

export default function ArtworkDetail() {

    return (
        <ArtworkProvider>
            <PopupProvider>
                    <ArtworkDetailPage />
            </PopupProvider>
        </ArtworkProvider>
    );
}