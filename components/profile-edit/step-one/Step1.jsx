import React, { useState } from "react";
import { ErrorMessage, Field, FieldArray, Form, Formik, getIn } from "formik";
import * as Yup from "yup";
import {
  Button,
  ButtonBase,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import defaultUser from "@/public/imgs/default-user.png";
import Image from "next/image";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
//----------------------------------------------------------

const ErrorMessageStyled = styled(ErrorMessage)(({ theme }) => ({
  color: theme.palette.error.main,
}));

//----------------------------------------------------------
const MAX_FILE_SIZE = 512000; //500KB

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  userType: Yup.string().required("What type of user are you?"),
  phoneNum: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  location: Yup.string().required("Location is required"),
  // links: Yup.string().required("Please Provide your Link(s)"),
  socialMedia: Yup.array().test(
    "socialMedia",
    "Please fill in all social media fields",
    function (value) {
      // Custom validation for the entire array
      const isValid = value.every(
        (item) => item && item.platform && item.value
      );

      return isValid;
    }
  ),
  // ... other fields
  profileImage: Yup.mixed()
    .required("Required")
    .test(
      "is-valid-size",
      "Max allowed size is 500KB",
      (value) => value && value.size <= MAX_FILE_SIZE
    ),
});

const initialValues = {
  userType: "",
  phoneNum: "",
  location: "",
  // links: "",
  socialMedia: [{ platform: "", value: "" }],
  profileImage: null,
};

const platforms = ["github", "linkedin", "website"];

