import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import appStyle from "./AppStyle.module.css";
import { Button } from "@mui/material";
import axios from "axios";
// import { useSelector } from "react-redux";

import DisplayCard from "./DisplayCard";
function Home() {
  // const users = useSelector((state) => {
  //   return state.users;
  // });
  const navigate = useNavigate();
  const [dData, setDData] = useState();

  console.log(window.location.pathname);
  const ALL_BOOK_END_POINT = "api/book/all";

  const getData = async () => {
    await axios
      .get(`https://book-e-sell-node-api.vercel.app/${ALL_BOOK_END_POINT}`)
      .then((res) => {
        if (res.status === 200) {
          setDData(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  // console.log(users);
  return (
    <div className={appStyle.containerDiv}>
      <h2 className={appStyle.heading}>Home</h2>
      <div className={appStyle.buttonContainer}>
        <Button
          className={appStyle.button}
          variant="outlined"
          onClick={() => navigate("/about")}
        >
          About
        </Button>

        <Button
          variant="outlined"
          className={appStyle.button}
          onClick={() => navigate("/cart")}
        >
          Cart
        </Button>
        <Button
          variant="outlined"
          className={appStyle.button}
          onClick={() => navigate("/nothing-here")}
        >
          Nothing
        </Button>
      </div>

      <div
        style={{
          width: "100%",
          marginTop: "1rem",
          padding: "0 1rem",
          display: "grid",
          rowGap: "2rem",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          // gap: "1.1rem",
        }}
      >
        {dData ? (
          dData.map((item, i) => (
            <div key={i}>
              <DisplayCard idx={i} data={item} />
            </div>
          ))
        ) : (
          <div>no Data</div>
        )}
      </div>
    </div>
  );
}
export default Home;
