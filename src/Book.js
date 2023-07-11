import { React, useState, useEffect, useRef } from "react";
import appStyle from "./AppStyle.module.css";
import axios from "axios";
import SingleBook from "./SingleBook";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { Formik } from "formik";

const Book = () => {
  const searchRef = useRef();

  const GET_ALL_BOOKS_END_POINT = "api/book/all";
  const DELETE_BOOK_END_POINT = "api/book?id=";
  const UPDATE_BOOK_END_POINT = "api/book";
  const CATEGORY_END_POINT = "api/category/all";
  const ADD_BOOK_END_POINT = "api/book";
  const [books, setBooks] = useState([]);
  const [backup, setBackup] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [addBookDialog, setAddBookDialog] = useState(false);
  const [base, setBase] = useState("");
  const [initialValues, setInitialValues] = useState({
    id: 0,
    name: "",
    price: 0,
    category: "",
    categoryId: 0,
    description: "",
    base64: "",
  });

  const initialValuesAddBook = {
    name: "",
    description: "",
    price: 0,
    category: "",
    base64image: "",
  };

  const convert64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  if (initialValues.base64.length > 0) {
    setBase(initialValues.base64);
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name cannot be empty")
      .min(3, "Name must be of 3 or more charater"),
    price: Yup.number()
      .required("Price cannot be empty")
      .min(10, "Price must be greater than 10"),
    category: Yup.string().required("Category must be seleted"),
    description: Yup.string()
      .required("Desription cannot be empty")
      .min(10, "Description must be of minimum 10 characters"),
    base64image: Yup.string().required("Cover page must be uploaded"),
  });
  const getData = async () => {
    await axios
      .get(`https://book-e-sell-node-api.vercel.app/${GET_ALL_BOOKS_END_POINT}`)
      .then((res) => {
        console.log("book", res);
        if (res.data.code === 200) {
          setBooks(res.data.result);
          setBackup(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCategory = async () => {
    await axios
      .get(`https://book-e-sell-node-api.vercel.app/${CATEGORY_END_POINT}`)
      .then((res) => {
        if (res.data.code === 200) {
          setCategories(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (itemId) => {
    let arr = [...books];
    await axios
      .delete(
        `https://book-e-sell-node-api.vercel.app/${DELETE_BOOK_END_POINT}${itemId}`
      )
      .then((res) => {
        if (res.status === 200) {
          const idx = books.findIndex((e) => e.id === itemId);
          arr.splice(idx, 1);
          setBooks(arr);
          setBackup(arr);
          console.log("entry deleted");
          toast.success("Book deleted Successfully", {
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
        console.log(err);
        if (err.response.data.code === 403) {
          toast.error("This book is not added by you", {
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
      });
  };

  const handleUpdate = (book) => {
    let update = {
      id: book.id,
      name: book.name,
      price: book.price,
      description: book.description,
      category: book.category,
      categoryId: book.categoryId,
    };
    let image = {
      base64image: book.base64image,
    };
    setInitialValues((initialValues) => ({ ...initialValues, ...update }));
    setInitialValues((initialValues) => ({
      ...initialValues,
      ...image,
    }));
    setBase(book.base64image);
    setOpenDialog(true);
  };
  const onBookUpdateForm = async (values) => {
    const idx = categories.findIndex((e) => e.name === values.category);

    const categoryId = categories[idx].id;

    let requestedData = {
      id: values.id,
      name: values.name,
      description: values.description,
      price: values.price,
      categoryId: categoryId,
      base64image: values.base64image,
    };

    console.log(requestedData);
    await axios
      .put(
        `https://book-e-sell-node-api.vercel.app/${UPDATE_BOOK_END_POINT}`,
        requestedData
      )
      .then((res) => {
        if (res.data.code === 200) {
          toast.success("Book updated successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setOpenDialog(false);
          setBase("");
        }
      })
      .catch((err) => {
        console.log(err);
        setBase("");
      });
  };
  const onAddBookForm = (values) => {
    const idx = categories.findIndex((e) => e.name === values.category);
    // console.log(idx);
    const categoryId = categories[idx].id;
    let requestedData = {
      name: values.name,
      description: values.description,
      price: values.price,
      categoryId: categoryId,
      base64image: values.base64image,
    };

    console.log("requested data", requestedData);

    axios
      .post(
        `https://book-e-sell-node-api.vercel.app/${ADD_BOOK_END_POINT}`,
        requestedData
      )
      .then((res) => {
        if (res.data.code === 200) {
          toast.success("Book Added successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setBase("");
          setAddBookDialog(false);
        }
      });
  };
  const handleSearch = () => {
    const search = searchRef.current.value;
    let arr = [...books];
    if (search === "") {
      setBooks(backup);
    }
    arr = books.filter((item) => {
      if (item.name.toLowerCase().includes(search.toLowerCase())) {
        return item;
      }
    });
    setBooks(arr);
  };
  console.log("initial values", initialValues);
  useEffect(() => {
    getData();
    getCategory();
  }, []);
  console.log("category", categories);
  return (
    <div className={appStyle.containerDiv}>
      {/* update book form */}
      {openDialog ? (
        <div className={appStyle.dialog_container}>
          <div className={appStyle.loginCon}>
            <div className={appStyle.loginHead}>
              <p>Update Book</p>
              <div className={appStyle.line}></div>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onBookUpdateForm}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                handleBlur,
              }) => (
                <form onSubmit={handleSubmit} className={appStyle.form}>
                  <TextField
                    error={!!errors.name}
                    value={values.name}
                    id="name"
                    name="name"
                    label="Book Name"
                    variant="outlined"
                    type="text"
                    sx={{ width: "80%" }}
                    // value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.name && (
                    <span
                      style={{
                        color: "red",
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "80%",
                        marginTop: "-.5rem",
                      }}
                    >
                      {errors.name}
                    </span>
                  )}
                  <TextField
                    error={!!errors.price}
                    id="price"
                    name="price"
                    value={values.price}
                    label="Price"
                    variant="outlined"
                    type="number"
                    sx={{ width: "80%" }}
                    // value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.price && (
                    <span
                      style={{
                        color: "red",
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "80%",
                        marginTop: "-.5rem",
                      }}
                    >
                      {errors.price}
                    </span>
                  )}
                  <FormControl sx={{ width: "80%" }} error={!!errors.category}>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                      name="category"
                      labelId="category"
                      id="category"
                      label="Category"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.category}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {touched.category && (
                    <span
                      style={{
                        color: "red",
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "80%",
                        marginTop: "-.5rem",
                      }}
                    >
                      {errors.category}
                    </span>
                  )}
                  {values.base64image.length !== 0 ? (
                    <div
                      style={{
                        width: "80%",
                        padding: "1.03125rem .875rem",
                        border: "1px solid #999",
                        borderRadius: ".3rem",
                        display: "flex",
                        gap: "2rem",
                        color: "black",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={base}
                        alt="cover"
                        style={{
                          height: "5rem",
                          objectFit: "cover",
                        }}
                      />
                      <p>{values.name}</p>
                      <span
                        onClick={() => {
                          values.base64 = "";
                          setBase("");
                        }}
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          cursor: "pointer",
                        }}
                      >
                        X
                      </span>
                    </div>
                  ) : (
                    <TextField
                      error={!!errors.base64}
                      id="base64"
                      name="base64"
                      variant="outlined"
                      type="file"
                      sx={{ width: "80%" }}
                      onBlur={handleBlur}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        const ext = file.name.split(".").pop();
                        if (file.size / 1024 > 10) {
                          toast.warn("File size cannot exceed 10KB", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                          e.target.value = "";
                          values.base64 = "";
                        } else if (
                          ext !== "jpg" &&
                          ext !== "jpeg" &&
                          ext !== "png"
                        ) {
                          toast.warn("Only Images are allowed", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                          e.target.value = "";
                          values.base64 = "";
                        } else {
                          const base64 = await convert64(file);
                          setBase(base64);
                          console.log(base64);
                          values.base64 = base64;
                        }
                      }}
                    ></TextField>
                  )}
                  <span
                    style={{
                      color: "red",
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "80%",
                      marginTop: "-.5rem",
                    }}
                  >
                    {errors.base64}
                  </span>
                  <Textarea
                    id="description"
                    variant="outlined"
                    error={!!errors.description}
                    value={values.description}
                    name="description"
                    placeholder="Book Description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="lg"
                    sx={{ width: "80%", height: "6rem" }}
                  />
                  {touched.description && (
                    <span
                      style={{
                        color: "red",
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "80%",
                        marginTop: "-.5rem",
                      }}
                    >
                      {errors.description}
                    </span>
                  )}
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      flex: "1",
                      width: "80%",
                      justifyContent: "space-between",
                      marginTop: "2rem",
                    }}
                  >
                    <button type="submit" className={appStyle.bookEditBtn}>
                      Save
                    </button>
                    <button
                      className={appStyle.bookDeleteBtn}
                      onClick={() => {
                        setOpenDialog(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* add book form */}
      {addBookDialog ? (
        <div className={appStyle.dialog_container}>
          <div className={appStyle.loginCon}>
            <div className={appStyle.loginHead}>
              <p>Add Book</p>
              <div className={appStyle.line}></div>
            </div>
            <Formik
              initialValues={initialValuesAddBook}
              validationSchema={validationSchema}
              onSubmit={onAddBookForm}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                handleBlur,
              }) => (
                <form onSubmit={handleSubmit} className={appStyle.form}>
                  <TextField
                    error={!!errors.name}
                    value={values.name}
                    id="name"
                    name="name"
                    label="Book Name"
                    variant="outlined"
                    type="text"
                    sx={{ width: "80%" }}
                    // value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.name && (
                    <span
                      style={{
                        color: "red",
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "80%",
                        marginTop: "-.5rem",
                      }}
                    >
                      {errors.name}
                    </span>
                  )}
                  <TextField
                    error={!!errors.price}
                    id="price"
                    name="price"
                    value={values.price}
                    label="Price"
                    variant="outlined"
                    type="number"
                    sx={{ width: "80%" }}
                    // value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.price && (
                    <span
                      style={{
                        color: "red",
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "80%",
                        marginTop: "-.5rem",
                      }}
                    >
                      {errors.price}
                    </span>
                  )}
                  <FormControl sx={{ width: "80%" }} error={!!errors.category}>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                      name="category"
                      labelId="category"
                      id="category"
                      label="Category"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.category}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {touched.category && (
                    <span
                      style={{
                        color: "red",
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "80%",
                        marginTop: "-.5rem",
                      }}
                    >
                      {errors.category}
                    </span>
                  )}
                  {base.length !== 0 ? (
                    <div
                      style={{
                        width: "80%",
                        padding: "1.03125rem .875rem",
                        border: "1px solid #999",
                        borderRadius: ".3rem",
                        display: "flex",
                        gap: "2rem",
                        color: "black",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={base}
                        alt="cover"
                        style={{
                          height: "5rem",
                          objectFit: "cover",
                        }}
                      />
                      <p>{values.name}</p>
                      <span
                        onClick={() => {
                          values.base64image = "";
                          setBase("");
                        }}
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          cursor: "pointer",
                        }}
                      >
                        X
                      </span>
                    </div>
                  ) : (
                    <TextField
                      error={!!errors.base64image}
                      id="base64"
                      name="base64"
                      variant="outlined"
                      type="file"
                      sx={{ width: "80%" }}
                      onBlur={handleBlur}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        const ext = file.name.split(".").pop();
                        if (file.size / 1024 > 50) {
                          toast.warn("File size cannot exceed 50KB", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                          e.target.value = "";
                          values.base64image = "";
                        } else if (
                          ext !== "jpg" &&
                          ext !== "jpeg" &&
                          ext !== "png"
                        ) {
                          toast.warn("Only Images are allowed", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                          e.target.value = "";
                          values.base64image = "";
                        } else {
                          const base64 = await convert64(file);
                          setBase(base64);
                          console.log(base64);
                          values.base64image = base64;
                        }
                      }}
                    ></TextField>
                  )}
                  <span
                    style={{
                      color: "red",
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "80%",
                      marginTop: "-.5rem",
                    }}
                  >
                    {errors.base64image}
                  </span>
                  <Textarea
                    id="description"
                    variant="outlined"
                    error={!!errors.description}
                    value={values.description}
                    name="description"
                    placeholder="Book Description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="lg"
                    sx={{
                      width: "80%",
                      height: "6rem",
                      backgroundColor: "transparent",
                    }}
                  />
                  {touched.description && (
                    <span
                      style={{
                        color: "red",
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "80%",
                        marginTop: "-.5rem",
                      }}
                    >
                      {errors.description}
                    </span>
                  )}
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      flex: "1",
                      width: "80%",
                      justifyContent: "space-between",
                      marginTop: "2rem",
                    }}
                  >
                    <button type="submit" className={appStyle.bookEditBtn}>
                      Save
                    </button>
                    <button
                      className={appStyle.bookDeleteBtn}
                      onClick={() => {
                        setBase("");
                        setAddBookDialog(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      ) : (
        <></>
      )}

      <h2 className={appStyle.heading}>Book</h2>
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
              name="bookSearch"
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
            // setSearch(e.target.value.trim());
            // }}
            />
            <p
              style={{
                position: "absolute",
                top: "-.15rem",
                right: ".5rem",
                color: "black",
                fontSize: "1.5rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => {
                setBooks(backup);
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
        <button
          className={appStyle.placeOrderBtn}
          onClick={() => {
            setAddBookDialog(true);
          }}
        >
          Add Book
        </button>
      </div>
      {books.length > 0 ? (
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
          {books.map((book, i) => (
            <div
              key={i}
              style={{
                width: "80%",
                padding: "1rem",
                backgroundColor: "#fff",
                borderRadius: ".5rem",
              }}
            >
              <SingleBook
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                index={i}
                data={book}
              />
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Book;
