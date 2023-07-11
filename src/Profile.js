import React from "react";
import { useNavigate } from "react-router-dom";
import appStyle from "./AppStyle.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "./AuthContext";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { _setUser } from "./redux/store/slices/user";

const Profile = () => {
  const UPDATE_USER_END_POINT = "api/user";
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const dispatch = useDispatch();
  const _user = useSelector((state) => {
    return state.users;
  });

  const reduxSetUser = (userData) => {
    dispatch(_setUser(userData));
  };

  const initialValues = {
    firstName: _user.firstName,
    lastName: _user.lastName,
    email: _user.email,
    newPassword: "",
    confPassword: "",
  };

  const onProfileSubmit = async (values) => {
    console.log("profile", values);
    let requestedData = {
      id: _user.id,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      roleId: _user.roleId,
      role: _user.role,
      password: values.newPassword,
    };
    // console.log(requestedData);
    await axios
      .put(
        `https://book-e-sell-node-api.vercel.app/${UPDATE_USER_END_POINT}`,
        requestedData
      )
      .then((res) => {
        if (res.data.code === 200) {
          console.log("usr updated");
          // setUser(res.data.result);
          reduxSetUser(res.data.result);
          localStorage.setItem("loginInfo", JSON.stringify(res.data.result));
          toast.success("User updated", {
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
      .catch((err) => console.log(err));
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name cannot be empty")
      .min(3, "name must be of atleast 3 character"),
    lastName: Yup.string()
      .required("Last name cannot be empty")
      .min(3, "LastName must be of atleast 3 character"),
    email: Yup.string().required("email cannot be empty").email(),
    newPassword: Yup.string()
      .required("Password is required")
      .min(8, "minimum pass length is 8")
      .matches(/[0-9]/, "pass must contain a number")
      .matches(/[a-z]/, "pass must contain a lowercase letter")
      .matches(/[A-Z]/, "pass must contain a uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    confPassword: Yup.string()
      .required("Confirm Password is required field")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  return (
    <div className={appStyle.containerDiv}>
      <h2 className={appStyle.heading}>Profile</h2>
      <div className={appStyle.profileContainer}>
        <div className={appStyle.profileHead}>
          <p>Update Profile</p>
          <div className={appStyle.line}></div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onProfileSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
          }) => (
            <form className={appStyle.profileForm} onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  // flex: 1,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <TextField
                  value={values.firstName}
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
                      marginTop: ".2rem",
                    }}
                  >
                    {errors.firstName}
                  </span>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  // flex: 1,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <TextField
                  value={values.lastName}
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
                      marginTop: ".2rem",
                    }}
                  >
                    {errors.lastName}
                  </span>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <TextField
                  error={!!errors.email}
                  value={values.email}
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
                      marginTop: ".2rem",
                    }}
                  >
                    {errors.email}
                  </span>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <TextField
                  autoComplete="true"
                  error={!!errors.newPassword}
                  value={values.newPassword}
                  id="password"
                  name="newPassword"
                  label="Password"
                  variant="outlined"
                  type="password"
                  // value={password}
                  onChange={handleChange}
                  sx={{ width: "80%" }}
                  onBlur={handleBlur}
                />
                {touched.newPassword && (
                  <span
                    style={{
                      color: "red",
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "80%",
                      marginTop: ".2rem",
                    }}
                  >
                    {errors.newPassword}
                  </span>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <TextField
                  autoComplete="true"
                  error={!!errors.confPassword}
                  value={values.confPassword}
                  id="password"
                  name="confPassword"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  // value={password}
                  onChange={handleChange}
                  sx={{ width: "80%" }}
                  onBlur={handleBlur}
                />
                {touched.confPassword && (
                  <span
                    style={{
                      color: "red",
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "80%",
                      marginTop: ".2rem",
                    }}
                  >
                    {errors.confPassword}
                  </span>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ width: "30%", height: "2rem" }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: "30%",
                    height: "2rem",
                    background: "red",
                  }}
                  onClick={() => {
                    navigate("/");
                    toast.success("No Changes are Made", {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Profile;
