import React, { createRef, useState } from "react";


const AvatarUpload = (props) => {
  const [image, setImage] = useState(null);
  const inputFileRef = createRef(null);

  const handleOnChange = (event) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      if (image) {
        URL.revokeObjectURL(image);
        inputFileRef.current.value = null;
      }
      setImage(URL.createObjectURL(newImage));
    }
  };

  /**
   *
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
   */
  // const handleClick = (event) => {
  //   event.preventDefault();
  //   if (image) {
  //     URL.revokeObjectURL(image);
  //     inputFileRef.current.value = null;
  //     setImage(null);
  //   }
  // };

  return (
    <div>
      <input
        ref={inputFileRef}
        accept="image/*"
        hidden
        id={props.fileInputID}
        type="file"
        onChange={handleOnChange}
      />
      <label
        htmlFor={props.fileInputID}
        style={{
          cursor: "pointer",
          display: "flex",
          aspectRatio: props.aspectRatioProps,
        }}
      >
        <img
          alt=""
          src={image || props.defaultImageProps}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        ></img>
      </label>
      {/* <button onClick={handleClick}> delete </button> */}
    </div>
  );
};

export default AvatarUpload;
