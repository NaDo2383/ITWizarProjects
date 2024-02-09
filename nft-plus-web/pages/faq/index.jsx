import dynamic from "next/dynamic";
import Seo from "common/seo/Seo";
const ClientSideUguide = dynamic(() => import("Components/entities/uguide/Uguide"), { ssr: false })

export default function Notice() {
  return (
    <>
      <Seo/>
      {/* <ProtectedPage> */}
          <ClientSideUguide />
      {/* </ProtectedPage> */}
    </>
  );
}
