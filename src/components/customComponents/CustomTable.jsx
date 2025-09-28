import React, { useState } from "react";

export default function CustomTable({
  columns = [],
  data = [],
  className = "",
  pageSize = 10,
  returnAll = false,
  handleReturnAll = () => {},
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);

  const pagedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <>
      <div className="table-wrap">
        {returnAll && <button className="btn-return" onClick={() => {handleReturnAll()}}>
            Return All
          </button>}
        <table className={`book-table custom-table ${className}`}>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: "center", padding: 16 }}>
                  No records
                </td>
              </tr>
            ) : (
              pagedData.map((row, rowIndex) => (
                <tr key={row.id || rowIndex}>
                  {columns.map((col, colIndex) => {
                    let cellContent = "-";

                    if (typeof col.cell === "function") {
                      cellContent = col.cell(row);
                    } else if (col.accessor) {
                      cellContent =
                        col.accessor.split(".").reduce((acc, key) => acc?.[key], row) ?? "-";
                    }

                    const showTooltip =
                      typeof cellContent === "string" && cellContent.length > 10;

                    return (
                      <td key={colIndex}>
                        <div className="cell-ellipsis" title={showTooltip ? cellContent : ""}>
                          {cellContent}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <button className="prev" onClick={goPrev} disabled={currentPage === 1}>
            Prev
          </button>
          <span style={{ margin: "0 1rem" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button className="nxt" onClick={goNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </>
  );
}
