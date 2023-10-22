import * as React from "react";
import { auth } from "@/lib/firebase";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTheme } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import useUserStore from "@/stores/userStore";

function SignUp() {
  const theme = useTheme();
  const { userCredentials, setUserCredentials } = useUserStore();
  console.log(userCredentials);
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const userFB = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userFB.user
      setUserCredentials(values.firstName, values.lastName, user.uid)

      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Head>
        <title>Job Hub - Sign up</title>
      </Head>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 5 }}>
          Sign up
        </Typography>

        {/* Formik form wrapper */}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  color="info"
                />
                <div
                  className="error"
                  style={{ color: theme.palette.error.main }}
                >
                  <ErrorMessage name="firstName" />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  color="info"
                />
                <div
                  className="error"
                  style={{ color: theme.palette.error.main }}
                >
                  <ErrorMessage name="lastName" />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  color="info"
                />
                <div
                  className="error"
                  style={{ color: theme.palette.error.main }}
                >
                  <ErrorMessage name="email" />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  color="info"
                />
                <div
                  className="error"
                  style={{ color: theme.palette.error.main }}
                >
                  <ErrorMessage name="password" />
                </div>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Form>
        </Formik>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2" sx={{ color: "info.main" }}>
              Already have an account? Login
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SignUp;
