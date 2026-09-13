type OrdersPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export function OrdersPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: OrdersPaginationProps) {
  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-gray-600">
        نمایش{" "}
        <span className="font-medium text-gray-900">
          {(currentPage - 1) * pageSize + 1}
        </span>{" "}
        تا{" "}
        <span className="font-medium text-gray-900">
          {Math.min(currentPage * pageSize, totalItems)}
        </span>{" "}
        از <span className="font-medium text-gray-900">{totalItems}</span> سفارش
      </p>

      <div className="flex items-center gap-2" dir="ltr">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-lg border border-gray-400 bg-white px-3 py-2 font-medium text-gray-800 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:opacity-100"
        >
          قبلی
        </button>

        <span className="min-w-20 text-center text-gray-700">
          {currentPage} / {totalPages}
        </span>

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-lg border border-gray-400 bg-white px-3 py-2 font-medium text-gray-800 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:opacity-100"
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
