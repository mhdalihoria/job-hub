import { Box } from "@mui/material";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Head from "next/head";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};

const contentStyle = {
  flex: 1,
};

function Layout({ children }) {
  return (
    <Box sx={containerStyle}>
      <Navbar />
      <Head>
        <title>Job Hub</title>
      </Head>
      <Box sx={contentStyle}>{children}</Box>
      <Footer />
    </Box>
  );
}

export default Layout;
