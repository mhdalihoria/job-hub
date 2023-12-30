import CustomButton from "@/components/custom-mui-components/Button/CustomButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Stack,
  IconButton,
  Button,
  Grid,
  TextField,
  FormHelperText,
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import useUserStore from "@/stores/userStore";
import { auth, firestore } from "@/lib/firebase";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";

// -----------------------------------------

// -----------------------------------------

const validationSchema = Yup.object().shape({
  companyData: Yup.array().of(
    Yup.object().shape({
      companyName: Yup.string().required("Required"),
      companyIndustry: Yup.string().required("Required"),
    })
  ),
  companyDescription: Yup.string().required("Required"),
  companySize: Yup.string().required("Required"),
  phoneNum: Yup.number("Numbers Only")
    .typeError("Provide Numbers Only")
    .optional(),
  websiteLink: Yup.string().optional(),
  linkedInLink: Yup.string().optional(),
});

const initialValues = {
  companyData: [{ companyName: "", companyIndustry: "" }],
  companyDescription: "",
  companySize: "",
  phoneNum: "",
  websiteLink: "",
  linkedInLink: "",
};

const companyField = [
  "Software Development",
  "Marketing",
  "Financial Education",
];

const companySize = [
  "0 - 50",
  "50 - 100",
  "100 - 200",
  "200 - 500",
  "500 - 1000",
];
// -----------------------------------------

