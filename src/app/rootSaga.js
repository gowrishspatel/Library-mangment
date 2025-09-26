import { all } from "redux-saga/effects";
import librarySaga from "../features/library/librarySaga";

export default function* rootSaga() {
  yield all([librarySaga()]);
}