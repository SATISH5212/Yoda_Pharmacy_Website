interface PaginationProps {
  page: number;
  setPage: (val: number) => void;
  pageSize: number;
  setPageSize: (val: number) => void;
  totalPages: number;
}

export default function Pagination({
  page,
  setPage,
  pageSize,
  setPageSize,
  totalPages
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="w-full fixed bottom-0 rounded bg-gray-100 border-t border-gray-300">
      <div className="flex items-center justify-center gap-2 p-0.5 text-xs">
        <span>Result per page</span>
        <select
          className='border rounded p-0.5'
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          <option value={5}>5 pages</option>
          <option value={10}>10 pages</option>
          <option value={15}>15 pages</option>
        </select>

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className='px-2 py-1 text-xs rounded disabled:opacity-50 bg-gray-200'
        >
          Previous
        </button>

        {pages.map(num => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`text-xs px-2 m-0.5 py-1 border rounded-2xl ${page === num ? 'bg-black text-white' : 'hover:bg-gray-300'}`}
          >
            {num}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className='px-4 py-1 text-xs rounded disabled:opacity-50 bg-gray-200'
        >
          Next
        </button>
      </div>
    </div>
  );
}
