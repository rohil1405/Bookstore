import appStyle from "./AppStyle.module.css";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import { useAuth } from "./AuthContext";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { _setUser } from "./redux/store/slices/user";
import { _setIsLogin } from "./redux/store/slices/checkLogin";
import { _resetIsLogin } from "./redux/store/slices/checkLogin";
import { _resetUser } from "./redux/store/slices/user";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { setIsLoggedIn, setUser } = useAuth();

  const reduxSetUser = (userData) => {
    dispatch(_setUser(userData));
  };
  const reduxSetLogin = () => {
    dispatch(_setIsLogin());
  };

  const reduxResetUser = () => {
    dispatch(_resetUser());
  };
  const reduxResetLogin = () => {
    dispatch(_resetIsLogin());
  };

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("loginInfo"));
    if (data) {
      let values = {
        email: data.email,
        password: data.password,
      };
      onFormSubmit(values);
    }
  }, []);
  const LOGIN_END_POINT = "api/user/login";
  // { dataPass }
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("email cannot be empty").email(),
    password: Yup.string()
      .required("password cannot be empty")
      .min(8, "minimum pass length is 8")
      .matches(/[0-9]/, "pass must contain a number")
      .matches(/[a-z]/, "pass must contain a lowercase letter")
      .matches(/[A-Z]/, "pass must contain a uppercase letter")
      .matches(/[^\w]/, "Pa`ssword requires a symbol"),
  });
  const onFormSubmit = async (values) => {
    console.log("on form submit: ", values);
    const requestData = {
      email: values.email,
      password: values.password,
    };
    await axios
      .post(
        `https://book-e-sell-node-api.vercel.app/${LOGIN_END_POINT}`,
        requestData
      )
      .then((res) => {
        console.log("login sub", res);
        if (res.data.code === 200) {
          // setIsLoggedIn(true);
          // setUser(res.data.result);
          reduxSetUser(res.data.result);
          reduxSetLogin();
          localStorage.setItem("loginInfo", JSON.stringify(res.data.result));
          localStorage.setItem("isLoggedIn", "true");
          toast.success("LoggedIn Successfully", {
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
        if (err.code === "ERR_NETWORK") {
          toast.error("Check your Internet", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        if (err.code === "ERR_BAD_REQUEST") {
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
          localStorage.removeItem("loginInfo");
          localStorage.removeItem("isLoggedIn");
        }
        // setUser(null);
        reduxResetUser();
        // setIsLoggedIn(false);
        reduxResetLogin();
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "4rem",
          gap: "1rem",
          flex: "1",
        }}
      >
        <div className={appStyle.loginCon}>
          <div className={appStyle.loginHead}>
            <p>Login</p>
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
                      justifyContent: "flex-",
                      width: "80%",
                      marginTop: "-.5rem",
                    }}
                  >
                    {errors.email}
                  </span>
                )}
                <TextField
                  autoComplete="true"
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
                      justifyContent: "flex-",
                      width: "80%",
                      marginTop: "-.5rem",
                    }}
                  >
                    {errors.password}
                  </span>
                )}
                <div className={appStyle.loginButton}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <Link to="/register" className={appStyle.loginLink}>
          Register a new user
        </Link>
      </div>
    </>
  );
}
export default Login;
