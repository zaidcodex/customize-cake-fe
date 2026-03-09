import { useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropImage";

const ImgCrop = ({ yourImage, onCropDone }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = async (_, croppedAreaPixels) => {
    const croppedBlob = await getCroppedImg(
      yourImage,
      croppedAreaPixels
    );
    onCropDone(croppedBlob); // ✅ SAVE HERE
  };

  return (
    <Cropper
      image={yourImage}
      crop={crop}
      zoom={zoom}
      aspect={6 / 6}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  );
};

export default ImgCrop;
