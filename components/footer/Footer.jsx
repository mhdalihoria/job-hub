import Link from "next/link";
import { Box, Container, Grid, IconButton, styled } from "@mui/material";
import Image from "next/image";
import Logo from "@/public/imgs/reverse-logo.svg";

// styled component
const StyledFooter = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  display: "block",
  borderRadius: 4,
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.primary.contrastText,
  textDecoration: "none",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));
const Footer = () => {
  return (
    <footer>
      <StyledFooter>
        <Container
          sx={{
            p: "1rem",
            color: "white",
          }}
        >
          <Box py={10} overflow="hidden">
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <Image src={Logo} alt="logo" width={120} height={50} />
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
                    <StyledLink href="/" key={ind} passHref>
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
                    <StyledLink href="/" key={ind} passHref>
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
        </Container>
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
