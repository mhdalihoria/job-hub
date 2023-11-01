import { useTheme } from "@mui/material";
import { useCollection } from "react-firebase-hooks/firestore";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { firestore } from "@/lib/firebase";
import { collection, query, where } from "firebase/firestore";
import DefaultLayout from "@/layouts/DefaultLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
//----------------------------------------------------------


export default function Home() {
  const theme = useTheme();
  const {t} = useTranslation()
  // const [value, loading, error] = useCollection(
  //   query(collection(firestore, "posts"))
  // );

  // console.log(!loading && value.docs.map((doc) => doc.data()));
  return (
    <>
      <DefaultLayout>
        <main>HOME PAGE</main>
        <main>{t("hello")}</main>
      </DefaultLayout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
