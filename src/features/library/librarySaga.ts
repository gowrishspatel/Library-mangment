import { put, takeLatest, delay, select } from "redux-saga/effects";
import {
  borrowBookRequest, borrowBookSuccess,
  returnBookRequest, returnBookSuccess,
  addBookRequest, addBookSuccess,
  actionFailure,
  actionSuccess,
  loginUserRequest,
  loginUserSuccess,
} from "./librarySlice";
import { validateUser } from "../../utils";
import { RootState } from "../../app/store";
import { LibraryState } from './librarySlice';

interface BorrowBookAction {
  type: string;
  payload: {
    userId: string;
    bookId: string;
    name: string;
    userName: string;
  };
}

interface ReturnBookAction {
  type: string;
  payload: {
    userId: string;
    bookId: string;
  };
}

interface AddBookAction {
  type: string;
  payload: {
    id: string;
    title: string;
    stock: number;
    author: string;
  };
}

interface LoginUserAction {
  type: string;
  payload: {
    email: string;
    password: string;
    role: string;
  };
}

function* borrowBookSaga(action: BorrowBookAction) {
  try {
    yield delay(500); // simulate API delay
    const { userId, bookId, name, userName } = action.payload;
    const state: LibraryState = yield select((state: RootState) => state.library);
    const book = state?.books.find((b: any) => b.id === bookId);

    if (!book || book.stock <= 0) {
      yield put(actionFailure({ msg: "Book not available", type: "error" }));
      return;
    }

    const userBorrowed = state?.borrowed.filter((b: any) => b.userId === userId);
    if (userBorrowed.length >= 2) {
      yield put(actionFailure({ msg: `Borrow limit reached for the user ${userName}`, type: "error" }));
      return;
    }

    const alreadyBorrowed = userBorrowed.some((b: any) => b.bookId === bookId);
    if (alreadyBorrowed) {
      yield put(actionFailure({ msg: "You already borrowed this book: cannot borrow same book twice", type: "error" }));
      return;
    }

    yield put(borrowBookSuccess({ userId, bookId, name, userName }));
    yield put(actionSuccess({ msg: "Book borrowed successfully", type: "success" }));
  } catch (e: unknown) {
    yield put(actionFailure({ msg: (e as Error).message, type: "error" }));
  }
}

function* returnBookSaga(action: ReturnBookAction) {
  try {
    yield delay(500);
    yield put(returnBookSuccess(action.payload));
    yield put(actionSuccess({ msg: "Book returned successfully", type: "success" }));
  } catch (err: unknown) {
    yield put(actionFailure({ msg: (err as Error).message, type: "error" }));
  }
}

function* addBookSaga(action: AddBookAction) {
  try {
    yield delay(500);
     const { id, ...bookWithoutId } = action.payload;
    yield put(addBookSuccess(bookWithoutId));
    yield put(actionSuccess({ msg: "Book added successfully", type: "success" }));
  } catch (err: unknown) {
    yield put(actionFailure({ msg: (err as Error).message, type: "error" }));
  }
}

function* loginUserSaga(action: LoginUserAction) {
  try {
    yield delay(500);
    const { email, password, role } = action.payload;
    const foundUser = validateUser(email, password, role);
    let user;
    if (foundUser !== null) {
      user = { id: String(foundUser.id), role: foundUser.role, name: foundUser.name };
      yield put(loginUserSuccess(user));
      yield put(actionSuccess({ msg: "Login Success", type: "success" }));
    } else {
      yield put(actionFailure({ msg: "Login Failed", type: "error" }));
    }
  } catch (e: unknown) {
    yield put(actionFailure({ msg: (e as Error).message, type: "error" }));
  }
}

export default function* librarySaga() {
  yield takeLatest(borrowBookRequest.type, borrowBookSaga);
  yield takeLatest(returnBookRequest.type, returnBookSaga);
  yield takeLatest(addBookRequest.type, addBookSaga);
  yield takeLatest(loginUserRequest.type, loginUserSaga);
}
