import { useDispatch, useSelector } from "react-redux";
import CustomTable from "./customComponents/CustomTable";
import { returnBookRequest } from "../features/library/librarySlice";
import { RootState } from "../app/store";

interface BorrowedBook {
  userId: string | number;
  bookId: string | number;
  title: string;
  userName: string;
}

export default function BorrowedList() {
  const dispatch = useDispatch();
  const { borrowed, user } = useSelector((state: RootState) => state.library);

  interface handelReturnProps{
    userId: string | number;
    bookId: string | number
  }

  const handleReturn = (b: handelReturnProps) => {
    dispatch(returnBookRequest({ userId: b.userId, bookId: b.bookId }));
  };

  let userBorrowedBooks: BorrowedBook[] = [];
  if (user && (user?.role === "user")) {
    userBorrowedBooks = borrowed.filter((b: any) => b.userId == user?.id);
  } else {
    userBorrowedBooks = borrowed;
  }

  const handleReturnAll = () => {
    const booksToReturn = userBorrowedBooks.map((b: any) => ({
      userId: b.userId,
      bookId: b.bookId,
    }));
    dispatch(returnBookRequest(booksToReturn));
  };

  const columns = [
    { header: "Book ID", accessor: "bookId" },
    { header: "Title", accessor: "title" },
    { header: "Borrower", accessor: "userName" },
    {
      header: "Action",
      cell: (row: any) => (
        <button className="btn small" onClick={() => handleReturn(row)}>
          Return
        </button>
      ),
    },
  ];

  return (
    <div className="container">
      {userBorrowedBooks.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
          <p>Currently No books borrowed</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: "column" }}>
          <CustomTable returnAll={true} handleReturnAll={handleReturnAll} columns={columns} data={userBorrowedBooks} pageSize={10} />
        </div>
      )}
    </div>
  );
}
