import React from "react";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
} from "formik";
import * as Yup from "yup";
import {
  Button,
  ButtonBase,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  styled,
} from "@mui/material";
import defaultUser from "@/public/imgs/default-user.png";
import Image from "next/image";

const MAX_FILE_SIZE = 819200; //800KB

const validFileExtensions = { profileImage: ["jpg", "png", "jpeg", "webp"] };

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}
const validationSchema = Yup.object().shape({
  userType: Yup.string().required("What type of user are you?"),
  phoneNum: Yup.string().required("Phone Number is required"),
  location: Yup.string().required("Location is required"),
  links: Yup.string().required("Please Provide your Link(s)"),
  profileImage: Yup.mixed().required("Required"),
  // .test(
  //   "is-valid-size",
  //   "Max allowed size is 800KB",
  //   (value) => value && value.size <= MAX_FILE_SIZE
  // ),
});

const StepOne = ({
  activeStep,
  handleNext,
  handleBack,
  isLastStep,
  setFormData,
}) => {
  // console.log(defaultUser);
  const handleSubmit = (values) => {
    console.log(values);
    setFormData((oldData) => ({ ...oldData, ...values }));
    handleNext();
  };

  return (
    <Formik
      initialValues={{
        userType: "",
        phoneNum: "",
        location: "",
        links: "",
        profileImage: null,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, handleBlur, values, touched, errors }) => (
        <Form>
          <div>
            <Field
              name="userType"
              as={FormControl}
              variant="outlined"
              fullWidth
            >
              <InputLabel>Who Are You?</InputLabel>
              <Field
                as={Select}
                name="userType"
                id="userType"
                variant="standard"
              >
                <MenuItem
                  value="jobSeeker"
                  id="jobSeekerOption"
                  name="jobSeekerOption"
                >
                  Job Seeker
                </MenuItem>
                <MenuItem
                  value="employer"
                  id="employerOption"
                  name="employerOption"
                >
                  Employer
                </MenuItem>
              </Field>
            </Field>

            <ErrorMessage name="userType" component="div" />
          </div>

          <div>
            <Field
              name="phoneNum"
              as={FormControl}
              variant="outlined"
              fullWidth
            >
              <InputLabel>Phone Number</InputLabel>
              <Field
                as={Input}
                name="phoneNum"
                id="phoneNum"
                variant="standard"
              ></Field>
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
          </div>

          <div>
            <Field name="profileImage">
              {(props) => {
                const { field, form } = props;

                console.log(form.values);
                console.log(field);
                return (
                  <>
                    {field.value && (
                      <Image src={field.value} width={75} height={75} alt="uploaded picture"/>
                    )}
                    <input
                      type="file"
                      accept={`image/${validFileExtensions.profileImage.join(
                        ", image/"
                      )}`}
                      id="profileImage"
                      {...field}
                    />
                  </>
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
