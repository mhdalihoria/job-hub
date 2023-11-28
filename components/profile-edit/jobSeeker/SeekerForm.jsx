import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Stack,
  IconButton,
  Button,
  Grid,
  TextField,
  Input,
  FormControl,
  styled,
  InputLabel,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
// -----------------------------------------

const ErrorMessageStyled = styled("div")(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: ".8rem",
  marginTop: ".2em",
}));

// -----------------------------------------
const MAX_FILE_SIZE = 2048000; //500KB

const validationSchema = Yup.object().shape({
  phoneNum: Yup.number("Numbers Only").required("Required"),
  jobTitle: Yup.string().required("Required"),
  skills: Yup.array().of(
    Yup.object().shape({
      skillName: Yup.string().required("Required"),
      skillLvl: Yup.string().required("Required"),
    })
  ),
  // workExp: Yup.array().of(
  //   Yup.object().shape({
  //     jobTitle: Yup.string().required("Required"),
  //     companyName: Yup.string().required("Required"),
  //     jobRole: Yup.string().required("Required"),
  //     duration: Yup.string().required("Required"),
  //     description: Yup.string().required("Required"),
  //   })
  // ),
  // reseme: Yup.mixed()
  //   .required("Required")
  //   .test(
  //     "is-valid-size",
  //     "Max allowed size is 2MB",
  //     (value) => value && value.size <= MAX_FILE_SIZE
  //   ),
  // websiteLink: Yup.string().optional(),
  // linkedInLink: Yup.string().optional(),
  // githubLink: Yup.string().optional(),
  // courses: Yup.array().of(
  //   Yup.object().shape({
  //     courseTitle: Yup.string().optional(),
  //     courseAuthor: Yup.string().optional(),
  //     courseDescription: Yup.string().optional(),
  //     startDate: Yup.string().optional(),
  //     endDate: Yup.string().optional(),
  //   })
  // ),
});

const initialValues = {
  phoneNum: "",
  jobTitle: "",
  skills: [{ skillName: "", skillLvl: "" }],
  workExp: [
    {
      jobTitle: "",
      companyName: "",
      jobRole: "",
      duration: "",
      description: "",
    },
  ],
  reseme: null,
  websiteLink: "",
  linkedInLink: "",
  githubLink: "",
  courses: [
    {
      courseTitle: "",
      courseAuthor: "",
      courseDescription: "",
      startDate: "",
      endDate: "",
    },
  ],
};
// -----------------------------------------

const SeekerForm = ({ goBack }) => {
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box maxWidth={600} sx={{ margin: "auto" }}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        sx={{ width: "100%", marginBottom: "2rem" }}
      >
        <IconButton onClick={goBack}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>
      </Stack>
      <Box sx={{ margin: "0 1rem" }}>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
        >
          {({ values }) => (
            <Form>
              <Grid container rowGap={2}>
                <Grid item xs={12}>
                  <Field name="phoneNum" variant="outlined" fullWidth>
                    {({ form, field }) => (
                      <>
                        <TextField
                          id="phoneNum"
                          variant="standard"
                          label={"Phone Number* (001 123 456 789)"}
                          {...field}
                          fullWidth
                        />
                        <ErrorMessageStyled>
                          <ErrorMessage name="phoneNum" />
                        </ErrorMessageStyled>
                      </>
                    )}
                  </Field>
                  <Field name="jobTitle" variant="outlined" fullWidth>
                    {({ form, field }) => (
                      <>
                        <TextField
                          id="jobTitle"
                          variant="standard"
                          label={"Your Desired Job Title"}
                          {...field}
                          fullWidth
                        />
                        <ErrorMessageStyled>
                          <ErrorMessage name="jobTitle" />
                        </ErrorMessageStyled>
                      </>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default SeekerForm;
