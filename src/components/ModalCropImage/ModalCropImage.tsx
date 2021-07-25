import React, { useState, useCallback } from "react";
import { Modal, Slider } from "antd";
import { BsImage } from "react-icons/bs";
import Cropper from "react-easy-crop";

import "./modalCropImage.scss";
import getCroppedImg from "@utils/cropImage";

type PropTypes = {
  visible: boolean;
  onCancel: any;
  onCropDone: any;
  image: any;
};

const ModalCropImage = (props: PropTypes) => {
  const { visible, onCancel, onCropDone, image } = props;
  const [crop, setCrop] = useState<any>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [croppedImage, setCroppedImage] = useState<any>(null);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const onCropImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, 0);
      setZoom(1);
      onCropDone(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  return (
    <Modal
      title="Cập nhật ảnh đại diện"
      visible={visible}
      onOk={onCropImage}
      onCancel={() => {
        setZoom(1);
        onCancel();
      }}
      wrapClassName="modal-crop-avatar"
      okText="Thêm"
      cancelText="Hủy"
      destroyOnClose
    >
      <div className="modal-crop-avatar-content">
        <div className="crop-container">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={3 / 3}
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      </div>
      <div className="modal-crop-avatar-zoom">
        <BsImage />
        <Slider
          min={1}
          max={3}
          step={0.01}
          onChange={(value: any) => setZoom(value)}
          value={zoom}
          tooltipVisible={false}
          className="slider"
        />
        <BsImage style={{ fontSize: 24 }} />
      </div>
    </Modal>
  );
};

export default ModalCropImage;
