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

const SeekerProfile = ({ userData }) => {
  // Profile Intro Arrays (start) ------------------------------
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
  // Profile Intro Arrays (end) ----------------------------------

  // User Courses Array (start) ----------------------------------
  const userCourses =
    userData.courses?.map((item) => ({
      startDate: item.startDate,
      endDate: item.endDate,
      title: item.courseTitle,
      description: item.courseDescription,
      subTitle: item.courseAuthor,
    })) ?? [];
  // User Courses Array (end)  ------------------------------------

  // User Work Exp Array (start) ----------------------------------
  const userWorkExp =
    userData.workExp?.map((item) => ({
      startDate: item.startDate,
      endDate: item.endDate,
      title: item.jobTitle,
      description: item.jobRole,
      subTitle: item.companyName,
    })) ?? [];
  // User Courses Array (end)  -----------------------------------

  // User Skills Array (start)  ----------------------------------
  const userSkills = userData.skills.length > 0 ? userData.skills : [];
  // User Skills Array (end)   -----------------------------------

  return (
    <ProfileContainer>
      <ProfileIntro
        userIntroduction={userIntroduction}
        userTitle={`${userData.firstName} ${userData.lastName}`}
        userSubTitle={`${userData.jobTitle}`}
        userLinks={userLinks}
      />
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={12} sm={12} md={8}>
          {userCourses && (
            <ProfileInfoBlock
              sectionTitle={"Courses"}
              sectionData={userCourses}
            />
          )}
          {userWorkExp && (
            <ProfileInfoBlock
              sectionTitle={"Work Experience"}
              sectionData={userWorkExp}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          {userSkills && <ProfileSkillsBlock userSkills={userSkills} />}
        </Grid>
      </Grid>
    </ProfileContainer>
  );
};

export default SeekerProfile;
