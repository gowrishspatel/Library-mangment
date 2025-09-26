import React from "react";
import BookList from "../components/BookList";

export default function Home() {
  
  return (
    <div className="page">
      <h1>Welcome to the Library</h1>
      <BookList />
    </div>
  );
}
