import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import appStyle from "./AppStyle.module.css";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import { Button } from "@mui/material";
// import { useAuth } from "./AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { _resetUser } from "./redux/store/slices/user";
import { _resetIsLogin } from "./redux/store/slices/checkLogin";

function Layout() {
  const _user = useSelector((state) => {
    return state.users;
  });
  const _isLogin = useSelector((state) => {
    return state.isLogin;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const reduxResetUser = () => {
    dispatch(_resetUser());
  };
  const reduxResetLogin = () => {
    dispatch(_resetIsLogin());
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log(_user);
  // console.log(_isLogin);
  // const { setUser, setIsLoggedIn } = useAuth();
  return (
    <>
      {_isLogin ? (
        <div style={{ width: "100%" }}>
          <nav>
            <img
              src={`${process.env.REACT_APP_URL}logo192.png`}
              alt="react"
              style={{
                width: "48px",
                position: "absolute",
                top: "1.3rem",
                left: "1.5rem",
              }}
            />
            <ul className={appStyle.navbarStyle}>
              <li>
                <NavLink className={appStyle.link} to="/">
                  Home
                </NavLink>
              </li>
              {_user.roleId === 2 ? (
                <li>
                  <NavLink className={appStyle.link} to="/book">
                    Book
                  </NavLink>
                </li>
              ) : (
                <></>
              )}
              <li>
                <NavLink className={appStyle.link} to="/cart">
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink className={appStyle.link} to="/profile">
                  Update Profile
                </NavLink>
              </li>
            </ul>
            <div className={appStyle.profile} onClick={handleClick}>
              <Avatar sx={{ bgcolor: "white", color: "black" }}>{`${
                _user.firstName[0].toUpperCase() +
                _user.lastName[0].toUpperCase()
              }`}</Avatar>
              <p>{`${
                _user.firstName[0].toUpperCase() + _user.firstName.slice(1)
              } ${
                _user.lastName[0].toUpperCase() + _user.lastName.slice(1)
              }`}</p>
            </div>
          </nav>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <div
              style={{
                padding: ".5rem",
              }}
            >
              <Button
                onClick={() => {
                  // setUser(null);
                  reduxResetUser();
                  // setIsLoggedIn(false);
                  reduxResetLogin();
                  localStorage.removeItem("loginInfo");
                  localStorage.removeItem("isLoggedIn");
                  setAnchorEl(null);
                  navigate("/login");
                }}
                variant="contained"
              >
                Logout
              </Button>
            </div>
          </Popover>
          {/* <Outlet /> */}
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <nav>
            <img
              src={`${process.env.REACT_APP_URL}logo192.png`}
              alt="react"
              style={{
                width: "48px",
                position: "absolute",
                top: "1.3rem",
                left: "1.5rem",
              }}
            />
            <ul className={appStyle.navbarStyle}>
              <li>
                <NavLink className={appStyle.link} to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className={appStyle.link} to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default Layout;
