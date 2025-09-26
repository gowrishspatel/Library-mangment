import { put, takeLatest, delay, select } from "redux-saga/effects";
import {
  borrowBookRequest, borrowBookSuccess,
  returnBookRequest, returnBookSuccess,
  addBookRequest, addBookSuccess,
  actionFailure,
} from "./librarySlice";

function* borrowBookSaga(action) {
  try {
    yield delay(500); // simulate API delay
    const { userId, bookId, name , userName} = action.payload;
    const state = yield select((state) => state.library);
    const book = state.books.find((b) => b.id == bookId);

    if (!book || book.stock <= 0) {
      yield put(actionFailure("Book not available"));
      return;
    }

    const userBorrowed = state.borrowed.filter((b) => b.userId == userId);
    if (userBorrowed.length >= 2) {
      yield put(actionFailure(`Borrow limit reached for the user ${userName}`));
      return;
    }

    const alreadyBorrowed = userBorrowed.some((b) => b.bookId == bookId);
    if (alreadyBorrowed) {
      yield put(actionFailure("You already borrowed this book:cannot borrow same book twice"));
      return;
    }

    yield put(borrowBookSuccess({ userId, bookId, name, userName}));
  } catch (e) {
    yield put(actionFailure(e.message));
  }
}


function* returnBookSaga(action) {
  try {
    yield delay(500);
    yield put(returnBookSuccess(action.payload));
  } catch (err) {
    yield put(actionFailure(err.message));
  }
}

function* addBookSaga(action) {
  try {
    yield delay(500);
    yield put(addBookSuccess(action.payload));
  } catch (err) {
    yield put(actionFailure(err.message));
  }
}

export default function* librarySaga() {
  yield takeLatest(borrowBookRequest.type, borrowBookSaga);
  yield takeLatest(returnBookRequest.type, returnBookSaga);
  yield takeLatest(addBookRequest.type, addBookSaga);
}