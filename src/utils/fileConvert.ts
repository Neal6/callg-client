export const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result;
      resolve(base64String);
    };
    reader.onerror = (error: any) => reject(error);
  });

export const getDimensionImage = (url: any) =>
  new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = url;
  });

export const getDimensionVideo = (url: any) =>
  new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.onloadedmetadata = (evt) => {
      resolve({ width: video.videoWidth, height: video.videoHeight });
    };
    video.src = url;
    video.load();
  });
