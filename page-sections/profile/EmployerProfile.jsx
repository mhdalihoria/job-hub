import React from "react";
import { Grid, styled } from "@mui/material";
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

const EmployerProfile = ({ userData, isAuthorizedUser = false }) => {
  // Profile Intro Arrays (start) ------------------------------
  const userIntroduction = [
    { title: "Email", value: userData.email },
    { title: "Company Size", value: userData.companySize },
    userData.phoneNum && { title: "Phone No.", value: userData.phoneNum },
  ].filter(Boolean); //the filter method at the end, removes any falsy values from the array, ensuring that there's no entries with empty values.

  const userLinks = [
    {
      type: "linkedin",
      title: "LinkedIn Profile",
      link: userData.linkedInLink,
    },
    {
      type: "website",
      title: "Company Website",
      link: userData.websiteLink,
    },
  ].filter(Boolean);
  // Profile Intro Arrays (end) ----------------------------------

  const userDescription = [{ description: userData.companyDescription }];

  return (
    <ProfileContainer>
      <ProfileIntro
        userIntroduction={userIntroduction}
        userTitle={userData.companyData && userData.companyData[0].companyName}
        userSubTitle={
          userData.companyData && userData.companyData[0].companyIndustry
        }
        userLinks={userLinks}
        userProfilePic={userData.profileImg}
        isAuthorizedUser={isAuthorizedUser}
      />
      <ProfileInfoBlock
        sectionTitle={"About Us"}
        sectionData={userDescription}
      />
    </ProfileContainer>
  );
};

export default EmployerProfile;
