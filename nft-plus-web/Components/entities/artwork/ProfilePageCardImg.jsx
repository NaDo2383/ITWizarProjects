/**
 * @createdBy duka
 */
import { PlayCircle, VolumeUp } from "@mui/icons-material";
import ProfilePage from "./ProfilePage";
import { useEffect, useRef, useState } from "react";

const ProfilePageCardImg = ({
  imageUrl,
  auction,
  def,
  thumbnail,
  name,
  isAuction,
  fileType
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isHeighter, setIsHeighter] = useState(false);
  const [imgWidth, setImgWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const imageRef = useRef(null);
  const videoRef = useRef();
  const containerRef = useRef();

  const onLoadImg = ({ target: img }) => {
    if (imageRef) {
      if (img.naturalWidth > img.naturalHeight) {
        setIsHeighter(false);
      } else {
        setIsHeighter(true);
      }
    }
    setImgWidth(img.naturalWidth);
    setImgHeight(img.naturalHeight);
  };

  const onLoadVideo = () => {
    if (videoRef.current && fileType === "VIDEO") {
      if (videoRef.current.videoWidth > videoRef.current.videoHeight) {
        setIsHeighter(false);
      } else {
        setIsHeighter(true);
      }
      setImgWidth(videoRef.current.videoWidth);
      setImgHeight(videoRef.current.videoHeight);
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
      setContainerWidth(containerRef.current.offsetWidth);
      }
    }
    }, [isHeighter]);

  useEffect(() => {
    if (videoRef.current && fileType === "VIDEO") {
      setImgWidth(videoRef.current.videoWidth);
      setImgHeight(videoRef.current.videoHeight);
    }
  }, [videoRef, videoRef.current]);

  return (
    <>
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        ref={containerRef}
        className={` relative h-full w-full cursor-pointer `}>
        {isAuction && <ProfilePage auction={auction} />}
        {fileType === "VIDEO" ? (
          <div className={`flex justify-center items-center ${isHover && "sm:rounded-[20px] rounded-[9.756px]"
            } overflow-hidden  w-full h-full object-cover`}>
            <video
              className={` relative sm:rounded-t-[20px] rounded-t-[9.576px] z-0 ${isHover && "sm:rounded-[20px] rounded-[9.756px]"
                } transform transition duration-500 object-cover`}
              src={imageUrl}
              loop
              autoPlay
              muted
              ref={videoRef}
              playsInline
              style={{
                height: imgHeight
                  ? isHover
                    ? isHeighter
                      ? `100%`
                      : `${(((imgHeight * containerWidth) / imgWidth) * 100) /
                      containerHeight
                      }%`
                    : isHeighter ? `${(((imgHeight * containerWidth) / imgWidth) * 100 * 1.1) /
                      containerHeight
                      }%` : `100%`
                  : "min-content",
                width: imgWidth
                  ? isHover
                    ? !isHeighter
                      ? `100%`
                      : `${(((imgWidth * containerHeight) / imgHeight) * 100) /
                      containerWidth
                      }%`
                    : !isHeighter ? `${(((imgWidth * containerHeight) / imgHeight) * 100) * 1.1 /
                      containerWidth
                      }%` : `100%`
                  : "min-content",
                overflow: "hidden",
                transition: "all 0.3s ease-in-out",
              }}
              onLoadedData={onLoadVideo}
              alt={imageUrl}>
              <source src={imageUrl} type="video"
                style={{
                  height: imgHeight
                    ? isHover
                      ? isHeighter
                        ? `100%`
                        : `${(((imgHeight * containerWidth) / imgWidth) * 100) /
                        containerHeight
                        }%`
                      : isHeighter ? `${(((imgHeight * containerWidth) / imgWidth) * 100 * 1.1) /
                        containerHeight
                        }%` : `100%`
                    : "min-content",
                  width: imgWidth
                    ? isHover
                      ? !isHeighter
                        ? `100%`
                        : `${(((imgWidth * containerHeight) / imgHeight) * 100) /
                        containerWidth
                        }%`
                      : !isHeighter ? `${(((imgWidth * containerHeight) / imgHeight) * 100) * 1.1 /
                        containerWidth
                        }%` : `100%`
                    : "min-content",
                  overflow: "hidden",
                  transition: "all 0.3s ease-in-out",
                }}
              />
            </video>
            <div className="absolute AUDIO bottom-0 left-[6px] p-2">
              <PlayCircle
                style={{ width: "24px", height: "24px" }}
                className="w-[24px] h-[24px]"
              />
            </div>
          </div>
        ) : fileType === "AUDIO" ? (
          <div
            className={`flex justify-center items-center ${isHover && "sm:rounded-[20px] rounded-[9.756px]"
              } overflow-hidden w-full h-full object-cover`}>
            <img
              className={`relative sm:rounded-t-[20px] rounded-t-[9.576px] z-0 ${isHover && "rounded-[20px]"} transform transition duration-500 object-cover`}
              src={thumbnail ? thumbnail : def}
              alt="thumbnail"
              onLoad={onLoadImg}
              ref={imageRef}
              style={{
                height: imgHeight
                  ? isHover
                    ? isHeighter
                      ? `100%`
                      : `${(((imgHeight * containerWidth) / imgWidth) * 100) /
                      containerHeight
                      }%`
                    : isHeighter ? `${(((imgHeight * containerWidth) / imgWidth) * 100 * 1.1) /
                      containerHeight
                      }%` : `100%`
                  : "min-content",
                width: imgWidth
                  ? isHover
                    ? !isHeighter
                      ? `100%`
                      : `${(((imgWidth * containerHeight) / imgHeight) * 100) /
                      containerWidth
                      }%`
                    : !isHeighter ? `${(((imgWidth * containerHeight) / imgHeight) * 100) * 1.1 /
                      containerWidth
                      }%` : `100%`
                  : "min-content",
                overflow: "hidden",
                transition: "all 0.3s ease-in-out",
              }}
            />
            <div className="absolute AUDIO bottom-0 left-[6px]  p-2">
              <VolumeUp
                style={{ width: "24px", height: "24px" }}
                className="w-[24px] h-[24px]"
              />
            </div>
          </div>
        ) : (
          <div className={`flex justify-center items-center h-full object-cover `}>
            <img
              className={`relative sm:rounded-t-[20px] rounded-t-[9.576px] z-0 ${isHover && "sm:rounded-[20px] rounded-[9.756px]"
                } transform transition duration-500  object-cover p-0 m-0`}
              ref={imageRef}
              src={thumbnail ? thumbnail : def}
              onLoad={onLoadImg}
              alt="thumbnail"
              style={{
                height: imgHeight
                  ? isHover
                    ? isHeighter
                      ? `100%`
                      : `${(((imgHeight * containerWidth) / imgWidth) * 100) /
                      containerHeight
                      }%`
                    : isHeighter ? `${(((imgHeight * containerWidth) / imgWidth) * 100 * 1.1) /
                      containerHeight
                      }%` : `100%`
                  : "min-content",
                width: imgWidth
                  ? isHover
                    ? !isHeighter
                      ? `100%`
                      : `${(((imgWidth * containerHeight) / imgHeight) * 100) /
                      containerWidth
                      }%`
                    : !isHeighter ? `${(((imgWidth * containerHeight) / imgHeight) * 100) * 1.1 /
                      containerWidth
                      }%` : `100%`
                  : "min-content",
                overflow: "hidden",
                transition: "all 0.3s ease-in-out",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePageCardImg;