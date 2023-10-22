import * as React from "react";
import { auth, firestore } from "@/lib/firebase";
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
import { Alert, Divider, Paper, Snackbar, useTheme } from "@mui/material";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import useUserStore from "@/stores/userStore";
import GoogleIcon from "@mui/icons-material/Google";

function SignUp() {
  const theme = useTheme();
  const { userCredentials, setUserCredentials } = useUserStore();
  const googleProvider = new GoogleAuthProvider();
  console.log(userCredentials);
  const [open, setOpen] = React.useState(false);
  const [snackbarData, setSnackbarData] = React.useState({
    variant: null,
    text: null,
  });
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
      const user = userFB.user;
      const docRef = await addDoc(collection(firestore, "users"), {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        uid: user.uid,
      });
      console.log(docRef);
      setUserCredentials(values.firstName, values.lastName, user.uid);
      setOpen(true);
      setSnackbarData({
        variant: "success",
        text: "Signed up Successfully. Redirecting...",
      });
      resetForm();
    } catch (err) {
      setOpen(true);
      setSnackbarData({
        variant: "error",
        text: "Something Went Wrong. Check your Info and Try again Later",
      });
      console.error(err);
    }
  };

  const googleSignupHandler = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const firstName = user.displayName.split(" ")[0];
      const lastName = user.displayName.split(" ")[1];
      const email = user.email;

      console.log("firstname", firstName);
      console.log("lastname", lastName);
      console.log("email", email);

      const docRef = await addDoc(collection(firestore, "users"), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        uid: user.uid,
      });
      console.log(docRef);

      setUserCredentials(firstName, lastName, user.uid);
      
      setOpen(true);
      setSnackbarData({
        variant: "success",
        text: "Signed up Successfully. Redirecting...",
      });
    } catch (err) {
      
      setOpen(false);
      setSnackbarData({
        variant: "error",
        text: "Something Went Wrong. Check your Info and Try again Later",
      });
      console.error(err);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Head>
        <title>Job Hub - Sign up</title>
      </Head>
      <CssBaseline />
      <Paper
        elevation={1}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
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

        <Divider sx={{ fontSize: ".7rem" }}>or</Divider>

        <Button
          sx={{
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            width: "100%",
            mb: 3,
            mt: 2,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          variant="outlined"
          onClick={googleSignupHandler}
        >
          <GoogleIcon fontSize="small" /> Signup With Google
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2" sx={{ color: "info.main" }}>
              Already have an account? Login
            </Link>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackbarData.variant}
          sx={{ width: "100%" }}
        >
          {snackbarData.text}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default SignUp;
