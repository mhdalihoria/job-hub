import React, { useEffect } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "@/layouts/DefaultLayout";
import useUserStore from "@/stores/userStore";
import {
  Paper,
  Container,
  TextField,
  Grid,
  FormHelperText,
  styled,
  MenuItem,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/custom-mui-components/Button/CustomButton";

//--------------------------------------------------------------
//--------------------------------------------------------------

const RedAsterisk = styled("span")(({ theme }) => ({
  color: theme.palette.error.main,
}));

const validationSchema = Yup.object().shape({
  jobTitle: Yup.string().required("Required"),
  yearsOfExp: Yup.number()
    .typeError("Provide Numbers Only")
    .required("Required"),
  jobLvl: Yup.string().optional(),
  gender: Yup.string().required("Required"),
  educationLevel: Yup.string().required("Required"),
});

const jobLevel = [
  { label: "Junior", value: "junior" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Senior", value: "senior" },
];

const gender = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "No Preference", value: "no-preference" },
];

const educationLevel = [
  { label: "Highschool", value: "highschool" },
  { label: "Bachelor Degree", value: "bachelor" },
  { label: "Masters Degree", value: "masters" },
  { label: "PhD", value: "phd" },
];
//--------------------------------------------------------------
//--------------------------------------------------------------

const PostJob = () => {
  const { userData } = useUserStore();
  const router = useRouter();

  const initialValues = {
    jobTitle: "",
    jobLvl: "",
    yearsOfExp: 0,
    gender: "",
    educationLevel: "",
  };

  const submitJobPost = (values) => {
    console.log(values);
  };

  useEffect(() => {
    if (userData && userData.uid && userData.userType !== "employer") {
      router.push("/404");
    }
  }, [userData]);

  return (
    <DefaultLayout>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 5 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitJobPost}
          >
            {({ values, errors }) => {
              console.log(values, errors);
              return (
                <Form>
                  <Grid container rowSpacing={3} columnSpacing={10}>
                    <Grid
                      item
                      xs={12}
                      sx={{ marginTop: "1rem", marginBottom: "1rem" }}
                    >
                      <h3>Specify Required Employee Info:</h3>
                      <p style={{ marginTop: ".5em" }}>
                        to find matching candidates
                      </p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field name="jobTitle">
                        {({ form, field }) => (
                          <>
                            <TextField
                              id="jobTitle"
                              variant="standard"
                              label={"Job Title"}
                              {...field}
                              fullWidth
                              helperText={
                                form.touched.jobTitle && form.errors.jobTitle
                              }
                            />
                          </>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field name="yearsOfExp">
                        {({ field, form }) => (
                          <>
                            <TextField
                              id="yearsOfExp"
                              variant="standard"
                              type="number"
                              label={"Years Of Experience"}
                              {...field}
                              fullWidth
                              inputProps={{ min: "0" }}
                            />
                          </>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <SelectField
                        name="educationLevel"
                        options={educationLevel}
                        label="Education Level"
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field name="yearsOfExp">
                        {({ field, form }) => (
                          <>
                            <TextField
                              id="yearsOfExp"
                              variant="standard"
                              type="number"
                              label={"Years Of Experience"}
                              {...field}
                              fullWidth
                              inputProps={{ min: "0" }}
                            />
                          </>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <SelectField
                        name="gender"
                        options={gender}
                        label="Gender"
                        isRequired={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <SelectField
                        name="jobLvl"
                        options={jobLevel}
                        label="Job Level"
                      />
                    </Grid>
                  </Grid>

                  <CustomButton type="submit" variant="contained">
                    Something
                  </CustomButton>
                </Form>
              );
            }}
          </Formik>
        </Paper>
      </Container>
    </DefaultLayout>
  );
};

const SelectField = ({ name, options, label, isRequired = false }) => {
  return (
    <>
      <Field name={name}>
        {({ form }) => (
          <TextField
            id={name}
            select
            defaultValue={""}
            label={label}
            fullWidth
            onChange={(e) => {
              form.setFieldValue(name, e.target.value);
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Field>
      {isRequired && (
        <ErrorMessage name={name}>
          {(msg) => (
            <FormHelperText id={`${name}-helper-text`} error>
              {msg}
            </FormHelperText>
          )}
        </ErrorMessage>
      )}
    </>
  );
};

export default PostJob;
