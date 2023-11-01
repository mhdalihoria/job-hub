/* eslint-disable react/jsx-props-no-spreading */
import { Box, Container, Grid, styled } from "@mui/material";
import Image from "next/image";
import Logo from "@/public/imgs/reverse-logo.svg";
import darkLogo from "@/public/imgs/dark-logo.svg";
import Link from "next/link";
import useThemeStore from "@/stores/themeStore";

// styled component
const StyledFooter = styled(Box)(({ theme, islighttheme }) => ({
  background: islighttheme
    ? theme.palette.primary.main
    : theme.palette.background.default,
  color: islighttheme
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
}));

const StyledLink = styled("a")(({ theme, islighttheme }) => ({
  display: "block",
  borderRadius: 4,
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: islighttheme
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
  textDecoration: "none",
  "&:hover": {
    transform: "scale(1.009)",
  },
}));
const Footer = () => {
  const { isLightTheme } = useThemeStore();
  return (
    <footer>
      <StyledFooter islighttheme={isLightTheme ? 1 : 0}>
        <Box
          sx={{
            p: "1rem",
            width: "90%", 
            margin: "0 auto"
          }}
        >
          <Box py={10} overflow="hidden">
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <Image src={isLightTheme ? Logo : darkLogo} alt="logo" width={120} height={50} />
                </Link>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Auctor libero id et, in gravida. Sit diam duis mauris nulla
                  cursus. Erat et lectus vel ut sollicitudin elit at amet.
                </p>
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  About Us
                </Box>

                <div>
                  {aboutLinks.map((item, ind) => (
                    <StyledLink
                      href="/"
                      key={ind}
                      passHref
                      islighttheme={isLightTheme ? 1 : 0}
                    >
                      {item}
                    </StyledLink>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  Customer Care
                </Box>

                <div>
                  {customerCareLinks.map((item, ind) => (
                    <StyledLink
                      href="/"
                      key={ind}
                      passHref
                      islighttheme={isLightTheme ? 1 : 0}
                    >
                      {item}
                    </StyledLink>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Box
                  fontSize="18px"
                  fontWeight="600"
                  mb={1.5}
                  lineHeight="1"
                  color="white"
                >
                  Contact Us
                </Box>

                <Box py={0.6}>
                  70 Washington Square South, New York, NY 10012, United States
                </Box>

                <Box py={0.6}>Email: uilib.help@gmail.com</Box>

                <Box py={0.6} mb={2}>
                  Phone: +1 1123 456 780
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </StyledFooter>
    </footer>
  );
};

const aboutLinks = [
  "Careers",
  "Our Stores",
  "Our Cares",
  "Terms & Conditions",
  "Privacy Policy",
];
const customerCareLinks = [
  "Help Center",
  "How to Buy",
  "Track Your Order",
  "Corporate & Bulk Purchasing",
  "Returns & Refunds",
];

export default Footer;
