import React, { useState } from "react";
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
  Snackbar,
  Alert,
} from "@mui/material";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import DescriptionIcon from "@mui/icons-material/Description";
import CustomButton from "../custom-mui-components/Button/CustomButton";
import { useRouter } from "next/router";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import useUserStore from "@/stores/userStore";
import { firestore, storage } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

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

const userInfo = [
  {
    title: "First Name",
    value: "Komrad",
  },
  {
    title: "Email",
    value: "email@email.com",
  },
  {
    title: "Phone",
    value: "+963 934960439",
  },
];

const ProfileIntro = ({
  userIntroduction,
  userTitle,
  userSubTitle,
  userLinks,
  userProfilePic,
  isAuthorizedUser,
}) => {
  const router = useRouter();
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { userData, setUserData } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState({
    status: null,
    message: null,
  });

  const userLinkIcon = (iconName) => {
    switch (iconName) {
      case "github": {
        return <GitHubIcon />;
      }
      case "linkedin": {
        return <LinkedInIcon />;
      }
      case "website": {
        return <LanguageIcon />;
      }
      case "reseme": {
        return <DescriptionIcon />;
      }
      default:
        null;
    }
  };

  const profilePicUpload = async (file) => {
    if (file[0].size >= 1048576) {
      setSnackbarData({
        status: "error",
        message: "Image Size is Too Big",
      });
      setOpen(true);
      return;
    }

    setLoading(true);

    try {
      // Get a list of all items in the profile picture directory
      const profilePicDirectoryRef = ref(storage, `${userData.uid}/pfp/`);
      const items = await listAll(profilePicDirectoryRef);

      // Delete each item in the directory
      await Promise.all(
        items.items.map(async (item) => {
          await deleteObject(item).catch((error) => {
            // Ignore errors if the file doesn't exist
            if (error.code !== "storage/object-not-found") {
              throw error;
            }
          });
        })
      );

      // Getting Refrence of the user file
      const docRef = doc(firestore, "users", userData.uid);
      // Getting the extention of the uploaded file
      const pfpExtention = file[0].name.split(".")[1];
      // Uploading profilePic to a /pfp directory
      const fileName = `${userData.uid}/pfp/profilePic.${pfpExtention}`;
      const storageRef = ref(storage, fileName);

      // Uploading pfp to Firestore Storage
      await uploadBytes(storageRef, file[0]);
      const downloadURL = await getDownloadURL(storageRef);
      const profileImageUploaded = { profileImg: downloadURL };

      // Uploading pfp link to Firestore (and Zustand state)
      await updateDoc(docRef, profileImageUploaded);
      setUserData(profileImageUploaded);

      setSnackbarData({
        status: "success",
        message: "Image Uploaded",
      });
    } catch (err) {
      console.error(err);
      setSnackbarData({
        status: "error",
        message: "Something Went Wrong Please Try Later",
      });
    }

    setLoading(false);
    setOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <SectionContainer>
      <Container maxWidth="lg">
        {isAuthorizedUser && (
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            sx={{ width: "100%", marginBottom: "1rem" }}
          >
            <CustomButton
              variant="contained"
              onClick={() => router.push("/profile-edit")}
            >
              Edit Profile
            </CustomButton>
          </Box>
        )}
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
            {isAuthorizedUser ? (
              <Avatar
                src={!!userData.profileImg ? userData.profileImg : ""}
                sx={{
                  height: 64,
                  width: 64,
                }}
              />
            ) : (
              <Avatar
                src={userProfilePic || ""}
                sx={{
                  height: 64,
                  width: 64,
                }}
              />
            )}

            {isAuthorizedUser && (
              <>
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
                      disabled={loading}
                    >
                      <CameraEnhanceIcon fontSize="small" />
                    </IconButton>
                  </label>
                </Box>

                <Box display="none">
                  <input
                    onChange={(e) => profilePicUpload(e.target.files)}
                    id="profile-image"
                    accept="image/*"
                    type="file"
                  />
                </Box>
              </>
            )}
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
              direction="column"
              flexWrap="wrap"
              maxWidth={200}
              gap={1}
            >
              <h4>{userTitle}</h4>
              <p style={{ margin: 0 }}>{userSubTitle}</p>
            </Stack>

            <Box>
              {userLinks.map((link) => {
                return (
                  <IconButton
                    key={link.link}
                    onClick={() => window.open(link.link, "_blank")}
                    title={link.title}
                  >
                    {userLinkIcon(link.type)}
                  </IconButton>
                );
              })}
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
            {userIntroduction.map((info) => (
              <TableRowItem
                key={info.title}
                title={info.title}
                value={info.value}
              />
            ))}
          </TableRow>
        </Box>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarData.status}
          sx={{ width: "100%" }}
        >
          {snackbarData.message}
        </Alert>
      </Snackbar>
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
