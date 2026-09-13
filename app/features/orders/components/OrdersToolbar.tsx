"use client";

import type { OrderStatus } from "../types/order";

type SortField = "price" | "createdAt" | "customer";

type OrdersToolbarProps = {
  search: string;
  status: OrderStatus | "All";
  sortField: SortField;
  sortDirection: "asc" | "desc";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: OrderStatus | "All") => void;
  onSortChange: (value: SortField) => void;
  onSortDirectionChange: (value: "asc" | "desc") => void;
};

const statuses: Array<OrderStatus | "All"> = [
  "All",
  "Pending",
  "Processing",
  "Completed",
  "Cancelled",
];

const statusLabels: Record<OrderStatus | "All", string> = {
  All: "همه وضعیت‌ها",
  Pending: "در انتظار",
  Processing: "در حال پردازش",
  Completed: "تکمیل شده",
  Cancelled: "لغو شده",
};

const sortOptions: Array<{ value: SortField; label: string }> = [
  { value: "price", label: "مبلغ" },
  { value: "createdAt", label: "تاریخ" },
  { value: "customer", label: "نام مشتری" },
];

export function OrdersToolbar({
  search,
  status,
  sortField,
  sortDirection,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onSortDirectionChange,
}: OrdersToolbarProps) {
  return (
    <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px_130px]">
        <div>
          <label
            htmlFor="order-search"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            جستجو
          </label>

          <input
            id="order-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="شماره سفارش یا نام مشتری..."
            className="w-full rounded-lg border border-gray-400 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-gray-700 focus:ring-2 focus:ring-gray-300"
          />
        </div>

        <div>
          <label
            htmlFor="status-filter"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            وضعیت
          </label>

          <select
            id="status-filter"
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value as OrderStatus | "All")
            }
            className="w-full rounded-lg border border-gray-400 bg-white px-3 py-2 text-sm font-medium text-gray-800 outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-300"
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {statusLabels[item]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="sort-field"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            مرتب‌سازی بر اساس
          </label>

          <select
            id="sort-field"
            value={sortField}
            onChange={(event) => onSortChange(event.target.value as SortField)}
            className="w-full rounded-lg border border-gray-400 bg-white px-3 py-2 text-sm font-medium text-gray-800 outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-300"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="sort-direction"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            ترتیب
          </label>

          <select
            id="sort-direction"
            value={sortDirection}
            onChange={(event) =>
              onSortDirectionChange(event.target.value as "asc" | "desc")
            }
            className="w-full rounded-lg border border-gray-400 bg-white px-3 py-2 text-sm font-medium text-gray-800 outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-300"
          >
            <option value="asc">صعودی</option>
            <option value="desc">نزولی</option>
          </select>
        </div>
      </div>
    </div>
  );
}
