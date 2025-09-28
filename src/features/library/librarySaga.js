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

function* borrowBookSaga(action) {
  try {
    yield delay(500); // simulate API delay
    const { userId, bookId, name, userName } = action.payload;
    const state = yield select((state) => state.library);
    const book = state.books.find((b) => b.id == bookId);

    if (!book || book.stock <= 0) {
      yield put(actionFailure({ msg: "Book not available", type: "error" }));
      return;
    }

    const userBorrowed = state.borrowed.filter((b) => b.userId == userId);
    if (userBorrowed.length >= 2) {
      yield put(actionFailure({ msg: `Borrow limit reached for the user ${userName}`, type: "error" }));
      return;
    }

    const alreadyBorrowed = userBorrowed.some((b) => b.bookId == bookId);
    if (alreadyBorrowed) {
      yield put(actionFailure({ msg: "You already borrowed this book:cannot borrow same book twice", type: "error" }));
      return;
    }

    yield put(borrowBookSuccess({ userId, bookId, name, userName }));
    yield put(actionSuccess({ msg: "Book borrowed successfully", type: "success" }));
  } catch (e) {
    yield put(actionFailure({ msg: e.message, type: "error" }));
  }
}


function* returnBookSaga(action) {
  try {
    yield delay(500);
    yield put(returnBookSuccess(action.payload));
    yield put(actionSuccess({ msg: "Book returned successfully", type: "success" }));
  } catch (err) {
    yield put(actionFailure({ msg: err.message, type: "error" }));
  }
}

function* addBookSaga(action) {
  try {
    yield delay(500);
    yield put(addBookSuccess(action.payload));
    yield put(actionSuccess({ msg: "Book added successfully", type: "success" }));
  } catch (err) {
    yield put(actionFailure({ msg: err.message, type: "error" }));
  }
}

function* loginUserSaga(action) {
  try {
    yield delay(500);
    const { email, password, role } = action.payload;
    const foundUser = validateUser(email, password, role);
    let user;
    if (foundUser !== null) {
        user = { id: foundUser.id, role: foundUser.role, name: foundUser.name };
        yield put(loginUserSuccess(user));
        yield put (actionSuccess({msg: "Login Success", type: "success"}));
      } else {
        yield put (actionFailure({msg: "Login Failed", type: "error"}));
      }
  } catch (e) {
    yield put(actionFailure({ msg: e.message, type: "error" }));
  }
}

export default function* librarySaga() {
  yield takeLatest(borrowBookRequest.type, borrowBookSaga);
  yield takeLatest(returnBookRequest.type, returnBookSaga);
  yield takeLatest(addBookRequest.type, addBookSaga);
  yield takeLatest(loginUserRequest.type, loginUserSaga);
}