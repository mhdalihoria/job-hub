import { useTheme } from "@mui/material";
import { useCollection } from "react-firebase-hooks/firestore";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { firestore } from "@/lib/firebase";
import { collection, query, where } from "firebase/firestore";
import DefaultLayout from "@/layouts/DefaultLayout"

//----------------------------------------------------------

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const theme = useTheme();
  // const [value, loading, error] = useCollection(
  //   query(collection(firestore, "posts"))
  // );

  // console.log(!loading && value.docs.map((doc) => doc.data()));
  return (
    <>
      <Head>
        <title>Job Hub - Home</title>
      </Head>
      <DefaultLayout>
      <main>something</main>
      </DefaultLayout>
    </>
  );
}
