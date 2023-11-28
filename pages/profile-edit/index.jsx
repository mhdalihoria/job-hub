import DefaultLayout from "@/layouts/DefaultLayout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  useTheme,
  styled,
  Paper,
  Box,
  Container,
  Grid,
  Button,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import { useState } from "react";
import SeekerForm from "@/components/profile-edit/jobSeeker/SeekerForm";
import EmployerForm from "@/components/profile-edit/employer/EmployerForm";

const FormContainerStyled = styled("div")(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: "5rem 1rem",
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  width: "80%",
  margin: "0rem auto",
}));

const FormStyled = styled(Box)(({ theme }) => ({
  padding: "2rem 1rem",
}));

const ContainerStyled = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",

  marginBottom: "2rem",
}));

const UserRolePaper = styled(Paper)(({ theme }) => ({
  padding: "1rem",
  maxWidth: "200px",
  margin: "auto",
}));
const UserRoleButton = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
  color:
    theme.palette.mode === "light"
      ? theme.palette.primary.main
      : theme.palette.primary.contrastText,

  "& p": {
    fontSize: "1.2rem",
  },
}));

const IconStyles = { fontSize: 40 };

const ProfileForm = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  console.log(userRole);

  const handleChooseUserRole = (role) => {
    setUserRole(role);
  };

  const handleGoBack = () => {
    setUserRole(null)
  }

  const displayedForm = () => {
    if (userRole === "seeker") {
      return <SeekerForm goBack={handleGoBack}/>;
    } else if (userRole === "employer") {
      return <EmployerForm goBack={handleGoBack}/>;
    } else {
      return (
        <ContainerStyled>
          <p
            style={{
              marginBottom: "2em",
              marginTop: "1.5em",
              fontSize: "1.5rem",
              textAlign: "center"
            }}
          >
            Which of Those Are You?
          </p>
          <Grid container >
            <Grid item xs={12} sm={6} sx={{ padding: "1rem" }}>
              <UserRolePaper elevation={2}>
                <UserRoleButton onClick={() => handleChooseUserRole("seeker")}>
                  <WorkIcon sx={IconStyles} />
                  <p>Job Seeker</p>
                </UserRoleButton>
              </UserRolePaper>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: "1rem" }}>
              <UserRolePaper elevation={2}>
                <UserRoleButton
                  onClick={() => handleChooseUserRole("employer")}
                >
                  <BusinessIcon sx={IconStyles} />
                  <p>Employer</p>
                </UserRoleButton>
              </UserRolePaper>
            </Grid>
          </Grid>
        </ContainerStyled>
      );
    }
  };

  return (
    <DefaultLayout>
      <FormContainerStyled>
        <PaperStyled elevation={1}>
          <FormStyled>{displayedForm()}</FormStyled>
        </PaperStyled>
      </FormContainerStyled>
    </DefaultLayout>
  );
};

export default ProfileForm;
