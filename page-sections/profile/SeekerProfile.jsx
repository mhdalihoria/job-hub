import React from "react";
import { Paper, styled } from "@mui/material";
import ProfileIntro from "@/components/user-profile/ProfileIntro";

const ProfileContainer = styled("div")(({ theme }) => ({
  width: "70%",
  margin: "1.5rem auto",
}));

const SeekerProfile = () => {
  return (
    <ProfileContainer>
      <ProfileIntro />
    </ProfileContainer>
  );
};

export default SeekerProfile;
