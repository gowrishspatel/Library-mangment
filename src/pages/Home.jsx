import React from "react";
import BookList from "../components/BookList";

export default function Home() {
  
  return (
    <div className="home-page">
      <h1>Welcome to the Library</h1>
      <BookList />
    </div>
  );
}