const StepOne = ({
  activeStep,
  handleNext,
  handleBack,
  isLastStep,
  setFormData,
}) => {
  // console.log(defaultUser);
  const theme = useTheme();
  const isLightTheme = theme.palette.mode === "light";
  const themeBasedColor = isLightTheme
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary;
  const themeBasedBg = isLightTheme
    ? theme.palette.primary.main
    : theme.palette.background.paper;

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];

    if (file) {
      setFieldValue("profileImage", file);

      // Use FileReader to preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (values) => {
    console.log(values);
    setFormData((oldData) => ({ ...oldData, ...values }));
    handleNext();
  };

  const showSocialIcon = (platform) => {
    switch (platform) {
      case "github": {
        return <GitHubIcon fontSize="small" />;
      }
      case "linkedin": {
        return <LinkedInIcon fontSize="small" />;
      }
      case "website": {
        return <LanguageIcon fontSize="small" />;
      }
      default:
        return null;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, handleBlur, values, touched, errors }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: ".6rem",
                margin: "2.6rem 0 -1.0rem",
              }}
            >
              <Field name="userType" variant="outlined" fullWidth>
                {({ field, form }) => {
                  const selectedButton = (
                    fieldValue,
                    btnValue,
                    additionalStyles
                  ) => {
                    if (fieldValue === btnValue) {
                      return {
                        color: themeBasedColor,
                        background: themeBasedBg,
                        ...additionalStyles,
                      };
                    } else {
                      return {
                        color: theme.palette.text.disabled,
                        ...additionalStyles,
                      };
                    }
                  };
                  return (
                    <>
                      <InputLabel>Who Are You?</InputLabel>
                      <div>
                        <Button
                          {...field}
                          onClick={() =>
                            form.setFieldValue("userType", "jobseeker")
                          }
                          sx={selectedButton(field.value, "jobseeker", {
                            margin: "0 .6rem",
                          })}
                        >
                          Job Seeker
                        </Button>
                        <Button
                          {...field}
                          onClick={() =>
                            form.setFieldValue("userType", "employer")
                          }
                          sx={selectedButton(field.value, "employer", {
                            margin: "0 .6rem",
                          })}
                        >
                          Employer
                        </Button>
                      </div>
                    </>
                  );
                }}
              </Field>
              <ErrorMessageStyled name="userType" component={FormHelperText} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field name="phoneNum" variant="outlined" fullWidth>
                {({ form, field }) => (
                  <>
                    {/* <InputLabel>Phone Number</InputLabel> */}
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
              <ErrorMessageStyled name="phoneNum" component={FormHelperText} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field
                name="location"
                as={FormControl}
                variant="outlined"
                fullWidth
              >
                <InputLabel>Location</InputLabel>
                <Field
                  as={Input}
                  name="location"
                  id="phoneNum"
                  variant="standard"
                ></Field>
              </Field>
              <ErrorMessageStyled name="location" component={FormHelperText} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FieldArray name="socialMedia">
                {({ push, remove }) => (
                  <>
                    {values.socialMedia.map((_, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          marginBottom: ".5rem",
                        }}
                      >
                        <Field
                          name={`socialMedia.${index}.platform`}
                          validateOnChange={false}
                        >
                          {({ field, form }) => (
                            <FormControl
                              error={
                                getIn(
                                  form.errors,
                                  `socialMedia.${index}.platform`
                                ) &&
                                getIn(
                                  form.touched,
                                  `socialMedia.${index}.platform`
                                )
                              }
                            >
                              <Select
                                {...field}
                                label="Social Media Platform"
                                variant="standard"
                              >
                                {platforms.map((platform) => (
                                  <MenuItem key={platform} value={platform}>
                                    {showSocialIcon(platform)}
                                  </MenuItem>
                                ))}
                              </Select>
                              <ErrorMessage
                                name={`socialMedia.${index}.platform`}
                                component={FormHelperText}
                              />
                            </FormControl>
                          )}
                        </Field>
                        <Field
                          name={`socialMedia.${index}.value`}
                          validateOnChange={false}
                        >
                          {({ field, form }) => (
                            <FormControl
                              error={
                                getIn(
                                  form.errors,
                                  `socialMedia.${index}.value`
                                ) &&
                                getIn(
                                  form.touched,
                                  `socialMedia.${index}.value`
                                )
                              }
                            >
                              <TextField
                                {...field}
                                label="Value"
                                variant="standard"
                              />
                              {/* <ErrorMessageStyled
                                name={`socialMedia.${index}.value`}
                                component={FormHelperText}
                              /> */}
                            </FormControl>
                          )}
                        </Field>
                        {index > 0 && (
                          <Button
                            type="button"
                            onClick={() => {
                              remove(index);
                            }}
                            sx={{
                              color: themeBasedColor,
                              background: themeBasedBg,
                              minWidth: "auto",
                              marginRight: ".2rem",
                            }}
                          >
                            <DeleteForeverIcon fontSize="small" />
                          </Button>
                        )}
                        {values.socialMedia.length === index + 1 && (
                          <Button
                            type="button"
                            onClick={() => push({ platform: "", value: "" })}
                            sx={{
                              color: themeBasedColor,
                              background: themeBasedBg,
                              minWidth: "auto",
                            }}
                          >
                            <AddBoxIcon fontSize="small" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </FieldArray>
              <ErrorMessageStyled
                name={`socialMedia`}
                component={FormHelperText}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field name="profileImage">
                {({ field, form }) => {
                  // console.log(form.values);
                  return (
                    <div
                      style={
                        imagePreview
                          ? {
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-end",
                              alignItems: "center",
                              gap: "15px",
                            }
                          : {
                              display: "flex",
                              height: "100%",
                              flexDirection: "column",
                              justifyContent: "flex-end",
                              alignItems: "flex-start",
                            }
                      }
                    >
                      {imagePreview && (
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          style={{
                            maxWidth: "100%",
                            marginTop: "10px",
                            borderRadius: "10000px",
                          }}
                          width={100}
                          height={100}
                        />
                      )}
                      <label htmlFor="profileImage">
                        <Button
                          variant="contained"
                          component="span"
                          sx={{
                            color: themeBasedColor,
                            background: themeBasedBg,
                            "&:hover": {
                              background: themeBasedBg,
                            },
                          }}
                        >
                          Upload Profile Picture
                        </Button>

                        <input
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          id="profileImage"
                          style={{ display: "none" }}
                          onChange={(event) => {
                            // form.setFieldValue(
                            //   "profileImage",
                            //   event.currentTarget.files[0]
                            // );
                            handleImageChange(event, form.setFieldValue);
                          }}
                        />
                      </label>
                      <ErrorMessageStyled
                        name="profileImage"
                        component={FormHelperText}
                      />
                    </div>
                  );
                }}
              </Field>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2rem",
              }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="contained"
              >
                Back
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {isLastStep ? "Submit" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default StepOne;
