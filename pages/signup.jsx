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
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import useUserStore from "@/stores/userStore";
import GoogleIcon from "@mui/icons-material/Google";

function SignUp() {
  const theme = useTheme();
  const { userData, setUserData } = useUserStore();
  console.log(userData);
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

      /*
       The following code means: 
       1- Add me a document to this collection (setDoc's first parameter)
       2- Which is from this firestore in stance (doc's first parameter)
       3- And inside the "users" collection (doc's second parameter)
       4- Since there's a third parameter in our doc function, then lets set the document UID we're making into whatever is in that third parameter (collection's third parameter)
       5- So, lets add this data to this collection we're making (setDoc's second parameter)

       !!NOTE: setDoc() => is for making documents with a custom document ID
       !!Meanwhile, addDoc() => is for making documents with an auto generated document ID
       !!And each have their own way of being done and coded.

       We use a custom document ID here, so when we fetch the information at any point, we simply use our access to the user unique id from auth, to call the document that holds the data about our user(s)
      */
      const docRef = await setDoc(doc(firestore, "users", user.uid), {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        uid: user.uid,
      });

      setUserData({
        firstName: values.firstName,
        lastName: values.lastName,
        uid: user.uid,
        email: values.email,
      });

      setOpen(true);
      setSnackbarData({
        variant: "success",
        text: "Signed up Successfully. Redirecting...",
      });
      
      resetForm();
    } catch (err) {
      setOpen(true);
      if (err.code === "auth/email-already-in-use") {
        setSnackbarData({
          variant: "error",
          text: "Email is already in use. Please use a different email address.",
        });
      } else {
        setSnackbarData({
          variant: "error",
          text: "Something Went Wrong. Check your Info and Try again Later",
        });
      }
      console.error(err.message);
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
