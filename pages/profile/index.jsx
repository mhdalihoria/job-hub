import React from "react";
import DefaultLayout from "@/layouts/DefaultLayout";
import useUserStore from "@/stores/userStore";
import EmployerProfile from "@/page-sections/profile/EmployerProfile";
import SeekerProfile from "@/page-sections/profile/SeekerProfile";

const Profile = () => {
  const { userData } = useUserStore();

  return (
    <DefaultLayout>
      {!!userData && userData.userType === "seeker" ? (
        <SeekerProfile />
      ) : (
        <EmployerProfile />
      )}
    </DefaultLayout>
  );
};

export default Profile;
