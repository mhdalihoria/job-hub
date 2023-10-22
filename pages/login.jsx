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
import { Divider, Paper, useTheme } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import GoogleIcon from "@mui/icons-material/Google";

//TODO: Find a way to get logged in user's data (first name, last name, etc) [most likely you'll need firestore]
function Login() {
  const theme = useTheme();
  const googleProvider = new GoogleAuthProvider();

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
      console.log(userFB);

      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const googleSignupHandler = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      const firstName = user.displayName.split(' ')[0]
      const lastName = user.displayName.split(' ')[1]
      const email = user.email

      console.log("firstname", firstName)
      console.log("lastname", lastName)
      console.log("email", email)

      setUserCredentials(firstName, lastName, user.uid);

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Head>
        <title>Job Hub Login</title>
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
            <Form style={{width: "100%"}}>
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
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
    </Container>
  );
}

export default Login;
