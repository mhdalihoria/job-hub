import React, { useState } from "react";
import { ErrorMessage, Field, FieldArray, Form, Formik, getIn } from "formik";
import * as Yup from "yup";
import {
  Button,
  ButtonBase,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import defaultUser from "@/public/imgs/default-user.png";
import Image from "next/image";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
//----------------------------------------------------------
const MAX_FILE_SIZE = 819200; //800KB

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  userType: Yup.string().required("What type of user are you?"),
  phoneNum: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  location: Yup.string().required("Location is required"),
  // links: Yup.string().required("Please Provide your Link(s)"),
  socialMedia: Yup.array().of(
    Yup.object().shape({
      platform: Yup.string().required("Select a social media platform"),
      value: Yup.string().required("Enter a value"),
    })
  ),
  profileImage: Yup.mixed()
    .required("Required")
    .test(
      "is-valid-size",
      "Max allowed size is 800KB",
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
        return <GitHubIcon />;
      }
      case "linkedin": {
        return <LinkedInIcon />;
      }
      case "website": {
        return <LanguageIcon />;
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
          <div>
            <Field name="userType" variant="outlined" fullWidth>
              {({ field, form }) => {
                return (
                  <>
                    <InputLabel>Who Are You?</InputLabel>
                    <Button
                      {...field}
                      onClick={() =>
                        form.setFieldValue("userType", "jobseeker")
                      }
                    >
                      Job Seeker
                    </Button>
                    <Button
                      {...field}
                      onClick={() => form.setFieldValue("userType", "employer")}
                    >
                      Employer
                    </Button>
                  </>
                );
              }}
            </Field>
            <ErrorMessage name="userType" component="div" />
          </div>

          <div>
            <Field name="phoneNum" variant="outlined" fullWidth>
              {({ form, field }) => (
                <>
                  {/* <InputLabel>Phone Number</InputLabel> */}
                  <TextField
                    id="phoneNum"
                    variant="standard"
                    label={"Phone Number"}
                    {...field}
                    fullWidth
                  />
                </>
              )}
            </Field>
            <ErrorMessage name="phoneNum" component="div" />
          </div>

          <div>
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
            <ErrorMessage name="location" component="div" />
          </div>

          {/* links
          <div>
            <Field name="links" as={FormControl} variant="outlined" fullWidth>
              <InputLabel>Social Links (Website, LinkedIn, etc...) </InputLabel>
              <Field
                as={Input}
                name="links"
                id="phoneNum"
                variant="standard"
              ></Field>
            </Field>
            <ErrorMessage name="links" component="div" />
          </div> */}

          <FieldArray name="socialMedia">
            {({ push, remove }) => (
              <>
                {values.socialMedia.map((_, index) => (
                  <div key={index}>
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
                            getIn(form.touched, `socialMedia.${index}.platform`)
                          }
                        >
                          <Select {...field} label="Social Media Platform">
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
                            getIn(form.errors, `socialMedia.${index}.value`) &&
                            getIn(form.touched, `socialMedia.${index}.value`)
                          }
                        >
                          <TextField {...field} label="Value" />
                          <ErrorMessage
                            name={`socialMedia.${index}.value`}
                            component={FormHelperText}
                          />
                        </FormControl>
                      )}
                    </Field>
                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => push({ platform: "", value: "" })}
                >
                  Add Field
                </Button>
              </>
            )}
          </FieldArray>

          <div>
            <Field name="profileImage">
              {({ field, form }) => {
                console.log(form.values);
                return (
                  <div>
                    <label htmlFor="profileImage">
                      <Button
                        variant="outlined"
                        component="span"
                        sx={{ color: "white" }}
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
                    {imagePreview && (
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        style={{ maxWidth: "100%", marginTop: "10px" }}
                        width={100}
                        height={100}
                      />
                    )}
                  </div>
                );
              }}
            </Field>

            <ErrorMessage
              name="profileImage"
              component="div"
              className="error"
            />
          </div>

          <div>
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
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StepOne;
