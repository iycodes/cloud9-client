import React, { useState } from "react";
import styles from "./UserSettings.module.css";
import styled from "styled-components";
import { TextareaAutosize } from "@mui/material";
import { CountryList } from "./CountryList";
import { PhoneAndroid } from "@mui/icons-material";
import { ReactEasyCrop } from "./Crop/ReactEasyCrop";
import { BiCrop } from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthContext";

//

const Layout = styled.form`
  display: ${(props) => (props.display == "true" ? "flex" : "none")};
  flex-direction: column;
  width: 75%;
`;
const Label = styled.label`
  font-weight: 600;
  opacity: 0.8;
  font-size: 0.85em;
`;
const CoverPhoto = styled.img`
  width: 100%;
  aspect-ratio: 4/1;
  border-radius: 3px;
  border-top-left-radius: 60px;
  background-color: lightgray;
`;
const Box = styled.div`
  display: flex;
  height: auto;
  width: 97%;
  /* background-color: green; */
  margin-left: 3%;
  margin-bottom: 10px;
`;
const Box_sub1 = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: red; */
  margin-left: auto;
  height: 100%;
`;
const Avatar = styled.img`
  min-width: 30px;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 100%;
  border: 2px solid white;
  /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  &:hover {
    /* border: 5px solid white; */
  }
`;
const SaveButton = styled.button`
  background-color: #9b59b6;
  color: white;
  font-size: 0.7rem;
  border: none;
  aspect-ratio: 2/1;
  min-height: 25px;
  max-height: 33px;
  height: 3.5vw;
  border-radius: 5px;
  /* margin-top: auto;
  margin-bottom: auto; */
  margin: auto 0;
  /* align-self: flex-end; */
  /* margin-left: auto; */
  cursor: pointer;
`;
export const Line = styled.div`
  display: flex;
  height: 1px;
  width: 100%;
  border: 0.7px solid grey;
  opacity: 0.1;
  margin-bottom: 12px;
`;
const Field = styled.div`
  display: flex;
  margin-bottom: 12px;
  align-items: center;
  flex-wrap: wrap;
`;
const Input = styled.input`
  display: flex;
  margin-left: auto;
  height: 27px;
  margin-right: 12%;
  outline: none;
  border: 1.5px solid #e6e6e6;
  border-radius: 5px;
  min-width: 150px;
  width: 50%;
  padding: 5px;
  &::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

