import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBookRequest } from "../features/library/librarySlice";
import CustomInput from "./customComponents/CustomInput";

export default function AdminPanel() {
  const [title, setTitle] = useState("");
  const [stock, setStock] = useState(1);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!title || stock <= 0) return alert("Invalid input");
    dispatch(addBookRequest({ title, stock }));
    setTitle("");
    setStock(1);
  };

  return (
    <div className="container">
      <h2>Add Books</h2>
      <div className="admin-form">
        <CustomInput
          className="admin-input"
          label="Book Title:"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter book title"
          required
        />

        <CustomInput
          className="admin-input"
          label="Stock:"
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          placeholder="Enter stock quantity"
          required
        />
        <button className="btn" onClick={handleSubmit}>Add Book</button>
      </div>
    </div>
  );
}