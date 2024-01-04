import React from "react";
import {
  Card,
  styled,
  Container,
  Box,
  Avatar,
  IconButton,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

//--------------------------------------------------------------
//--------------------------------------------------------------

const SectionContainer = styled(Card)(({ theme }) => ({
  padding: "2rem",
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const TableRow = styled(Paper)({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  borderRadius: "10px",
  cursor: "pointer",
  "& > *": {
    flex: "1 1 0",
  },
  "& .pre": {
    whiteSpace: "pre",
  },
});

//--------------------------------------------------------------
//--------------------------------------------------------------

const ProfileIntro = () => {
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <SectionContainer>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              maxWidth: "100px",
              height: "80%",
              margin: "auto 0",
            }}
            mb={4}
          >
            <Avatar
              src=""
              sx={{
                height: 64,
                width: 64,
              }}
            />

            <Box ml={-2.5}>
              <label htmlFor="profile-image">
                <IconButton
                  component="span"
                  color="primary"
                  sx={{
                    width: "30px",
                    height: "30px",
                    bgcolor: "grey.300",
                  }}
                >
                  <CameraEnhanceIcon fontSize="small" />
                </IconButton>
              </label>
            </Box>

            <Box display="none">
              <input
                onChange={(e) => console.log(e.target.files)}
                id="profile-image"
                accept="image/*"
                type="file"
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              flexWrap="wrap"
              maxWidth={200}
              gap={1}
            >
              <h4>Komrad Komrad</h4>
              <p style={{ margin: 0 }}>Junior Web Developer</p>
            </Stack>

            <Box>
              <IconButton>
                <LinkedInIcon />
              </IconButton>
              <IconButton>
                <LinkedInIcon />
              </IconButton>
              <IconButton>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box sx={{ marginTop: "2rem" }}>
          <TableRow
            elevation={3}
            sx={{
              cursor: "auto",
              p: "0.75rem 1.5rem",
              ...(downMd && {
                alignItems: "start",
                flexDirection: "column",
                justifyContent: "flex-start",
              }),
            }}
          >
            <TableRowItem title="First Name" value={"Komrad"} />
            <TableRowItem title="Email" value={"email@email.com"} />
            <TableRowItem title="Phone" value={"+963 934960439"} />
          </TableRow>
        </Box>
      </Container>
    </SectionContainer>
  );
};
const TableRowItem = ({ title, value }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} p={1}>
      <Typography
        color="secondary"
        mb={0.5}
        textAlign="left"
        sx={{ fontWeight: "bold" }}
      >
        {title}
      </Typography>
      <span style={{ color: "grey.300" }}>{value}</span>
    </Box>
  );
};
export default ProfileIntro;
