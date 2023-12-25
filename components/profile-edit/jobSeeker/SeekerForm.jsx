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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import IndeterminateCheckBox from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import React, { useState } from "react";
// -----------------------------------------

const ErrorMessageStyled = styled("div")(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: ".8rem",
  marginTop: ".2em",
}));

// -----------------------------------------
const MAX_FILE_SIZE = 2048000; //500KB

const validationSchema = Yup.object().shape({
  jobTitle: Yup.string().required("Required"),
  skills: Yup.array().of(
    Yup.object().shape({
      skillName: Yup.string().required("Required"),
      skillLvl: Yup.string().required("Required"),
    })
  ),
  workExp: Yup.array().of(
    Yup.object().shape({
      jobTitle: Yup.string().required("Required"),
      companyName: Yup.string().required("Required"),
      jobRole: Yup.string().required("Required"),
      duration: Yup.object().shape({
        startDate: Yup.string().required("Required"),
        endDate: Yup.string().required("Required"),
      }),
      // }).required("Required"),
    })
  ),
  courses: Yup.array().of(
    Yup.object().shape({
      courseTitle: Yup.string().required("Required"),
      courseAuthor: Yup.string().required("Required"),
      courseDescription: Yup.string().required("Required"),
      startDate: Yup.date().nullable().required("Required"),
      endDate: Yup.date().nullable().required("Required"),
    })
  ),
  reseme: Yup.mixed().required("Required"),
  phoneNum: Yup.number("Numbers Only")
    .typeError("Provide Numbers Only")
    .optional(),
  websiteLink: Yup.string().optional(),
  linkedInLink: Yup.string().optional(),
  githubLink: Yup.string().optional(),
});

const workExpObj = {
  jobTitle: "",
  companyName: "",
  jobRole: "",
  duration: { startDate: null, endDate: null },
};

const courseObj = {
  courseTitle: "",
  courseAuthor: "",
  courseDescription: "",
  startDate: null,
  endDate: null,
};
const initialValues = {
  jobTitle: "",
  skills: [{ skillName: "", skillLvl: "" }],
  workExp: [workExpObj],
  reseme: "",
  phoneNum: "",
  websiteLink: "",
  linkedInLink: "",
  githubLink: "",
  courses: [courseObj],
};

const skillLevels = ["beginner", "intermediate", "expert"];
// -----------------------------------------

