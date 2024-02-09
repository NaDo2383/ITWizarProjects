import MainEventPage from "Components/entities/events/MainEventPagel";
import Seo from "common/seo/Seo";
import useArtworkTranslation from "locale/useArtworkTranslation";
import useCommonTranslation from "locale/useCommonTranslation";
import Image from "next/image";
import { EventProvider } from "Components/entities/events/useEventContext";

function EventsPage() {
  const { preparingEventI18 } = useCommonTranslation();

  return (
    <EventProvider>
        <Seo title="Event" />
        {/*process.env.mode === "production" ? (
          <>
            <div className="flex justify-center items-center w-full min-h-full max-h-screen">
              <div className="flex flex-col justify-center items-center">
                <div className="image-container">
                  <Image
                    src="/vmmachine/vmmachine.png"
                    width={284}
                    height={284}
                    objectFit="contain"
                    alt="vm_machine"
                  />
                </div>
                <p className="text-[#E0E6E8] text-[20px] font-[500] leading-[28px] mb-[373px]">
                  {preparingEventI18}
                </p>
              </div>
            </div>
            <style jsx>{`
              .image-container {
                margin-top: 215px;
              }           
            `}</style>
          </>
            */}
        <MainEventPage />    

    </EventProvider>
  );
}

export default EventsPage;
