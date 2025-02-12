import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import {
  selectFollowsById,
  useFetchUserByIdQuery,
  useGetAllFollowsQuery,
} from "../features/users/usersApiSlice";
import { useFollowUserMutation } from "../features/users/usersApiSlice";
import { AuthContext } from "../Authentication/AuthContext";
import { useSelector } from "react-redux";
import { useContext } from "react";
//

export const Layout = styled.div`
  align-self: center;
  margin-right: 5px;
`;
export const FollowButton = ({ userToFollowId }) => {
  const [followUser, { data, isLoading, isSuccess, isError }] =
    useFollowUserMutation();
  const authContext = useContext(AuthContext);
  const authUserData = authContext?.authUserData;
  // const { data: authUserData } =
  //   useFetchUserByIdQuery();

  const isFollowing = useSelector((state) =>
    selectFollowsById(state, `${authUserData?.id}${userToFollowId}`)
  );
  // console.log(isFollowing);
  // const [following, setFollowing] = React.useState(isFollowing);

  const handleFollow = async (e) => {
    e.preventDefault();
    try {
      await followUser({
        id: `${authUserData?.id}${userToFollowId}`,
        followerId: authUserData?.id,
        followingId: userToFollowId,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
    // setFollowing(!following);
  };
  //
  return (
    <Layout>
      <Button
        sx={{
          height: "30px",
          aspectRatio: "3/1",
          fontSize: "small",
          textTransform: "none",
        }}
        variant={isFollowing ? "outlined" : "contained"}
        disableElevation
        color="secondary"
        onClick={handleFollow}
      >
        {isFollowing ? "following" : "follow"}
      </Button>
    </Layout>
  );
};
