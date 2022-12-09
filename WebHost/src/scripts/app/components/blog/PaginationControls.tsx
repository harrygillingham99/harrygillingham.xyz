import React from "react";

const PaginationControls: React.FC<{
  page: number;
  pageSize: number;
  hasNextPage: boolean;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}> = ({ page, pageSize, setPage, setPageSize, hasNextPage }) => {
  return (
    <div className="flex flex-row justify-center mt-5">
      <div className="btn-group">
        <button
          className="btn"
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          «
        </button>
        <button className="btn">Page {page + 1}</button>
        <button
          className="btn"
          disabled={!hasNextPage}
          onClick={() => setPage(page + 1)}
        >
          »
        </button>
      </div>

      <select
        onChange={(evt) => setPageSize(+evt.target.value)}
        value={pageSize}
        className="select select-ghost max-w-xs ml-2"
      >
        {[25, 50, 75, 100].map((val, i) => (
          <option value={val} key={`pageSize_${val}_${i}`}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PaginationControls;
