import React from 'react'
import Container from 'Components/ui/containers/Container'
import ArtistBanner from 'Components/entities/artist/ArtistBanner'
import dynamic from "next/dynamic";
import Seo from 'common/seo/Seo';
import useCommonTranslation from "locale/useCommonTranslation";
import tw from 'tailwind-styled-components'
import { ArtistProvider } from 'Components/entities/artist/useArtistContext';
import { getPreRenderModel } from 'common/axios/crud';
import { apis } from 'utils/libs';
const ClientSideArtists = dynamic(() => import("Components/entities/artist/artistList"),{ ssr: false });

function ArtistPage(props) {
  // const { artists } = props
  const { submenu_artist } = useCommonTranslation();

  return (
      <ArtistProvider>
        <Seo title="Artist"/>
        <Container>
            {/* <ArtistBanner /> */}
            <div className='mt-[25px] mb-[40px] sm:mt-[50px] sm:mb-[80px]'>
              <PageTitle>{ submenu_artist }</PageTitle>
            </div>
            <ClientSideArtists />
        </Container>
      </ArtistProvider>
  )
}

// export async function getServerSideProps() {
//   const res = await getPreRenderModel(apis.artist)
  
//   if(!res) {
//     return {
//       props: {
//         message: 'not found'
//       }
//     }
//   }

//   return {
//     props: {
//       artists: res.result
//     }
//   }
// }


export const PageTitle = tw.h2` 
  text-[20px]
  sm:text-[30px]
  text-[#E0E6E8]
  text-center
  -tracking-[0.36px]
`

export default ArtistPage