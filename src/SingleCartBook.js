import React from "react";

const SingleCartBook = ({ onUpdate, onDelete, data, index }) => {
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
      <div style={{ flex: "1" }}>{data.book.name}</div>
      <div style={{ flex: "1" }}>{data.book.price * data.quantity}₹</div>
      <div style={{ display: "flex", gap: "1rem", flex: "1" }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            height: "1.5rem",
            width: "1.5rem",
            background: "#000",
            color: "#fff",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            if (data.quantity === 1) {
              alert("Minimum 1 book required");
            } else {
              onUpdate(data.id, data.book.id, data.quantity, "dec");
            }
          }}
        >
          <p style={{ transform: "translateY(-2px)" }}> -</p>
        </div>
        <div>{data.quantity}</div>
        <div
          style={{
            height: "1.5rem",
            width: "1.5rem",
            background: "#000",
            color: "#fff",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            if (data.quantity === 10) {
              alert("Max 10 can be ordered");
            } else {
              onUpdate(data.id, data.book.id, data.quantity, "inc");
            }
          }}
        >
          <p style={{ transform: "translateY(-2.5px)" }}> + </p>
        </div>
      </div>
      <button
        style={{
          height: "1.5rem",
          padding: "0 1rem",
          border: "0",
          outline: "0",
          background: "#ff0500",
          color: "white",
          fontWeight: "700",
          borderRadius: ".3rem",
          cursor: "pointer",
        }}
        onClick={() => {
          onDelete(data.id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default SingleCartBook;
