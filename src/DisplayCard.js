import React from "react";
import "./displayCard.css";
import axios from "axios";
// import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const DisplayCard = ({ data, idx }) => {
  // const { user } = useAuth();
  const _user = useSelector((state) => {
    return state.users;
  });

  const CART_POST_END_POINT = "api/cart";

  const handleAddCart = async (data) => {
    const userId = _user.id;
    const requestedData = {
      bookId: data.id,
      userId: userId,
      quantity: 1,
    };
    await axios
      .post(
        `https://book-e-sell-node-api.vercel.app/${CART_POST_END_POINT}`,
        requestedData
      )
      .then((res) => {
        if (res.data.code === 200) {
          toast.success("Book added to cart", {
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
      })
      .catch((err) => {
        toast.warn(`${err.response.data.error}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log(err);
      });
  };
  return (
    <div key={idx} className="displayData__container">
      <div className="displayData__id">{data.name}</div>
      <div className="displayData__cat">{data.category}</div>
      <img
        className="displayData__img"
        src={data.base64image}
        alt="book cover"
      />
      <div className="displayData__price">{data.price}₹</div>
      <div className="displayData__body">{data.description}</div>
      <button
        className="displayData__cartBtn"
        onClick={() => {
          handleAddCart(data);
        }}
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default DisplayCard;
