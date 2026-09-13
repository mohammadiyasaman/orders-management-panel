"use client";

import { useMemo, useState } from "react";
import { OrdersPagination } from "./features/orders/components/OrdersPagination";
import { OrdersTable } from "./features/orders/components/OrdersTable";
import { OrdersToolbar } from "./features/orders/components/OrdersToolbar";
import { orders } from "./features/orders/data/orders";
import type { OrderStatus } from "./features/orders/types/order";
import OrderDetailsModal from "./features/orders/components/OrderDetailsModal";
import type { Order } from "./features/orders/types/order";

export default function Home() {
  const PAGE_SIZE = 10;

  type SortField = "price" | "createdAt" | "customer";

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<OrderStatus | "All">("All");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const processedOrders = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(normalizedSearch) ||
        order.customer.toLowerCase().includes(normalizedSearch);

      const matchesStatus = status === "All" || order.status === status;

      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      let comparison = 0;

      if (sortField === "price") {
        comparison = a.price - b.price;
      }

      if (sortField === "createdAt") {
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      if (sortField === "customer") {
        comparison = a.customer.localeCompare(b.customer, "fa");
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [search, status, sortField, sortDirection]);

  const totalItems = processedOrders.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const validCurrentPage = Math.min(currentPage, Math.max(totalPages, 1));

  const paginatedOrders = processedOrders.slice(
    (validCurrentPage - 1) * PAGE_SIZE,
    validCurrentPage * PAGE_SIZE,
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: OrderStatus | "All") => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortField) => {
    setSortField(value);
    setCurrentPage(1);
  };

  const handleSortDirectionChange = (value: "asc" | "desc") => {
    setSortDirection(value);
    setCurrentPage(1);
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            سفارش‌ها
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            مشاهده و مدیریت سفارش‌های مشتریان
          </p>
        </div>

        <OrdersToolbar
          search={search}
          status={status}
          sortField={sortField}
          sortDirection={sortDirection}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onSortChange={handleSortChange}
          onSortDirectionChange={handleSortDirectionChange}
        />

        <OrdersTable
          orders={paginatedOrders}
          onOrderSelect={setSelectedOrder}
        />

        <OrdersPagination
          currentPage={validCurrentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </main>
  );
}
