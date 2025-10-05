import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { books, users } from "./mockData";

interface Book {
  id: string | number;
  title: string;
  author?: string;
  stock: number;
}

interface BorrowedBook {
  userId: string;
  bookId: string;
  title: string;
  took: boolean;
  userName: string;
}

interface User {
  id: string;
  name: string;
  role: string;
}

export interface LibraryState {
  books: Book[];
  borrowed: BorrowedBook[];
  user: User | null;
  loading: boolean;
  tostMsg: { msg: string; type: string };
  page: number;
  pageSize: number;
  totalBooks: number;
}

 const initialState: LibraryState = {
  books: books,
  borrowed: [],
  user: null,
  loading: false,
  tostMsg: { msg: '', type: '' },
  page: 1,
  pageSize: 10,
  totalBooks: books.length,
};

interface BorrowPayload {
  userId: string;
  bookId: string | number;
  name?: string;
  userName?: string;
}

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    loginUserRequest: (state, action: PayloadAction<{ email: string; password: string; role: string }>) => {
      state.loading = true;
    },
    loginUserSuccess: (state, action: PayloadAction<User>) => {
      const { id, name, role } = action.payload;
      state.user = { id, name, role };
    },
    logoutUserRequest: (state) => {
      state.user = null;
    },
    borrowBookRequest: (state, action: PayloadAction<BorrowPayload>) => {
      state.loading = true;
    },
    borrowBookSuccess: (state, action: PayloadAction<{ userId: string; bookId: string; name: string; userName: string }>) => {
      const { userId, bookId, name, userName } = action.payload;
      const book = state.books.find((b) => b.id === bookId);
      if (book) {
        book.stock -= 1;
      }
      state.borrowed.push({ userId, bookId, title: name, took: true, userName });
      state.loading = false;
    },
    returnBookRequest: (state, action: PayloadAction<{ userId: string | number; bookId: string | number } | Array<{ userId: string | number; bookId: string | number }>>) => {
      state.loading = true;
    },
    returnBookSuccess: (state, action: PayloadAction<{ userId: string; bookId: string } | Array<{ userId: string; bookId: string }>>) => {
      const payload = Array.isArray(action.payload) ? action.payload : [action.payload];

      payload.forEach(({ userId, bookId }) => {
        state.borrowed = state.borrowed.filter(
          (b) => !(b.userId === userId && b.bookId === bookId)
        );

        const book = state.books.find((b) => b.id === bookId);
        if (book) book.stock += 1;
      });

      state.loading = false;
    },
    addBookRequest: (state, action: PayloadAction<{ title: string; stock: number }>) => {
      state.loading = true;
    },
    addBookSuccess: (state, action: PayloadAction<Omit<Book, 'id'>>) => {
      state.books.push({ id: Date.now().toString(), ...action.payload });
      state.loading = false;
    },
    actionFailure: (state, action: PayloadAction<{ msg: string; type: string }>) => {
      state.tostMsg = { msg: action.payload.msg, type: 'error' };
      state.loading = false;
    },
    actionSuccess: (state, action: PayloadAction<{ msg: string; type: string }>) => {
      state.tostMsg = { msg: action.payload.msg, type: 'success' };
      state.loading = false;
    },
  },
});

export const {
  borrowBookRequest,
  borrowBookSuccess,
  returnBookRequest,
  returnBookSuccess,
  addBookRequest,
  loginUserRequest,
  logoutUserRequest,
  addBookSuccess,
  actionFailure,
  actionSuccess,
  loginUserSuccess,
} = librarySlice.actions;

export default librarySlice.reducer;
