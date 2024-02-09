import { getToken } from 'utils/storage'

export const FileHandler = () => {
  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };
  return { dataURLtoFile };
};


export async function downloadImage(imageFile, ipfsUrl, fileType) {
  if (!imageFile) return;
  let imgUrl = imageFile.url;

  const token = getToken();

  try {
      if ("AUDIO" === fileType) {
          const downloadUrl = `${process.env.url}/files/download/${imageFile.id}`;
          var xhr = new XMLHttpRequest();
          xhr.open("POST", downloadUrl);
          xhr.responseType = "arraybuffer";
          xhr.onload = function () {
              if (this.status === 200) {
                  var blob = new Blob([xhr.response], { type: "application/zip" });
                  var objectUrl = URL.createObjectURL(blob);
                  const fileNm =
                      imageFile?.name.split(".").slice(0, -1).join(".") + ".zip";
                  const link = document.createElement("a");
                  link.href = objectUrl;
                  link.setAttribute("download", fileNm);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(objectUrl);
              }
          };
          xhr.setRequestHeader(
              "Authorization",
              `Bearer ${token}`
          );
          xhr.send();
          return;
      }
      if (imageFile.mimeType === "image/gif" && ipfsUrl) {
          const formData = {
              url: ipfsUrl
          }
          const options = {
              method : 'POST',
              body : JSON.stringify(formData)
          }
          const res = await fetch("/api/downloadNft", options);
          const data = await res.json();
          imgUrl = data.url;
      }
      const image = await fetch(imgUrl);
      const imageBlog = await image.blob();
      const objectUrl = URL.createObjectURL(imageBlog);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.setAttribute("download", imageFile?.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
  } catch (error) {
  }
}