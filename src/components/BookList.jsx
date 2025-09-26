import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomTable from "./customComponents/CustomTable";
import { actionFailure, borrowBookRequest } from "../features/library/librarySlice";
import CustomDialog from "./customComponents/CustomDialog";
import { users } from "../features/library/mockData";

export default function BookList() {
  const books = useSelector((state) => state.library.books || []);
  const dispatch = useDispatch();
  const { user, borrowed } = useSelector((state) => state.library);

  console.log(borrowed,"borrowed books");
  

  const [localBorrowed, setLocalBorrowed] = useState({});
  const [inProgress, setInProgress] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBorrower, setSelectedBorrower] = useState("");

  useEffect(() => {
    const map = {};
    if(books.length === 0) return;

    books?.forEach((b) => {
      map[b.id] = !!b.borrowed || !!b.isBorrowed || !!b.checkedOut;
    });
    setLocalBorrowed(map);
    setInProgress((prev) => {
      const next = { ...prev };
      books?.forEach((b) => {
        if (next[b.id]) delete next[b.id];
      });
      return next;
    });
  }, [books]);

  const handleActionBorrow = (action, row) => {
    const id = row?.id;
    const name = row?.title;

    const alreadyBorrowed = !!localBorrowed[id];
    const book = books?.find((b) => b.id === id) || {};
    const baseCopies = book?.stock ?? 0;
    const copiesRemaining = Math.max(0, baseCopies - (localBorrowed[id] ? 1 : 0));

    if (alreadyBorrowed || copiesRemaining <= 0) return;

    setInProgress((p) => ({ ...p, [id]: true }));
    setLocalBorrowed((p) => ({ ...p, [id]: true }));

    dispatch(borrowBookRequest({ userId: user?.id, bookId: id, name: name, userName: user?.name }));

    setTimeout(() => {
      setInProgress((p) => {
        const next = { ...p };
        delete next[id];
        return next;
      });
    }, 3000);
  };

  const handleActionAssign = (action, row) => {
    setSelectedBook(row);
    setDialogOpen(true);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedBorrower || !selectedBook) {
      dispatch(actionFailure("Please select both borrower and book"));
      return;
    }
    const borrower = users.find((u) => u.id === parseInt(selectedBorrower));
    dispatch(borrowBookRequest({ userId: selectedBorrower, bookId: selectedBook.id, name: selectedBook.title, userName: borrower.name }));
    // dispatch(borrowBookRequest({borrowerId: selectedBorrower, bookId: selectedBook}));
    setDialogOpen(false);
    setSelectedBook(null);
    setSelectedBorrower("");
  }

  const onChangeBorrower = (e) => {
      setSelectedBorrower(e.target.value)
    };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedBook(null);
  }

  const baseColumns = [
    { header: "ID", accessor: "id" },
    { header: "Title", accessor: "title" },
    { header: "Author", accessor: "author" },
    { header: "Stock", accessor: "stock" },
  ];

  const columns = [...baseColumns];

  if (user && (user.role === "user" || user.role === "admin")) {
  columns.push({
    header: "Actions",
    cell: (row) => {
      const busy = !!inProgress[row.id];

      // check if current user has borrowed this book
      const borrowedByUser = borrowed.find(
        (b) => b.bookId === row.id && b.userId === user.id && b.userName === user.name
      );

      const hasBorrowed = !!borrowedByUser;
      const baseCopies =
        row.availableCopies ?? row.copies ?? row.totalCopies ?? row.stock ?? 0;
      const copiesRemaining = Math.max(
        0,
        baseCopies - (localBorrowed[row.id] ? 1 : 0)
      );

      const disabled = busy || copiesRemaining <= 0;

      return (
        <div className="actions-cell">
          {/* Admin: Assign button if stock > 0 */}
          {user?.role === "admin" && row?.stock > 0 && (
            <button
              className="action btn"
              onClick={() => handleActionAssign("assign", row)}
              disabled={disabled}
              aria-label={`Assign ${row.title || row.name}`}
            >
              Assign
            </button>
          )}

          {/* Borrow / Borrowed button */}
          {user?.role === "user" && (
            <button
              className="action btn"
              onClick={() => handleActionBorrow("borrow", row)}
              disabled={hasBorrowed || disabled}
              aria-label={`Borrow ${row.title || row.name}`}
            >
              {hasBorrowed ? "Borrowed" : "Borrow"}
            </button>
          )}

          {/* Admin borrow option */}
          {user?.role === "admin" && row?.stock > 0 && !hasBorrowed && (
            <button
              className="action btn"
              onClick={() => handleActionBorrow("borrow", row)}
              disabled={disabled}
              aria-label={`Borrow ${row.title || row.name}`}
            >
              Borrow
            </button>
          )}
        </div>
      );
    },
  });
}

  return (
    <>{dialogOpen && (
      <CustomDialog
        borrowers={users}
        handleSubmit={handleFormSubmit}
        onClose={handleDialogClose}
        setSelectedBook = {setSelectedBook}
        selectedBook ={selectedBook}
        selectedBorrower ={selectedBorrower}
        onChangeBorrower={onChangeBorrower}
      />
    )}
      <div className="container">
        <h2>Library Books</h2>
        <CustomTable columns={columns} data={books} rowKey="id" />
      </div>
    </>
  );
}