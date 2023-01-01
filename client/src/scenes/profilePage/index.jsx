import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import { useSelector } from "react-redux";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidgets from "scenes/widgets/UserWidgets";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setUser(data);
  };
  useEffect(() => {
    getUser();
  }, []);
  if (!user) return null;
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center">
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidgets userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0">
            <FriendListWidget userId={userId} />
          </Box>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "40%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}>
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0">
            <PostsWidget userId={userId} isProfile />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
