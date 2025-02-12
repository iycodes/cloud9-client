import { Dialog, DialogActions, DialogContent, Slider } from "@mui/material";
import React from "react";
import Cropper from "react-easy-crop";
import { BiCrop } from "react-icons/bi";
import styled from "styled-components";
import getCroppedImg from "./utils/CropImage";
//

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Action = styled.div`
  display: flex;
`;

export const ReactEasyCrop = ({
  photoURL,
  openCropModal,
  setOpenCropModal,
  setFile,
  setPhotoURL,
  aspectRatio,
  dialogId,
  cropShape,
}) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);
  const cropComplete = (croppedArea, croppedAreaPixels) =>
    setCroppedAreaPixels(croppedAreaPixels);
  const zoomToPercent = (zoom) => `${Math.round(zoom * 100)}%`;
  const handleCropReset = () => {
    setCrop({ ...crop, x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };
  const handleCrop = async () => {
    try {
      const { file, url } = await getCroppedImg(
        photoURL.ogUrl,
        croppedAreaPixels,
        rotation
      );
      setPhotoURL({ ...photoURL, url: url });
      setFile(file);
      setOpenCropModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog
      id={dialogId}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "auto",
        padding: 20,
      }}
      open={openCropModal}
    >
      {/* <dialog open={openModal}> */}
      <DialogContent
        sx={{
          display: "flex",
          //   width: "auto",
          position: "relative",
          minWidth: "300px",
          height: "300px",
          backgroundColor: "black",
        }}
      >
        <Cropper
          cropShape={cropShape}
          image={photoURL.ogUrl || photoURL.url}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspectRatio}
          onZoomChange={setZoom}
          onCropChange={setCrop}
          onRotationChang={setRotation}
          onCropComplete={cropComplete}
        />
      </DialogContent>
      <DialogActions>
        <Box>
          <Action>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.05}
              valueLabelDisplay="auto"
              valueLabelFormat={zoomToPercent}
              onChange={(e, zoom) => setZoom(e.target.value)}
            />
            <span>zoom:{zoomToPercent(zoom)}</span>
          </Action>
          <Action>
            <Slider
              value={rotation}
              min={0}
              max={360}
              valueLabelDisplay="auto"
              // valueLabelFormat={zoomToPercent}
              onChange={(e, zoom) => setRotation(e.target.value)}
            />
            <span>rotation:{rotation}</span>
          </Action>
          <Action>
            <button onClick={() => setOpenCropModal(false)}>cancel</button>
            <button onClick={handleCropReset}>reset</button>
            <button onClick={handleCrop}>
              crop <BiCrop />
            </button>
          </Action>
        </Box>
      </DialogActions>

      {/* </dialog> */}
    </Dialog>
  );
};
