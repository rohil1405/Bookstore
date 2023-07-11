import appStyle from "./AppStyle.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    password: "",
    confPass: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name cannot be empty")
      .min(3, "name must be of atleast 3 character"),
    lastName: Yup.string()
      .required("Last name cannot be empty")
      .min(3, "Last Name must be of atleast 3 character"),
    role: Yup.string().required("role cannot be empty"),
    email: Yup.string().required("email cannot be empty").email(),
    password: Yup.string()
      .required("password cannot be empty")
      .min(8, "minimum pass length is 8")
      .matches(/[0-9]/, "pass must contain a number")
      .matches(/[a-z]/, "pass must contain a lowercase letter")
      .matches(/[A-Z]/, "pass must contain a uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    confPass: Yup.string()
      .required("confirm password cannot be empty")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const REGISTER_END_POINT = "api/user";
  const onFormSubmit = async (values) => {
    console.log("on form submit: ", values);
    let requestedData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };
    if (values.role === "buyer") {
      requestedData.roleId = 3;
    } else if (values.role === "seller") {
      requestedData.roleId = 2;
    }
    console.log(requestedData);
    await axios
      .post(
        `https://book-e-sell-node-api.vercel.app/${REGISTER_END_POINT}`,
        requestedData
      )
      .then((res) => {
        if (res.data.code === 200) {
          console.log(res);
          toast.success("Registered Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.response.data.error}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          marginTop: "4rem",
          paddingBottom: "2rem",
          // height: "100%",
        }}
      >
        <div className={appStyle.loginCon}>
          <div className={appStyle.loginHead}>
            <p>Register</p>
            <div className={appStyle.line}></div>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onFormSubmit}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              handleBlur,
              isSubmitting,
            }) => (
              <form className={appStyle.form} onSubmit={handleSubmit}>
                <TextField
                  error={!!errors.firstName}
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  type="text"
                  sx={{ width: "80%" }}
                  // value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.firstName && (
                  <span
                    style={{
                      color: "red",
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "80%",
                      marginTop: "-.5rem",
                    }}
                  >
                    {errors.firstName}
                  </span>
                )}
                <TextField
                  error={!!errors.lastName}
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  type="text"
                  sx={{ width: "80%" }}
                  // value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.lastName && (
                  <span
                    style={{
                      color: "red",
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "80%",
                      marginTop: "-.5rem",
                    }}
                  >
                    {errors.lastName}
                  </span>
                )}
                <FormControl sx={{ width: "80%" }} error={!!errors.role}>
                  <InputLabel id="role">Role</InputLabel>
                  <Select
                    name="role"
                    labelId="role"
                    id="role"
                    label="Role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                  >
                    <MenuItem value="buyer">Buyer</MenuItem>
                    <MenuItem value="seller">Seller</MenuItem>
                  </Select>
                </FormControl>
                {touched.role && (
                  <span
                    style={{
                      color: "red",
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "80%",
                      marginTop: "-.5rem",
                    }}
                  >
                    {errors.role}
                  </span>
                )}
                <TextField
                  error={!!errors.email}
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  type="text"
                  sx={{ width: "80%" }}
                  // value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && (
                  <span
                    style={{
                      color: "red",
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "80%",
                      marginTop: "-.5rem",
                    }}
                  >
                    {errors.email}
                  </span>
                )}
                <TextField
                  error={!!errors.password}
                  id="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  // value={password}
                  onChange={handleChange}
                  sx={{ width: "80%" }}
                  onBlur={handleBlur}
                />
                {touched.password && (
                  <span
                    style={{
                      color: "red",
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "80%",
                      marginTop: "-.5rem",
                    }}
                  >
                    {errors.password}
                  </span>
                )}
                <TextField
                  error={!!errors.confPass}
                  id="confPass"
                  name="confPass"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  // value={password}
                  onChange={handleChange}
                  sx={{ width: "80%" }}
                  onBlur={handleBlur}
                />
                {touched.confPass && (
                  <span
                    style={{
                      color: "red",
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "80%",
                      marginTop: "-.5rem",
                    }}
                  >
                    {errors.confPass}
                  </span>
                )}
                <div className={appStyle.loginButton}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    Register
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <Link to="/login" className={appStyle.loginLink}>
          Already have an account
        </Link>
      </div>
    </>
  );
}
export default Register;
