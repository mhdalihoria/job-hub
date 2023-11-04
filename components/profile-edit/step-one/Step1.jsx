import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const validationSchema = Yup.object().shape({
  userType: Yup.string().required("What type of user are you?"),
});

const StepOne = ({ activeStep, handleBack, isLastStep, setFormData }) => {
  const handleSubmit = (values) => {
    console.log(values);
    setFormData(oldData => ({...oldData, ...values}))
  };

  return (
    <Formik
      initialValues={{
        userType: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <Field name="userType" as={FormControl} variant="outlined" fullWidth>
            <InputLabel>Who Are You?</InputLabel>
            <Field as={Select} name="userType" id="userType">
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
    </Formik>
  );
};

export default StepOne;
