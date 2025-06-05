import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const initialValues = {
  email: '',
  password: '',
  firstname:'',
  lastname:'',
  gender:'',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email Required"),
  password: Yup.string().min(6, "Password must have 6 characters").required("Password is required"),
  firstname:Yup.string().required("FirstName is Required"),
  gender:Yup.string().required("Gender is Required"),

});

const Register = () => {
  const [formValue, setFormValue] = useState();

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    setFormValue(values);
  };

  return (
    <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialValues}>
      <Form className="space-y-5">
        <div className="space-y-5">

          <div>
            <Field
              as={TextField}
              name="firstname"
              placeholder="first Name"
              type="firstname"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage name="firstname" component="div" className="text-red-500" />
          </div>  

          <div>
            <Field
              as={TextField}
              name="lastname"
              placeholder="Last Name"
              type="lastname"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage name="lastname" component="div" className="text-red-500" />
          </div>

          <div>
            <Field
              as={TextField}
              name="email"
              placeholder="Email"
              type="email"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>

          <div>
            <Field
              as={TextField}
              name="gender"
              placeholder="Gender"
              type="gender"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage name="gender" component="div" className="text-red-500" />
          </div>

          <div>
            <Field
              as={TextField}
              name="password"
              placeholder="Password"
              type="password"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage name="password" component="div" className="text-red-500" />
          </div>

          <Button sx={{padding: ".8rem 0rem"}} fullWidth type="submit" variant="contained" color="primary">Register</Button>
        </div>
      </Form>
    </Formik>
  );
};

export default Register;
