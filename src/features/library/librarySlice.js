import { createSlice } from "@reduxjs/toolkit";
import { books, users } from "./mockData";
import { validateUser } from "../../utils";

const initialState = {
  books: books,
  borrowed: [],
  user: null,
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  totalBooks: books.length,
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { email, password, role } = action.payload;
      const foundUser = validateUser(email, password, role, users);
      if (foundUser?.length !== 0 && foundUser) {
        state.user = { id: foundUser.id, role: foundUser.role, name: foundUser.name };
        state.error = null;

      } else {
        state.error = "Invalid email or password or role";
      }
    },
    logoutUser: (state) => {
      state.user = null;
    },
    borrowBookRequest: (state, action) => {
      state.loading = true;
    },
    borrowBookSuccess: (state, action) => {
      const { userId, bookId, name, userName } = action.payload;
      const book = state.books.find((b) => b.id == bookId);
      book.stock -= 1;
      state.borrowed.push({ userId, bookId, title: name, took: true, userName: userName });
      state.loading = false;
    },
    returnBookRequest: (state, action) => {
      state.loading = true;
    },
    returnBookSuccess: (state, action) => {
      const payload = Array.isArray(action.payload) ? action.payload : [action.payload];

      payload.forEach(({ userId, bookId }) => {
        state.borrowed = state.borrowed.filter(
          (b) => !(b.userId == userId && b.bookId == bookId)
        );

        const book = state.books.find((b) => b.id == bookId);
        if (book) book.stock += 1;
      });

      state.loading = false;
    },

    addBookRequest: (state, action) => {
      state.loading = true;
    },
    addBookSuccess: (state, action) => {
      state.books.push({ id: Date.now(), ...action.payload });
      state.loading = false;
    },
    actionFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  borrowBookRequest, borrowBookSuccess, returnBookRequest, returnBookSuccess, addBookRequest, loginUser, logoutUser,
  addBookSuccess, actionFailure, } = librarySlice.actions;

export default librarySlice.reducer;