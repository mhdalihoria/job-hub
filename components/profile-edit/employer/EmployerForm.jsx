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
  styled,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
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
  phoneNum: Yup.number("Numbers Only").optional(),
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

  const handleFormSubmit = (values) => {
    console.log("submit", values);
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
                                          <FormHelperText sx={{ color: "red" }}>
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
                    <h2>Education & Personal Info:</h2>
                  </Grid>
                  <Grid item xs={12} rowSpacing={3}>
                    <Field name="phoneNum" variant="outlined" fullWidth>
                      {({ form, field }) => (
                        <>
                          <TextField
                            id="phoneNum"
                            variant="standard"
                            label={"Phone Number (001 123 456 789)"}
                            {...field}
                            fullWidth
                          />
                        </>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="websiteLink" variant="outlined" fullWidth>
                      {({ form, field }) => (
                        <>
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
      </Box>
    </Box>
  );
};

export default EmployerForm;
