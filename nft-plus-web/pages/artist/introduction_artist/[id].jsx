import ArtistIntroduction from "Components/entities/artist/artistIntroduction/ArtistIntroduction";
import useArtist from "Components/entities/artist/useArtist";
import { getPreRenderModel } from "common/axios/crud";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { apis } from "utils/libs";
import { ArtistProvider } from 'Components/entities/artist/useArtistContext';
import { parse } from 'cookie';

export default function Introduction(props) {
    return (
        <ArtistProvider >
            <div className="">
            <ArtistIntroduction/> 
            </div>
        </ArtistProvider>
    );
}
