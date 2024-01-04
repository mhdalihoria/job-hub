import React from "react";
import { Box, styled } from "@mui/material";
import ProfileIntro from "@/components/user-profile/ProfileIntro";
import ProfileInfoBlock from "@/components/user-profile/ProfileInfoBlock";
import ProfileSkillsBlock from "@/components/user-profile/ProfileSkillsBlock";

//--------------------------------------------------------------
//--------------------------------------------------------------

const ProfileContainer = styled("div")(({ theme }) => ({
  width: "70%",
  margin: "1.5rem auto",
}));

//--------------------------------------------------------------
//--------------------------------------------------------------

const SeekerProfile = ({ userData }) => {
  const userIntroduction = [
    { title: "First Name", value: userData.firstName },
    { title: "Last Name", value: userData.lastName },
    { title: "Email", value: userData.email },
    userData.phoneNum && { title: "Phone No.", value: userData.phoneNum },
  ].filter(Boolean); //the filter method at the end, removes any falsy values from the array, ensuring that there's no entries with empty values.

  const userLinks = [
    {
      type: "linkedin",
      title: "LinkedIn Profile",
      link: userData.linkedInLink,
    },
    {
      type: "github",
      title: "GitHub Profile",
      link: userData.githubLink,
    },
    {
      type: "website",
      title: "Personal Website",
      link: userData.websiteLink,
    },
    {
      type: "reseme",
      title: "Reseme Link",
      link: userData.reseme,
    },
  ].filter(Boolean);

  return (
    <ProfileContainer>
      <ProfileIntro
        userIntroduction={userIntroduction}
        userFullName={`${userData.firstName} ${userData.lastName}`}
        userJobTitle={`${userData.jobTitle}`}
        userLinks={userLinks}
      />
      <ProfileInfoBlock />
      <ProfileSkillsBlock />
    </ProfileContainer>
  );
};

export default SeekerProfile;
