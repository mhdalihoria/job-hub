import SectionLoader from "@/components/loader/SectionLoader";
import DefaultLayout from "@/layouts/DefaultLayout";
import { firestore } from "@/lib/firebase";
import EmployerProfile from "@/page-sections/profile/EmployerProfile";
import SeekerProfile from "@/page-sections/profile/SeekerProfile";
import useLoaderStore from "@/stores/loaderStore";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const router = useRouter();
  const { id: userId } = router.query;
  const { isSectionLoading, setIsSectionLoading } = useLoaderStore();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserDataFromFireStore = async () => {
      setIsSectionLoading(true);
      try {
        const docRef = doc(firestore, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
          setIsSectionLoading(false);
        } else {
          router.push("/404");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsSectionLoading(false);
      }
    };

    if (userId) {
      fetchUserDataFromFireStore();
    }
  }, [userId]);

  return (
    <DefaultLayout>
      {isSectionLoading && <SectionLoader loading={isSectionLoading} />}
      {userData &&
        (userData.userType === "seeker" ? (
          <SeekerProfile userData={userData} />
        ) : (
          <EmployerProfile userData={userData} />
        ))}
    </DefaultLayout>
  );
};

export default UserProfile;
