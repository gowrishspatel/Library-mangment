import { createSlice } from "@reduxjs/toolkit";
import { books, users } from "./mockData";
import { validateUser } from "../../utils";

const initialState = {
  books: books,
  borrowed: [],
  user: null,
  loading: false,
  tostMsg: { msg: '', type: '' },
  page: 1,
  pageSize: 10,
  totalBooks: books.length,
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    loginUserRequest: (state, action) => {
      state.loading = true;
    },
    loginUserSuccess: (state, action) => {
      const { id, name, role } = action.payload;
      state.user = { id, name, role };
    },
    logoutUserRequest: (state) => {
      state.user = {};
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
      state.tostMsg = { msg: action.payload.msg, type: 'error' };
      state.loading = false;
    },
    actionSuccess: (state, action) => {
      state.tostMsg = { msg: action?.payload?.msg, type: 'success' };
      state.loading = false;
    }
  },
});

export const {
  borrowBookRequest, borrowBookSuccess, returnBookRequest, returnBookSuccess, addBookRequest, loginUserRequest, logoutUserRequest,
  addBookSuccess, actionFailure, actionSuccess, loginUserSuccess } = librarySlice.actions;

export default librarySlice.reducer;