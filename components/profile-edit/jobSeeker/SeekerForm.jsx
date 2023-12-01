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
      description: Yup.string().required("Required"),
    })
  ),
  reseme: Yup.mixed()
    .required("Required")
    .test(
      "is-valid-size",
      "Max allowed size is 2MB",
      (value) => value && value.size <= MAX_FILE_SIZE
    ),
  phoneNum: Yup.number("Numbers Only").optional(),
  websiteLink: Yup.string().optional(),
  linkedInLink: Yup.string().optional(),
  githubLink: Yup.string().optional(),
  courses: Yup.array().of(
    Yup.object().shape({
      courseTitle: Yup.string().optional(),
      courseAuthor: Yup.string().optional(),
      courseDescription: Yup.string().optional(),
      startDate: Yup.string().optional(),
      endDate: Yup.string().optional(),
    })
  ),
});

const workExpArr = [
  {
    jobTitle: "",
    companyName: "",
    jobRole: "",
    duration: { startDate: null, endDate: null },
    description: "",
  },
];

const initialValues = {
  jobTitle: "",
  skills: [{ skillName: "", skillLvl: "" }],
  workExp: workExpArr,
  reseme: "",
  phoneNum: "",
  websiteLink: "",
  linkedInLink: "",
  githubLink: "",
  courses: [
    {
      courseTitle: "",
      courseAuthor: "",
      courseDescription: "",
      startDate: null,
      endDate: null,
    },
  ],
};

const skillLevels = ["beginner", "intermediate", "expert"];
// -----------------------------------------

const SeekerForm = ({ goBack }) => {
  const handleResemeUpload = (e, destination, setFieldValue) => {
    const file = e.target.files[0];

    if (file) {
      setFieldValue(destination, file);

      // Use FileReader to preview the image
      //   const reader = new FileReader();
      //   reader.onloadend = () => {
      //     setImagePreview(reader.result);
      //   };
      //   reader.readAsDataURL(file);
      // } else {
      //   setImagePreview(null);
      // }
    }
  };

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
                        <div>
                          <label htmlFor="reseme">
                            <CustomButton
                              variant="contained"
                              component="span"
                              sx={{ width: "100%", marginBottom: "-1rem" }}
                            >
                              Upload Reseme
                            </CustomButton>
                            <input
                              {...field}
                              type="file"
                              accept=".jpg, .jpeg, .png, .pdf"
                              id="reseme"
                              style={{ display: "none" }}
                            />
                          </label>
                          <ErrorMessageStyled
                            name="reseme"
                            component={FormHelperText}
                          />
                        </div>
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
                        />
                        <ErrorMessageStyled>
                          <ErrorMessage name="jobTitle" />
                        </ErrorMessageStyled>
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
                                      form.touched.skills?.[index]?.skillName &&
                                      Boolean(
                                        form.errors.skills?.[index]?.skillName
                                      )
                                    }
                                    helperText={
                                      form.touched.skills?.[index]?.skillName &&
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
                                  >
                                    <InputLabel id={`skills.${index}.skillLvl`}>
                                      Skill Level
                                    </InputLabel>
                                    <Select
                                      label="Skill Level"
                                      {...field}
                                      error={
                                        form.touched.skills?.[index]
                                          ?.skillLvl &&
                                        Boolean(
                                          form.errors.skills?.[index]?.skillLvl
                                        )
                                      }
                                    >
                                      {skillLevels.map((level) => (
                                        <MenuItem key={level} value={level}>
                                          {level}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                    {form.touched.skills?.[index]?.skillLvl &&
                                      form.errors.skills?.[index]?.skillLvl && (
                                        <div>
                                          {
                                            form.errors.skills?.[index]
                                              ?.skillLvl
                                          }
                                        </div>
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
                              }}
                            >
                              <CustomButton
                                variant="outlined"
                                onClick={() => remove(index)}
                              >
                                Remove Skill
                              </CustomButton>
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
                                      form.touched.workExp?.[index]?.jobTitle &&
                                      Boolean(
                                        form.errors.workExp?.[index]?.jobTitle
                                      )
                                    }
                                    helperText={
                                      form.touched.workExp?.[index]?.jobTitle &&
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
                                      form.errors.workExp?.[index]?.companyName
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
                                      form.touched.workExp?.[index]?.jobRole &&
                                      Boolean(
                                        form.errors.workExp?.[index]?.jobRole
                                      )
                                    }
                                    helperText={
                                      form.touched.workExp?.[index]?.jobRole &&
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
                                      error={
                                        form.touched.workExp?.[index]?.duration
                                          ?.startDate &&
                                        Boolean(
                                          form.errors.workExp?.[index]?.duration
                                            ?.startDate
                                        )
                                      }
                                      helperText={
                                        form.touched.workExp?.[index]?.duration
                                          ?.startDate &&
                                        form.errors.workExp?.[index]?.duration
                                          ?.startDate
                                      }
                                    />
                                  </LocalizationProvider>
                                )}
                              </Field>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field name={`workExp.${index}.duration.endDate`}>
                                {({ field, form }) => (
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
                                        form.touched.workExp?.[index]?.duration
                                          ?.endDate &&
                                        Boolean(
                                          form.errors.workExp?.[index]?.duration
                                            ?.endDate
                                        )
                                      }
                                      helperText={
                                        form.touched.workExp?.[index]?.duration
                                          ?.endDate &&
                                        form.errors.workExp?.[index]?.duration
                                          ?.endDate
                                      }
                                    />
                                  </LocalizationProvider>
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
                              }}
                            >
                              <CustomButton
                                variant="outlined"
                                onClick={() => remove(index)}
                              >
                                Remove Experience
                              </CustomButton>
                              <CustomButton
                                variant="outlined"
                                onClick={() => push(workExpArr)}
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
                                  />
                                )}
                              </Field>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                name={`courses.${index}.duration.startDate`}
                              >
                                {({ field, form }) => (
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
                                )}
                              </Field>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field name={`courses.${index}.duration.endDate`}>
                                {({ field, form }) => (
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
                              }}
                            >
                              <CustomButton
                                variant="outlined"
                                onClick={() => remove(index)}
                              >
                                Remove Course
                              </CustomButton>
                              <CustomButton
                                variant="outlined"
                                onClick={() => push(workExpArr)}
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
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default SeekerForm;
