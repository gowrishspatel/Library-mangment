import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBookRequest } from "../features/library/librarySlice";

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
      <input
        placeholder="Book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
      />
      <button className="btn" onClick={handleSubmit}>Add Book</button>
    </div>
  );
}