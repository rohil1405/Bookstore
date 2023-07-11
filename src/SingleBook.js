import appStyle from "./AppStyle.module.css";
import React from "react";

const SingleBook = ({ onUpdate, onDelete, index, data }) => {
  return (
    <div
      style={{
        color: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <div style={{ flex: "1" }}>{index + 1}</div>
      <div style={{ flex: "1" }}>{data.name}</div>
      <div style={{ flex: "1" }}>{data.price}₹</div>
      <div style={{ flex: "1" }}>{data.category}</div>
      <div style={{ display: "flex", gap: "1rem", flex: "1" }}>
        <button
          className={appStyle.bookEditBtn}
          onClick={() => {
            onUpdate(data);
          }}
        >
          Edit
        </button>
        <button
          className={appStyle.bookDeleteBtn}
          onClick={() => {
            onDelete(data.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleBook;