const SeekerForm = ({ goBack }) => {
  const [fileName, setFileName] = useState("");
  const [shouldPreview, setShouldPreview] = useState(false);
  const [formPreviewData, setFormPreviewData] = useState(null);

  const handleOnImageChange = (event, form) => {
    const file = event.target.files[0];
    setFileName(file.name);
    form.setFieldValue("reseme", file);

    if (file && file.size / (1024 * 1024) > 2) {
      form.setFieldError("reseme", "Max allowed size is 2MB");
    }
  };

  const handleFormSubmit = (values) => {
    console.log("submit", values);
    setFormPreviewData(values);
    setShouldPreview(true);
  };

  const handleEditForm = () => {
    setShouldPreview(false);
  };

  const handleFinalSubmit = () => {
    // create a state or a function that we pass to EmployerForm and SeekerForm and pass the values to it for it to be submitted into firebase
    // This makes sure the info submitting is getting handled in a central place
    console.log("final submit");
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
          <Grid container rowGap={2} columnSpacing={3}>
            <Grid item xs={12} sx={6}>
              <TextField
                variant="standard"
                label="Desired Job Title"
                sx={{ width: "100%" }}
                defaultValue={formPreviewData.jobTitle}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            {formPreviewData.skills.map((data, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="standard"
                    label="Company Name"
                    sx={{ width: "100%" }}
                    defaultValue={data.skillName}
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
                    defaultValue={data.skillLvl}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </React.Fragment>
            ))}
            {formPreviewData.workExp.map((data, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="standard"
                    label="Job Title"
                    sx={{ width: "100%" }}
                    defaultValue={data.jobTitle}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
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
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="standard"
                    label="Job Role"
                    sx={{ width: "100%" }}
                    defaultValue={data.jobRole}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Date"
                      value={data.duration.startDate}
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="End Date"
                      value={data.duration.endDate}
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </Grid>
              </React.Fragment>
            ))}
            {formPreviewData.phoneNum && (
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  label="Phone Number"
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
                <TextField
                  variant="standard"
                  label="Website Link"
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
                <TextField
                  variant="standard"
                  label="LinkedIn Profile"
                  sx={{ width: "100%" }}
                  defaultValue={formPreviewData.linkedInLink}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            )}
            {formPreviewData.githubLink && (
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  label="GitHub Profile"
                  sx={{ width: "100%" }}
                  defaultValue={formPreviewData.githubLink}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            )}
            {formPreviewData.courses && (
              <Grid item xs={12}>
                {formPreviewData.courses.map((course, index) => (
                  <Grid
                    container
                    key={index}
                    rowSpacing={3}
                    columnSpacing={3}
                    justifyContent="space-between"
                  >
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="standard"
                        label="Course Title"
                        sx={{ width: "100%" }}
                        defaultValue={course.courseTitle}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="standard"
                        label="Course Author"
                        sx={{ width: "100%" }}
                        defaultValue={course.courseAuthor}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        variant="standard"
                        label="Course Description"
                        sx={{ width: "100%" }}
                        defaultValue={course.courseDescription}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Starting From"
                          value={course.duration.startDate}
                          sx={{ width: "100%" }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="End Date"
                          value={course.duration.endDate}
                          sx={{ width: "100%" }}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            )}

            <Grid item xs={12} sx={6}>
              <iframe
                src={URL.createObjectURL(formPreviewData.reseme)}
                width="100%"
                height="200px"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
            >
              <CustomButton variant="text" onClick={handleEditForm}>
                Back
              </CustomButton>
              <CustomButton variant="contained" onClick={handleFinalSubmit}>
                Submit
              </CustomButton>
            </Grid>
          </Grid>
        ) : (
          <Formik
            validationSchema={validationSchema}
            initialValues={formPreviewData ? formPreviewData : initialValues}
            onSubmit={handleFormSubmit}
          >
            {({ values, errors }) => {
              console.log(errors.courses);
              return (
                <Form>
                  <Grid container rowGap={2}>
                    <Grid
                      item
                      xs={12}
                      sx={{ marginTop: "1rem", marginBottom: "1rem" }}
                    >
                      <h2>Previous Skills & Experience:</h2>
                    </Grid>
                    <Grid item xs={12}>
                      <Field name="reseme">
                        {({ field, form }) => {
                          return (
                            <>
                              <div>
                                <label htmlFor="reseme">
                                  <CustomButton
                                    variant="contained"
                                    component="span"
                                    sx={{
                                      width: "100%",
                                      marginBottom: "-1rem",
                                    }}
                                  >
                                    Upload Reseme
                                  </CustomButton>
                                  <input
                                    type="file"
                                    accept=".pdf"
                                    id="reseme"
                                    style={{ display: "none" }}
                                    onChange={(event) =>
                                      handleOnImageChange(event, form)
                                    }
                                  />
                                </label>
                              </div>
                              <div
                                style={{
                                  marginTop: "1.3rem",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <ErrorMessageStyled>
                                  <ErrorMessage
                                    name="reseme"
                                    as={FormHelperText}
                                  />
                                </ErrorMessageStyled>

                                <FormHelperText>
                                  {values.reseme ? values.reseme.name : ""}
                                </FormHelperText>
                              </div>
                            </>
                          );
                        }}
                      </Field>
                    </Grid>

                    <Grid item xs={12} rowSpacing={3}>
                      <Field name="jobTitle" variant="outlined" fullWidth>
                        {({ form, field }) => (
                          <>
                            <TextField
                              id="jobTitle"
                              variant="standard"
                              label={"Desired Job Title"}
                              {...field}
                              fullWidth
                              error={
                                form.touched.jobTitle &&
                                Boolean(form.errors.jobTitle)
                              }
                              helperText={
                                form.touched.jobTitle && form.errors.jobTitle
                              }
                            />
                            {/* <ErrorMessageStyled>
                            <ErrorMessage name="jobTitle" />
                          </ErrorMessageStyled> */}
                          </>
                        )}
                      </Field>
                    </Grid>

                    <Grid item xs={12}>
                      <FieldArray name="skills">
                        {({ push, remove }) => (
                          <div>
                            {values.skills.map((_, index) => (
                              <Grid
                                key={index}
                                container
                                rowSpacing={3}
                                columnSpacing={3}
                                justifyContent="space-between"
                              >
                                <Grid item xs={12} sm={6}>
                                  <Field name={`skills.${index}.skillName`}>
                                    {({ field, form }) => (
                                      <TextField
                                        variant="standard"
                                        label="Skill Name"
                                        sx={{ width: "100%" }}
                                        {...field}
                                        error={
                                          form.touched.skills?.[index]
                                            ?.skillName &&
                                          Boolean(
                                            form.errors.skills?.[index]
                                              ?.skillName
                                          )
                                        }
                                        helperText={
                                          form.touched.skills?.[index]
                                            ?.skillName &&
                                          form.errors.skills?.[index]?.skillName
                                        }
                                      />
                                    )}
                                  </Field>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <Field name={`skills.${index}.skillLvl`}>
                                    {({ field, form }) => (
                                      <FormControl
                                        sx={{ width: "100%", height: "48px" }}
                                        variant="standard"
                                        error={
                                          form.touched.skills?.[index]
                                            ?.skillLvl &&
                                          Boolean(
                                            form.errors.skills?.[index]
                                              ?.skillLvl
                                          )
                                        }
                                      >
                                        <InputLabel
                                          id={`skills.${index}.skillLvl`}
                                        >
                                          Skill Level
                                        </InputLabel>
                                        <Select label="Skill Level" {...field}>
                                          {skillLevels.map((level) => (
                                            <MenuItem key={level} value={level}>
                                              {level}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                        {form.touched.skills?.[index]
                                          ?.skillLvl &&
                                          form.errors.skills?.[index]
                                            ?.skillLvl && (
                                            <FormHelperText
                                              sx={{ color: "red" }}
                                            >
                                              {
                                                form.errors.skills?.[index]
                                                  ?.skillLvl
                                              }
                                            </FormHelperText>
                                          )}
                                      </FormControl>
                                    )}
                                  </Field>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: "1rem",
                                    marginTop: "-.7rem",
                                  }}
                                >
                                  {index !== 0 && (
                                    <CustomButton
                                      variant="outlined"
                                      onClick={() => remove(index)}
                                    >
                                      Remove Skill
                                    </CustomButton>
                                  )}
                                  <CustomButton
                                    variant="outlined"
                                    onClick={() =>
                                      push({ skillName: "", skillLvl: "" })
                                    }
                                  >
                                    Add Skill
                                  </CustomButton>
                                </Grid>
                              </Grid>
                            ))}
                          </div>
                        )}
                      </FieldArray>
                    </Grid>
                    <Grid item xs={12}>
                      <FieldArray name="workExp">
                        {({ push, remove }) => (
                          <div>
                            {values.workExp.map((_, index) => (
                              <Grid
                                key={index}
                                container
                                rowSpacing={3}
                                columnSpacing={3}
                                justifyContent="space-between"
                              >
                                <Grid item xs={12} sm={6}>
                                  <Field name={`workExp.${index}.jobTitle`}>
                                    {({ field, form }) => (
                                      <TextField
                                        variant="standard"
                                        {...field}
                                        label="Position Title"
                                        sx={{ width: "100%" }}
                                        error={
                                          form.touched.workExp?.[index]
                                            ?.jobTitle &&
                                          Boolean(
                                            form.errors.workExp?.[index]
                                              ?.jobTitle
                                          )
                                        }
                                        helperText={
                                          form.touched.workExp?.[index]
                                            ?.jobTitle &&
                                          form.errors.workExp?.[index]?.jobTitle
                                        }
                                      />
                                    )}
                                  </Field>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <Field name={`workExp.${index}.companyName`}>
                                    {({ field, form }) => (
                                      <TextField
                                        variant="standard"
                                        label="Company Name"
                                        sx={{ width: "100%" }}
                                        {...field}
                                        error={
                                          form.touched.workExp?.[index]
                                            ?.companyName &&
                                          Boolean(
                                            form.errors.workExp?.[index]
                                              ?.companyName
                                          )
                                        }
                                        helperText={
                                          form.touched.workExp?.[index]
                                            ?.companyName &&
                                          form.errors.workExp?.[index]
                                            ?.companyName
                                        }
                                      />
                                    )}
                                  </Field>
                                </Grid>
                                <Grid item xs={12}>
                                  <Field name={`workExp.${index}.jobRole`}>
                                    {({ field, form }) => (
                                      <TextField
                                        variant="standard"
                                        multiline
                                        rows={4}
                                        sx={{ width: "100%" }}
                                        {...field}
                                        label="Position Role"
                                        error={
                                          form.touched.workExp?.[index]
                                            ?.jobRole &&
                                          Boolean(
                                            form.errors.workExp?.[index]
                                              ?.jobRole
                                          )
                                        }
                                        helperText={
                                          form.touched.workExp?.[index]
                                            ?.jobRole &&
                                          form.errors.workExp?.[index]?.jobRole
                                        }
                                      />
                                    )}
                                  </Field>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <Field
                                    name={`workExp.${index}.duration.startDate`}
                                  >
                                    {({ field, form }) => (
                                      <>
                                        <LocalizationProvider
                                          dateAdapter={AdapterDayjs}
                                        >
                                          <DatePicker
                                            {...field}
                                            label="Starting From"
                                            value={field.value || null}
                                            onChange={(date) => {
                                              form.setFieldValue(
                                                `workExp.${index}.duration.startDate`,
                                                date
                                              );
                                            }}
                                            sx={{ width: "100%" }}
                                          />
                                        </LocalizationProvider>
                                        <ErrorMessageStyled>
                                          <ErrorMessage
                                            name={`workExp.${index}.duration.startDate`}
                                            as={FormHelperText}
                                          />
                                        </ErrorMessageStyled>
                                      </>
                                    )}
                                  </Field>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <Field
                                    name={`workExp.${index}.duration.endDate`}
                                  >
                                    {({ field, form }) => (
                                      <>
                                        <LocalizationProvider
                                          dateAdapter={AdapterDayjs}
                                        >
                                          <DatePicker
                                            {...field}
                                            label="End Date"
                                            value={field.value || null}
                                            onChange={(date) => {
                                              form.setFieldValue(
                                                `workExp.${index}.duration.endDate`,
                                                date
                                              );
                                            }}
                                            sx={{ width: "100%" }}
                                            error={
                                              form.touched.workExp?.[index]
                                                ?.duration?.endDate &&
                                              Boolean(
                                                form.errors.workExp?.[index]
                                                  ?.duration?.endDate
                                              )
                                            }
                                            helperText={
                                              form.touched.workExp?.[index]
                                                ?.duration?.endDate &&
                                              form.errors.workExp?.[index]
                                                ?.duration?.endDate
                                            }
                                          />
                                        </LocalizationProvider>
                                        <ErrorMessageStyled>
                                          <ErrorMessage
                                            name={`workExp.${index}.duration.endDate`}
                                            as={FormHelperText}
                                          />
                                        </ErrorMessageStyled>
                                      </>
                                    )}
                                  </Field>
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: "1rem",
                                    marginTop: "-.7rem",
                                    marginBottom: "1rem",
                                  }}
                                >
                                  {index !== 0 && (
                                    <CustomButton
                                      variant="outlined"
                                      onClick={() => remove(index)}
                                    >
                                      Remove Experience
                                    </CustomButton>
                                  )}
                                  <CustomButton
                                    variant="outlined"
                                    onClick={() => push(workExpObj)}
                                  >
                                    Add Experience
                                  </CustomButton>
                                </Grid>
                              </Grid>
                            ))}
                          </div>
                        )}
                      </FieldArray>
                    </Grid>
                    <Grid item xs={12}>
                      <FieldArray name="courses">
                        {({ push, remove }) => (
                          <div>
                            {values.courses.map((_, index) => (
                              <Grid
                                container
                                key={index}
                                rowSpacing={3}
                                columnSpacing={3}
                                justifyContent="space-between"
                              >
                                <Grid item xs={12} sm={6}>
                                  <Field name={`courses.${index}.courseTitle`}>
                                    {({ field, form }) => (
                                      <TextField
                                        variant="standard"
                                        {...field}
                                        label="Course Title"
                                        sx={{ width: "100%" }}
                                        error={
                                          form.touched.courses?.[index]
                                            ?.courseTitle &&
                                          Boolean(
                                            form.errors.courses?.[index]
                                              ?.courseTitle
                                          )
                                        }
                                        helperText={
                                          form.touched.courses?.[index]
                                            ?.courseTitle &&
                                          form.errors.courses?.[index]
                                            ?.courseTitle
                                        }
                                      />
                                    )}
                                  </Field>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <Field name={`courses.${index}.courseAuthor`}>
                                    {({ field, form }) => (
                                      <TextField
                                        variant="standard"
                                        {...field}
                                        label="Course Author"
                                        sx={{ width: "100%" }}
                                        error={
                                          form.touched.courses?.[index]
                                            ?.courseAuthor &&
                                          Boolean(
                                            form.errors.courses?.[index]
                                              ?.courseAuthor
                                          )
                                        }
                                        helperText={
                                          form.touched.courses?.[index]
                                            ?.courseAuthor &&
                                          form.errors.courses?.[index]
                                            ?.courseAuthor
                                        }
                                      />
                                    )}
                                  </Field>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                  <Field
                                    name={`courses.${index}.courseDescription`}
                                  >
                                    {({ field, form }) => (
                                      <TextField
                                        variant="standard"
                                        multiline
                                        rows={4}
                                        {...field}
                                        label="Course Description"
                                        sx={{ width: "100%" }}
                                        error={
                                          form.touched.courses?.[index]
                                            ?.courseDescription &&
                                          Boolean(
                                            form.errors.courses?.[index]
                                              ?.courseDescription
                                          )
                                        }
                                        helperText={
                                          form.touched.courses?.[index]
                                            ?.courseDescription &&
                                          form.errors.courses?.[index]
                                            ?.courseDescription
                                        }
                                      />
                                    )}
                                  </Field>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <Field
                                    name={`courses.${index}.duration.startDate`}
                                  >
                                    {({ field, form }) => (
                                      <>
                                        <LocalizationProvider
                                          dateAdapter={AdapterDayjs}
                                        >
                                          <DatePicker
                                            {...field}
                                            label="Starting From"
                                            value={field.value || null}
                                            onChange={(date) => {
                                              form.setFieldValue(
                                                `courses.${index}.duration.startDate`,
                                                date
                                              );
                                            }}
                                            sx={{ width: "100%" }}
                                          />
                                        </LocalizationProvider>
                                        <ErrorMessageStyled>
                                          <ErrorMessage
                                            name={`courses.${index}.duration.startDate`}
                                            as={FormHelperText}
                                          />
                                        </ErrorMessageStyled>
                                      </>
                                    )}
                                  </Field>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <Field
                                    name={`courses.${index}.duration.endDate`}
                                  >
                                    {({ field, form }) => (
                                      <>
                                        <LocalizationProvider
                                          dateAdapter={AdapterDayjs}
                                        >
                                          <DatePicker
                                            {...field}
                                            label="End Date"
                                            value={field.value || null}
                                            onChange={(date) => {
                                              form.setFieldValue(
                                                `courses.${index}.duration.endDate`,
                                                date
                                              );
                                            }}
                                            sx={{ width: "100%" }}
                                            
                                          />
                                        </LocalizationProvider>
                                        <ErrorMessageStyled>
                                          <ErrorMessage
                                            name={`courses.${index}.duration.endDate`}
                                            as={FormHelperText}
                                          />
                                        </ErrorMessageStyled>
                                      </>
                                    )}
                                  </Field>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: "1rem",
                                    marginTop: "-.7rem",
                                    marginBottom: "1rem",
                                  }}
                                >
                                  {index !== 0 && (
                                    <CustomButton
                                      variant="outlined"
                                      onClick={() => remove(index)}
                                    >
                                      Remove Course
                                    </CustomButton>
                                  )}
                                  <CustomButton
                                    variant="outlined"
                                    onClick={() => push(courseObj)}
                                  >
                                    Add Course
                                  </CustomButton>
                                </Grid>
                              </Grid>
                            ))}
                          </div>
                        )}
                      </FieldArray>
                    </Grid>
                    {/* Optional Fields */}
                    <Grid item xs={12}>
                      <Divider>Optional</Divider>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ marginTop: "1rem", marginBottom: "-0.6rem" }}
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
                              label={"Portfolio or Website"}
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
                    <Grid item xs={12}>
                      <Field name="githubLink" variant="outlined" fullWidth>
                        {({ form, field }) => (
                          <>
                            <TextField
                              id="githubLink"
                              variant="standard"
                              label={"GitHub Profile"}
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
                        sx={{ width: "100%", fontSize: "1.2rem" }}
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
    </Box>
  );
};

export default SeekerForm;
