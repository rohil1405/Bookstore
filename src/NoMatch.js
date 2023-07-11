import appStyle from "./AppStyle.module.css";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";

function NoMatch() {
  const navigate = useNavigate();
  return (
    <div className={appStyle.containerDiv}>
      <h2 className={appStyle.heading}>Nothing to see here!</h2>

      <div className={appStyle.buttonContainer}>
        <Button
          variant="outlined"
          className={appStyle.button}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <Button
          variant="outlined"
          className={appStyle.button}
          onClick={() => navigate("/about")}
        >
          {" "}
          About
        </Button>
        <Button
          variant="outlined"
          className={appStyle.button}
          onClick={() => navigate("/dashboard")}
        >
          {" "}
          Dashboard
        </Button>
      </div>
      <p>
        <Link className={appStyle.link} to="/">
          Go to the home page
        </Link>
      </p>
    </div>
  );
}
export default NoMatch;