//https://img.icons8.com/ios/512/guest-male.png
export const UserDetails = ({ displayedTab }) => {
  const authContext = useContext(AuthContext);
  const authUserData = authContext?.authUserData;
  // console.log(authUserData);
  const [userDetails, setUserDetails] = useState({});
  const [avatarURL, setAvatarURL] = useState({
    url:
      authUserData?.profileImageSrc ||
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    ogUrl:
      authUserData?.profileImageSrc ||
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
  });
  const [coverPhotoUrl, setCoverPhotoUrl] = useState({
    url: authUserData?.coverImageSrc,
    ogUrl: authUserData?.coverImageSrc,
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverPhotoFile, setCoverPhotoFile] = useState(null);
  const [openCropModal, setOpenCropModal] = useState(false);
  const [openCoverPhotoCropModal, setOpenCoverPhotoCropModal] = useState(false);
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarURL({
        ...avatarURL,
        url: URL.createObjectURL(file),
        ogUrl: URL.createObjectURL(file),
      });
      setOpenCropModal(true);
    }
  };

  const handleCoverPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPhotoFile(file);
      setCoverPhotoUrl({
        url: URL.createObjectURL(file),
        ogUrl: URL.createObjectURL(file),
      });
      setOpenCoverPhotoCropModal(true);
    }
  };

  const onChangeHandler = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(userDetails);

  const countries = (
    <select
      onChange={onChangeHandler}
      id="region"
      name="region"
      defaultValue={authUserData?.region || "Somewhere on earth"}
      className={styles.countryList}
    >
      <option value="Somewhere on earth" key="soe">
        Somewhere on earth
      </option>
      {CountryList.map((country) => (
        <option value={country?.value} key={country.code}>
          {country.value}
        </option>
      ))}
    </select>
  );
  return (
    <>
      <Layout display={displayedTab.toString()}>
        <ReactEasyCrop
          photoURL={avatarURL}
          setOpenCropModal={setOpenCropModal}
          openCropModal={openCropModal}
          setFile={setAvatarFile}
          setPhotoURL={setAvatarURL}
          aspectRatio={1}
          dialogId="avatarCropDialog"
          cropShape="round"
        />
        <ReactEasyCrop
          photoURL={coverPhotoUrl}
          setOpenCropModal={setOpenCoverPhotoCropModal}
          openCropModal={openCoverPhotoCropModal}
          setFile={setCoverPhotoFile}
          setPhotoURL={setCoverPhotoUrl}
          aspectRatio={4 / 1}
          dialogId="coverPhotoCropDialog"
          cropShape="rect"
        />
        <label htmlFor="coverPhoto">
          <input type="file" id="coverPhoto" onChange={handleCoverPhoto} />
          <CoverPhoto id="coverPhoto" src={coverPhotoUrl.url} />
        </label>
        <Box>
          <input type="file" id="avatar" onChange={handleAvatar} />
          <label htmlFor="avatar" id="avatar">
            <Avatar src={avatarURL.url} id="avatar" />
          </label>
          <BiCrop
            style={{
              alignSelf: "flex-end",
            }}
            onClick={(e) => {
              e.preventDefault();
              setOpenCropModal(true);
            }}
          />
          <Box_sub1>
            <BiCrop
              className={styles.cropCoverPhotoIcon}
              onClick={(e) => {
                e.preventDefault();
                setOpenCoverPhotoCropModal(true);
              }}
            />
            <SaveButton>Save</SaveButton>
          </Box_sub1>
        </Box>
        <Field>
          <Label>Firstname</Label>
          <Input
            defaultValue={authUserData?.firstname}
            onChange={onChangeHandler}
            id="firstname"
            name="firstname"
          />
        </Field>
        <Line />
        <Field>
          <Label>Lastname</Label>
          <Input
            defaultValue={authUserData?.lastname}
            onChange={onChangeHandler}
            id="lastname"
            name="lastname"
          />
        </Field>
        <Line />
        <Field>
          <Label>Display name</Label>
          <Input
            defaultValue={authUserData?.displayName}
            onChange={onChangeHandler}
            id="displayName"
            name="displayName"
          />
        </Field>
        <Line />
        <Field>
          <Label> Phone</Label>
          <div className={styles.phoneDiv}>
            <input
              className={styles.input_phone}
              defaultValue={authUserData?.phone}
              onChange={onChangeHandler}
              type="number"
              id="phone"
              name="phone"
            />
            <button className={styles.verify_phone}>verify</button>
          </div>
        </Field>
        <Line />
        <Field>
          <Label>Bio</Label>
          <TextareaAutosize
            defaultValue={authUserData?.bio}
            onChange={onChangeHandler}
            id="bio"
            name="bio"
            placeholder="Add a short bio"
            style={{
              display: "flex",
              marginLeft: "auto",
              marginRight: "12%",
              fontWeight: "500",
              border: "1.5px solid #e6e6e6",
              padding: "5px",
              outline: "none",
              borderRadius: "5px",
              width: "50%",
            }}
            minRows={5}
          />
        </Field>
        <Line />
        <Field>
          <Label>Region</Label>
          {countries}
        </Field>
        <Line />
        <Field>
          <Label>Birthday</Label>
          <Input
            defaultValue={authUserData?.birthday}
            onChange={onChangeHandler}
            id="birthday"
            name="birthday"
            type="date"
          />
        </Field>
      </Layout>
    </>
  );
};
