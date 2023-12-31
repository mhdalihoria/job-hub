import React from "react";
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
import { Alert, Divider, Paper, Snackbar, useTheme } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, firestore } from "@/lib/firebase";
import GoogleIcon from "@mui/icons-material/Google";
import useUserStore from "@/stores/userStore";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import useAuthStore from "@/stores/authStore";

function Login() {
  const theme = useTheme();
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const { userCredentials, setUserCredentials, userData, setUserData } =
    useUserStore();
  const { login } = useAuthStore();

  const [open, setOpen] = React.useState(false);
  const [snackbarData, setSnackbarData] = React.useState({
    variant: null,
    text: null,
  });
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { email, password } = values;
      const userFB = await signInWithEmailAndPassword(auth, email, password);
      // The following code means the following:
      /*
        - I would like to create a reference (bookmark) to a document that exists in this fireStore instance (first doc parameter)
        - Which is from this collection (second doc parameter)
        - And is inside this document (third doc parameter)
        =====> doc(firestore instance, collection name, document ID) <=====
        [then we do our operations to the "book page" now that we have access to its "bookmark"]
      */
      const docRef = doc(firestore, "users", userFB.user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // setUserData({ ...docSnap.data(), profileImg: null });
        // login();
      }

      setOpen(true);
      setSnackbarData({
        variant: "success",
        text: "Signed up Successfully. Redirecting...",
      });

      setTimeout(() => {
        router.push("/");
      }, 3000);

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
      const uid = user.uid;
      const profileImg = user.photoURL;

      // Check if a document with the user's UID already exists
      // Explaining the code below:
      /*
      - we mainly need to use the "getDoc" function, but when we use it as is it goes like "sure, i'll bring you a document, where is it though for me to bring it/fetch it"
      - here where we need the reference, we're telling it, "here's a bridge between you and the exact location of the data we want. Please fetch it"
      - Or in other words, firestore references act as bookmarks. But bookmarks can exist on empty pages. And only by using getDoc, can you reach to that bookmark and see what that page holds for yourself.
      */
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Create a new document only if it doesn't exist
        await setDoc(docRef, {
          firstName,
          lastName,
          email,
          uid,
          profileImg,
        });
      }

      setOpen(true);
      setSnackbarData({
        variant: "success",
        text: "Signed up Successfully. Redirecting...",
      });
      setUserCredentials(firstName, lastName, uid);

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      setOpen(true);
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
        <title>Job Hub - Login</title>
      </Head>
      <CssBaseline />
      <Paper elevation={1}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            mt: 8,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 5 }}>
            Login
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form style={{ width: "100%" }}>
              <Field
                as={TextField}
                margin="normal"
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

              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="info"
              />

              <div
                className="error"
                style={{ color: theme.palette.error.main }}
              >
                <ErrorMessage name="password" />
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
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

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" sx={{ color: "info.main" }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2" sx={{ color: "info.main" }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
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

export default Login;
