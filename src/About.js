import appStyle from "./AppStyle.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className={appStyle.containerDiv}>
      <h2 className={appStyle.heading}>About</h2>
      <div className={appStyle.buttonContainer}>
        <Button
          className={appStyle.button}
          variant="outlined"
          onClick={() => navigate("/")}
        >
          Home
        </Button>

        <Button
          variant="outlined"
          className={appStyle.button}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Button>
        <Button
          variant="outlined"
          className={appStyle.button}
          onClick={() => navigate("/nothing-here")}
        >
          Nothing
        </Button>
      </div>
    </div>
  );
}
export default About;
