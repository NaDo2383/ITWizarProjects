import pro from "public/def_pro.png";
import Link from "next/link";
import { PlayCircle, VolumeUp } from "@mui/icons-material";

const MostLikedArtCard = (props) => {
  const {
    thumbnailUrl3x: src,
    id,
    authorId,
    authorImage: avatar,
    name,
    authorName
  } = props;
  
  return (
    <div className=" w-full h-full bg-gray-400 rounded-xl shadow-md overflow-hidden">
      <div className="h-2/3 relative">
        <Link href={`/artist/${authorId}`} passHref>
          <a>
            {props?.fileType !== "VIDEO" ? (
              <>
                <img
                  className="w-full h-full overflow-hidden 
                  object-cover"
                  src={
                    props?.artwork3xThumbnail
                      ? props?.artwork3xThumbnail
                      : props.imageUrl
                  }
                  alt={`art`}
                />
                {props?.fileType === "AUDIO" && (
                  <div className="absolute AUDIO top-0 left-[6px]  p-2">
                    <VolumeUp
                      style={{ width: "24px", height: "24px" }}
                      className="w-[24px] h-[24px]"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <video
                  className={` relative rounded-t-2xl z-0 w-full h-full object-cover`}
                  src={props?.imageUrl}
                  loop
                  autoPlay
                  muted
                  playsInline
                  alt={props.name}>
                  <source
                    src={props?.imageUrl }
                    type="video"
                  />
                </video>
                <div className="absolute AUDIO top-0 left-[6px]  p-2">
                  <PlayCircle
                    style={{ width: "24px", height: "24px" }}
                    className="w-[24px] h-[24px]"
                  />
                </div>
              </>
            )}
          </a>
        </Link>
      </div>
      <div className="h-1/3 relative bg-nogoon">
        <div className="absolute z-30 left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-20 h-20 rounded-full border-[3px] border-white bg-white overflow-hidden">
          <div
            className={`flex ${
              avatar ? "items-center" : "items-end justify-center bg-[#333]"
            } relative h-[74px]`}>
            <img
              src={avatar ? avatar : pro.src}
              className={`absolute center object-cover ${
                avatar ? "w-full h-full" : "w-[56px] h-[58px]"
              }} block`}
              alt="profile_picture"
            />
          </div>
        </div>
        <div className="flex flex-col justify-end  h-[160px] text-white pb-[40px]">
          <Link href={`/artist/${authorId}`} passHref>
            <a className="pb-2 text-[18px]">{authorName}</a>
          </Link>
          <Link href={`/art/preview/${id}`} passHref>
            <a className="text-[24px] font-bold">{name}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MostLikedArtCard;
