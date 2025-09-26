import React from "react";
import BorrowedList from "../components/BorrowedList";

export default function Borrowed() {
  return (
    <div className="page">
        <h1>Your Borrowed Books</h1>
      <BorrowedList />
    </div>
  );
}