const EmployerForm = ({ goBack }) => {
  const { userData, setUserData } = useUserStore();
  const router = useRouter();
  const [formPreviewData, setFormPreviewData] = useState(null);
  const [shouldPreview, setShouldPreview] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  // console.log(userData);

  const handleInitialFormSubmit = (values) => {
    console.log("submit", values);
    setFormPreviewData(values);
    setShouldPreview(true);
  };

  const handleEditForm = () => {
    setShouldPreview(false);
  };

  const handleFinalSubmit = async () => {
    // create a state or a function that we pass to EmployerForm and SeekerForm and pass the values to it for it to be submitted into firebase
    // This makes sure the info submitting is getting handled in a central place
    try {
      console.log("final submit");
      setLoading(true);
      const dataToSubmit = { ...formPreviewData, isUserInfoComplete: true };

      const docRef = doc(firestore, "users", auth.currentUser.uid);

      await updateDoc(docRef, dataToSubmit);
      await setUserData(dataToSubmit);
      await setLoading(false);
      await setSnackbarOpen(true);
      await setSnackbarMsg("Information Updated Successfully");

      setTimeout(() => {
        router.push("/")
      }, 3500);
      
    } catch (err) {
      console.error(err);
      setSnackbarMsg(err);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
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
        {shouldPreview ? (
          <Grid container rowGap={4} columnSpacing={3}>
            {formPreviewData.companyData.map((data, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" gutterBottom>
                    Company Information:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="standard"
                    label="Company Name"
                    sx={{ width: "100%" }}
                    defaultValue={data.companyName}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="standard"
                    label="Company Industry"
                    sx={{ width: "100%" }}
                    defaultValue={data.companyIndustry}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <TextField
                variant="standard"
                label="Company Size"
                sx={{ width: "100%" }}
                defaultValue={formPreviewData.companySize}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                multiline
                rows={2}
                label="Company Description"
                sx={{ width: "100%" }}
                defaultValue={formPreviewData.companyDescription}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            {formPreviewData.phoneNum && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Company Number:
                </Typography>
                <TextField
                  variant="standard"
                  label="Company Number"
                  sx={{ width: "100%" }}
                  defaultValue={formPreviewData.phoneNum}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            )}
            {formPreviewData.websiteLink && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Copmany Website:
                </Typography>
                <TextField
                  variant="standard"
                  label="Company Website Links"
                  sx={{ width: "100%" }}
                  defaultValue={formPreviewData.websiteLink}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            )}
            {formPreviewData.linkedInLink && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  LinkedIn Profile:
                </Typography>
                <TextField
                  variant="standard"
                  label="Company LinkedIn Link"
                  sx={{ width: "100%" }}
                  defaultValue={formPreviewData.linkedInLink}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            )}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
            >
              <CustomButton variant="text" onClick={handleEditForm}>
                Back
              </CustomButton>
              <CustomButton
                variant="contained"
                disabled={loading}
                onClick={handleFinalSubmit}
              >
                Submit
              </CustomButton>
            </Grid>
          </Grid>
        ) : (
          <Formik
            validationSchema={validationSchema}
            initialValues={formPreviewData ? formPreviewData : initialValues}
            onSubmit={handleInitialFormSubmit}
          >
            {({ values, errors }) => {
              return (
                <Form>
                  <Grid container rowGap={2}>
                    <Grid
                      item
                      xs={12}
                      sx={{ marginTop: "1rem", marginBottom: "-.5rem" }}
                    >
                      <h2>Company Information:</h2>
                    </Grid>

                    <Grid item xs={12}>
                      <FieldArray name="companyData">
                        {({ push, remove }) => (
                          <div>
                            {values.companyData.map((_, index) => (
                              <Grid
                                key={index}
                                container
                                columnSpacing={3}
                                justifyContent="space-between"
                              >
                                <Grid item xs={12} sm={6}>
                                  <Field
                                    name={`companyData.${index}.companyName`}
                                  >
                                    {({ field, form }) => (
                                      <TextField
                                        variant="standard"
                                        label="Company Name"
                                        sx={{ width: "100%" }}
                                        {...field}
                                        error={
                                          form.touched.companyData?.[index]
                                            ?.companyName &&
                                          Boolean(
                                            form.errors.companyData?.[index]
                                              ?.companyName
                                          )
                                        }
                                        helperText={
                                          form.touched.companyData?.[index]
                                            ?.companyName &&
                                          form.errors.companyData?.[index]
                                            ?.companyName
                                        }
                                      />
                                    )}
                                  </Field>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <Field
                                    name={`companyData.${index}.companyIndustry`}
                                  >
                                    {({ field, form }) => (
                                      <FormControl
                                        sx={{ width: "100%", height: "48px" }}
                                        variant="standard"
                                        error={
                                          form.touched.companyData?.[index]
                                            ?.companyIndustry &&
                                          Boolean(
                                            form.errors.companyData?.[index]
                                              ?.companyIndustry
                                          )
                                        }
                                      >
                                        <InputLabel
                                          id={`companyData.${index}.companyIndustry`}
                                        >
                                          Industry
                                        </InputLabel>
                                        <Select label="Industry" {...field}>
                                          {companyField.map((level) => (
                                            <MenuItem key={level} value={level}>
                                              {level}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                        {form.touched.companyData?.[index]
                                          ?.companyIndustry &&
                                          form.errors.companyData?.[index]
                                            ?.companyIndustry && (
                                            <FormHelperText
                                              sx={{ color: "red" }}
                                            >
                                              {
                                                form.errors.companyData?.[index]
                                                  ?.companyIndustry
                                              }
                                            </FormHelperText>
                                          )}
                                      </FormControl>
                                    )}
                                  </Field>
                                </Grid>
                              </Grid>
                            ))}
                          </div>
                        )}
                      </FieldArray>
                    </Grid>

                    <Grid item xs={12}>
                      <Field name={`companySize`}>
                        {({ field, form }) => (
                          <FormControl
                            sx={{ width: "100%", height: "48px" }}
                            variant="standard"
                            error={
                              form.touched.companySize &&
                              Boolean(form.errors.companySize)
                            }
                          >
                            <InputLabel id={`companySize`}>
                              Company Size
                            </InputLabel>
                            <Select label="Company Size" {...field}>
                              {companySize.map((level) => (
                                <MenuItem key={level} value={level}>
                                  {level}
                                </MenuItem>
                              ))}
                            </Select>
                            {form.touched.companySize &&
                              form.errors.companySize && (
                                <FormHelperText sx={{ color: "red" }}>
                                  {form.errors.companySize}
                                </FormHelperText>
                              )}
                          </FormControl>
                        )}
                      </Field>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <Field name="companyDescription">
                        {({ field, form }) => (
                          <TextField
                            variant="standard"
                            multiline
                            rows={4}
                            {...field}
                            label="Company Description"
                            sx={{ width: "100%" }}
                            error={
                              form.touched.companyDescription &&
                              Boolean(form.errors.companyDescription)
                            }
                            helperText={
                              form.touched.companyDescription &&
                              form.errors.companyDescription
                            }
                          />
                        )}
                      </Field>
                    </Grid>

                    {/* Optional Fields */}
                    <Grid item xs={12} sx={{ margin: "2rem 0" }}>
                      <Divider>Optional</Divider>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ marginTop: "-.5rem", marginBottom: "-0.6rem" }}
                    >
                      <h2>Additional Info:</h2>
                    </Grid>
                    <Grid item xs={12} rowSpacing={3}>
                      <Field name="phoneNum" variant="outlined" fullWidth>
                        {({ form, field }) => (
                          <>
                            <Typography variant="h6" gutterBottom>
                              Phone Number:
                            </Typography>
                            <TextField
                              id="phoneNum"
                              variant="standard"
                              label={"Phone Number (001 123 456 789)"}
                              {...field}
                              fullWidth
                              error={
                                form.touched.phoneNum &&
                                Boolean(form.errors.phoneNum)
                              }
                              helperText={
                                form.touched.phoneNum && form.errors.phoneNum
                              }
                            />
                          </>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12}>
                      <Field name="websiteLink" variant="outlined" fullWidth>
                        {({ form, field }) => (
                          <>
                            <Typography variant="h6" gutterBottom>
                              Website Link:
                            </Typography>
                            <TextField
                              id="websiteLink"
                              variant="standard"
                              label={"Company Website"}
                              {...field}
                              fullWidth
                            />
                          </>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12}>
                      <Field name="linkedInLink" variant="outlined" fullWidth>
                        {({ form, field }) => (
                          <>
                            <Typography variant="h6" gutterBottom>
                              LinkedIn Profile:
                            </Typography>
                            <TextField
                              id="linkedInLink"
                              variant="standard"
                              label={"LinkedIn Profile"}
                              {...field}
                              fullWidth
                            />
                          </>
                        )}
                      </Field>
                    </Grid>

                    <Grid item xs={12} justifyContent={"flex-end"}>
                      <CustomButton
                        type="submit"
                        variant="contained"
                        sx={{
                          width: "100%",
                          fontSize: "1.2rem",
                          marginTop: "2rem",
                        }}
                      >
                        Submit Form
                      </CustomButton>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployerForm;
