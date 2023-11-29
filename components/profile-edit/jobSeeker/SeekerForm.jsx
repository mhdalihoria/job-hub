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
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
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
  workExp: Yup.array().of(
    Yup.object().shape({
      jobTitle: Yup.string().required("Required"),
      companyName: Yup.string().required("Required"),
      jobRole: Yup.string().required("Required"),
      duration: Yup.object().shape({
        startingFrom: Yup.string().required("Required"),
        endingAt: Yup.string().required("Required"),
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
    duration: { startingFrom: null, endingAt: null },
    description: "",
  },
];

const initialValues = {
  phoneNum: "",
  jobTitle: "",
  skills: [{ skillName: "", skillLvl: "" }],
  workExp: workExpArr,
  reseme: "",
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
                          label={"Your Desired Job Title*"}
                          {...field}
                          fullWidth
                        />
                        <ErrorMessageStyled>
                          <ErrorMessage name="jobTitle" />
                        </ErrorMessageStyled>
                      </>
                    )}
                  </Field>
                  <FieldArray name="skills">
                    {({ push, remove }) => (
                      <div>
                        {values.skills.map((_, index) => (
                          <div key={index}>
                            <Field name={`skills.${index}.skillName`}>
                              {({ field, form }) => (
                                <TextField
                                  variant="standard"
                                  {...field}
                                  label="Skill Name"
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

                            <Field name={`skills.${index}.skillLvl`}>
                              {({ field, form }) => (
                                <FormControl>
                                  <InputLabel id={`skills.${index}.skillLvl`}>
                                    Skill Level
                                  </InputLabel>
                                  <Select
                                    {...field}
                                    label="Skill Level"
                                    error={
                                      form.touched.skills?.[index]?.skillLvl &&
                                      Boolean(
                                        form.errors.skills?.[index]?.skillLvl
                                      )
                                    }
                                    sx={{ width: "100px", height: "48px" }}
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
                                        {form.errors.skills?.[index]?.skillLvl}
                                      </div>
                                    )}
                                </FormControl>
                              )}
                            </Field>

                            <CustomButton
                              variant="outlined"
                              onClick={() => remove(index)}
                            >
                              Remove Skill
                            </CustomButton>
                          </div>
                        ))}

                        <CustomButton
                          variant="outlined"
                          onClick={() => push({ skillName: "", skillLvl: "" })}
                        >
                          Add Skill
                        </CustomButton>
                      </div>
                    )}
                  </FieldArray>

                  <FieldArray name="workExp">
                    {({ push, remove }) => (
                      <div>
                        {values.workExp.map((_, index) => (
                          <div key={index}>
                            <Field name={`workExp.${index}.jobTitle`}>
                              {({ field, form }) => (
                                <TextField
                                  variant="standard"
                                  {...field}
                                  label="Position Title"
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
                            <Field name={`workExp.${index}.companyName`}>
                              {({ field, form }) => (
                                <TextField
                                  variant="standard"
                                  {...field}
                                  label="Company Name"
                                  error={
                                    form.touched.workExp?.[index]
                                      ?.companyName &&
                                    Boolean(
                                      form.errors.workExp?.[index]?.companyName
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

                            <Field name={`workExp.${index}.jobRole`}>
                              {({ field, form }) => (
                                <TextField
                                  variant="standard"
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

                            <Field
                              name={`workExp.${index}.duration.startingFrom`}
                            >
                              {({ field, form }) => (
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DatePicker
                                    {...field}
                                    label="Starting From"
                                    onChange={(date) => {
                                      form.setFieldValue(
                                        `workExp.${index}.duration.startingFrom`,
                                        date
                                      );
                                    }}
                                    error={
                                      form.touched.workExp?.[index]?.duration
                                        ?.startingFrom &&
                                      Boolean(
                                        form.errors.workExp?.[index]?.duration
                                          ?.startingFrom
                                      )
                                    }
                                    helperText={
                                      form.touched.workExp?.[index]?.duration
                                        ?.startingFrom &&
                                      form.errors.workExp?.[index]?.duration
                                        ?.startingFrom
                                    }
                                  />
                                </LocalizationProvider>
                              )}
                            </Field>

                            <Field name={`workExp.${index}.duration.endingAt`}>
                              {({ field, form }) => (
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DatePicker
                                    {...field}
                                    label="End Date"
                                    onChange={(date) => {
                                      form.setFieldValue(
                                        `workExp.${index}.duration.endingAt`,
                                        date
                                      );
                                    }}
                                    error={
                                      form.touched.workExp?.[index]?.duration
                                        ?.endingAt &&
                                      Boolean(
                                        form.errors.workExp?.[index]?.duration
                                          ?.endingAt
                                      )
                                    }
                                    helperText={
                                      form.touched.workExp?.[index]?.duration
                                        ?.endingAt &&
                                      form.errors.workExp?.[index]?.duration
                                        ?.endingAt
                                    }
                                  />
                                </LocalizationProvider>
                              )}
                            </Field>

                            <CustomButton
                              variant="outlined"
                              onClick={() => remove(index)}
                            >
                              Remove Experience
                            </CustomButton>
                          </div>
                        ))}

                        <CustomButton
                          variant="outlined"
                          onClick={() => push(workExpArr)}
                        >
                          Add Experience
                        </CustomButton>
                      </div>
                    )}
                  </FieldArray>

                  <Field name="reseme">
                    {({ field, form }) => {
                      console.log(form.values);
                      return (
                        <div>
                          <label htmlFor="reseme">
                            <CustomButton variant="contained" component="span">
                              Upload Profile Picture
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
