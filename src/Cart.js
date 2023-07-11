import { useState, useEffect, useRef } from "react";
import appStyle from "./AppStyle.module.css";
import axios from "axios";
// import { useAuth } from "./AuthContext";
import SingleCartBook from "./SingleCartBook";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Cart() {
  const [addedBook, setAddedBook] = useState([]);
  // const [search, setSearch] = useState("");
  const [backup, setBackup] = useState([]);
  const searchRef = useRef();

  const CART_END_POINT = "api/cart?userId=";
  const CART_DELTE_END_POINT = "api/cart?id=";
  const CART_UPDATE_END_POINT = "api/cart";
  const CART_PLACE_ORDER_END_POINT = "api/order";
  // const { user } = useAuth();

  const _user = useSelector((state) => {
    return state.users;
  });

  const handleDelete = async (itemId) => {
    let arr = [...addedBook];
    await axios
      .delete(
        `https://book-e-sell-node-api.vercel.app/${CART_DELTE_END_POINT}${itemId}`
      )
      .then((res) => {
        if (res.status === 200) {
          const idx = addedBook.findIndex((e) => e.id === itemId);
          arr.splice(idx, 1);
          setAddedBook(arr);
          setBackup(arr);
          console.log("entry deleted");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    const search = searchRef.current.value;
    let arr = [...addedBook];
    if (search === "") {
      setAddedBook(backup);
      return;
    }
    arr = addedBook.filter((item) => {
      if (item.book.name.toLowerCase().includes(search.toLowerCase())) {
        return item;
      }
    });
    setAddedBook(arr);
  };

  const handleUpdate = async (id, bookId, quantity, sw) => {
    let arr = [...addedBook];
    const userId = _user.id;
    let requestedData = {};

    switch (sw) {
      case "inc":
        requestedData = {
          id: id,
          bookId: bookId,
          userId: userId,
          quantity: quantity + 1,
        };
        await axios
          .put(
            `https://book-e-sell-node-api.vercel.app/${CART_UPDATE_END_POINT}`,
            requestedData
          )
          .then((res) => {
            if (res.status === 200) {
              const idx = addedBook.findIndex((e) => e.id === id);
              arr[idx].quantity = quantity + 1;
              setAddedBook(arr);
              setBackup(arr);
            }
          })
          .catch((err) => console.log(err));
        break;

      case "dec":
        requestedData = {
          id: id,
          bookId: bookId,
          userId: userId,
          quantity: quantity - 1,
        };
        await axios
          .put(
            `https://book-e-sell-node-api.vercel.app/${CART_UPDATE_END_POINT}`,
            requestedData
          )
          .then((res) => {
            if (res.status === 200) {
              const idx = addedBook.findIndex((e) => e.id === id);
              arr[idx].quantity = quantity - 1;
              setAddedBook(arr);
              setBackup(arr);
            }
          })
          .catch((err) => console.log(err));
        break;
      default:
        break;
    }
  };

  const handleOrder = async () => {
    setAddedBook(backup);
    const userId = _user.id;
    const cartIds = backup.map((item) => item.id);
    // console.log(cartId);
    const requestedData = {
      userId: userId,
      cartIds: cartIds,
    };
    await axios
      .post(
        `https://book-e-sell-node-api.vercel.app/${CART_PLACE_ORDER_END_POINT}`,
        requestedData
      )
      .then((res) => {
        if (res.data.code === 200) {
          console.log("order placed");
          toast.success("Order Placed", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setAddedBook([]);
          setBackup([]);
        }
      })
      .catch((err) => console.log(err));
  };
  const getData = async () => {
    const userId = _user.id;
    await axios
      .get(`https://book-e-sell-node-api.vercel.app/${CART_END_POINT}${userId}`)
      .then((res) => {
        if (res.status === 200) {
          setAddedBook(res.data.result);
          setBackup(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("added book", addedBook);
  console.log("backup", backup);

  return (
    <div className={appStyle.containerDiv}>
      <h2 className={appStyle.heading}>
        <img
          src={`${process.env.REACT_APP_URL}cart.png`}
          style={{ height: "1.625rem" }}
          alt="cart"
        />
        Cart
      </h2>
      <div
        style={{
          display: "flex",
          width: "80%",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              name="cartSearch"
              // value={searchRef.current.value}
              type="text"
              placeholder="Search"
              ref={searchRef}
              style={{
                padding: ".5rem 1.5rem",
                borderRadius: ".5rem",
                border: "0",
                outline: "0",
                fontWeight: "500",
              }}
              // onChange={(e) => {
              //   setSearch(e.target.value.trim());
              // }}
            />
            <p
              style={{
                position: "absolute",
                top: "-.2rem",
                right: ".5rem",
                color: "black",
                fontSize: "1.5rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => {
                setAddedBook(backup);
                searchRef.current.value = "";
              }}
            >
              ×
            </p>
          </div>
          <div
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: ".5rem",
              background: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleSearch}
          >
            <img
              src={`${process.env.REACT_APP_URL}search.png`}
              style={{ width: "50%" }}
              alt="search"
            />
          </div>
        </div>
        <button className={appStyle.placeOrderBtn} onClick={handleOrder}>
          Place Order
        </button>
      </div>
      {addedBook.length > 0 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            flexFlow: "column",
          }}
        >
          {addedBook.map((book, i) => (
            <div
              key={i}
              style={{
                width: "80%",
                padding: "1rem",
                backgroundColor: "#fff",
                borderRadius: ".5rem",
              }}
            >
              <SingleCartBook
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                index={i}
                data={book}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          <p>Cart is Empty</p>
        </div>
      )}
    </div>
  );
}
export default Cart;
