import "./App.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import Cart from "./Cart";
import NoMatch from "./NoMatch";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Book from "./Book";
import appStyle from "./AppStyle.module.css";
// import { useAuth } from "./AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function App() {
  const _isLogin = useSelector((state) => {
    return state.isLogin;
  });
  const _user = useSelector((state) => {
    return state.users;
  });
  // const { isLoggedIn, user } = useAuth();
  console.log(_user, _isLogin);
  return (
    <div className={appStyle.mainDiv}>
      <Layout />

      <ToastContainer />
      <Routes>
        <Route path="profile" element={_isLogin ? <Profile /> : <Login />} />
        <Route path="login" element={_isLogin ? <Home /> : <Login />} />
        <Route path="register" element={_isLogin ? <Home /> : <Register />} />
        <Route path="/" element={_isLogin ? <Home /> : <Login />} />
        <Route path="about" element={_isLogin ? <About /> : <Login />} />
        <Route path="cart" element={_isLogin ? <Cart /> : <Login />} />
        <Route path="*" element={_isLogin ? <NoMatch /> : <Login />} />
        <Route
          path="/book"
          element={
            _isLogin && _user.roleId === 2 ? (
              <Book />
            ) : _isLogin && _user.roleId === 3 ? (
              <Home />
            ) : (
              <Login />
            )
          }
        />
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
