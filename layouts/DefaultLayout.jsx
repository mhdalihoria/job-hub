import { Box, styled } from "@mui/material";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Head from "next/head";

const ContentStyled = styled(Box)(({ theme }) => ({
  flex: 1,
  background: theme.palette.background.default,
}));

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};

function Layout({ children }) {
  return (
    <Box sx={containerStyle}>
      <Navbar />
      <Head>
        <title>Job Hub</title>
      </Head>
      <ContentStyled>{children}</ContentStyled>
      <Footer />
    </Box>
  );
}

export default Layout;
