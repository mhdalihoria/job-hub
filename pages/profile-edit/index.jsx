import React from "react";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  useTheme,
  styled,
  Paper,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
} from "@mui/material";
import Step1 from "@/components/profile-edit/step-one/Step1";

const FormContainerStyled = styled("div")(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: "5rem 1rem",
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  width: "80%",
  margin: "0rem auto",
}));

const FormStyled = styled(Box)(({ theme }) => ({
  padding: "2rem 1rem",
}));

const steps = ["Step 1", "Step 2", "Step 3"];

const validationSchema = [
  Yup.object().shape({
    userType: Yup.string().required("User Type is required"),
  }),
  Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  }),
  Yup.object().shape({
    // Define validation schema for the third step
  }),
];

const ProfileForm = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState(null);
  console.log(formData);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isLastStep = activeStep === steps.length - 1;

  const handleSubmit = (values) => {
    if (isLastStep) {
      // Handle form submission logic here
      console.log(values);
    } else {
      handleNext();
    }
  };

  return (
    <DefaultLayout>
      <FormContainerStyled>
        <PaperStyled elevation={1}>
          {/* <Formik
            initialValues={{
              userType: "",
              name: "",
              email: "",
              // Add fields for the third step
            }}
            validationSchema={validationSchema[activeStep]}
            onSubmit={handleSubmit}
          >*/}
          <FormStyled>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === 0 && (
                // <div>
                //   <Field
                //     name="userType"
                //     as={FormControl}
                //     variant="outlined"
                //     fullWidth
                //   >
                //     <InputLabel>Who Are You?</InputLabel>
                //     <Field as={Select} name="userType" id="userType">
                //       <MenuItem
                //         value="jobSeeker"
                //         id="jobSeekerOption"
                //         name="jobSeekerOption"
                //       >
                //         Job Seeker
                //       </MenuItem>
                //       <MenuItem
                //         value="employer"
                //         id="employerOption"
                //         name="employerOption"
                //       >
                //         Employer
                //       </MenuItem>
                //     </Field>
                //   </Field>

                //   <ErrorMessage name="userType" component="div" />
                // </div>
                <Step1
                  setFormData={setFormData}
                  activeStep={activeStep}
                  handleBack={handleBack}
                  handleNext={handleNext}
                  isLastStep={isLastStep}
                />
              )}

              {activeStep === 1 && (
                <div>
                  {/* <Field
                      name="email"
                      as={TextField}
                      label="Email"
                      fullWidth
                    />
                    <ErrorMessage name="email" component="div" /> */}
                </div>
              )}
              {/* Add fields for the third step */}
            </div>
            {/* <div>
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
              </div> */}
          </FormStyled>
          {/* </Formik> */}
        </PaperStyled>
      </FormContainerStyled>
    </DefaultLayout>
  );
};

export default ProfileForm;
