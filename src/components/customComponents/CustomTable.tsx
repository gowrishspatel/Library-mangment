import React, { useState } from "react";

export interface CustomTableProps<T = any> {
  columns: Array<{
    header: string;
    accessor?: keyof T | string;
    cell?: (row: T) => React.ReactNode;
  }>;
  data: T[];
  className?: string;
  pageSize?: number;
  returnAll?: boolean;
  handleReturnAll?: () => void;
}

export default function CustomTable(props: CustomTableProps) {
  const {
    columns = [],
    data = [],
    className = "",
    pageSize = 10,
    returnAll = false,
    handleReturnAll = () => { } } = props;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(data.length / pageSize);

  const pagedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <>
      <div className="table-wrap">
        {returnAll && <button className="btn-return" onClick={() => { handleReturnAll() }}>
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
                <tr key={(row as any).id || rowIndex}>
                  {columns.map((col, colIndex) => {
                    let cellContent: React.ReactNode = "-";

                    if (typeof col?.cell === "function") {
                      cellContent = col.cell(row);
                    } else if (col?.accessor) {
                      if (typeof col.accessor === "string") {
                        cellContent = col.accessor
                          .split(".")
                          .reduce((acc: any, key: string) => acc?.[key], row) ?? "-";
                      } else {
                        cellContent = (row as any)[col.accessor] ?? "-";
                      }
                    }

                    const showTooltip = typeof cellContent === "string" && cellContent.length > 10;

                    return (
                      <td key={colIndex}>
                        <div className="cell-ellipsis" title={showTooltip ? (cellContent as string) : ""}>
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
