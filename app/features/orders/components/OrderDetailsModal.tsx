"use client";

import { useEffect } from "react";
import type { Order } from "../types/order";
import { OrderStatusBadge } from "./OrderStatusBadge";

type OrderDetailsModalProps = {
  order: Order;
  onClose: () => void;
};

const numberFormatter = new Intl.NumberFormat("fa-IR");

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  calendar: "persian",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function OrderDetailsModal({
  order,
  onClose,
}: OrderDetailsModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-details-title"
      dir="rtl"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="order-details-title"
            className="text-xl font-bold text-gray-900"
          >
            جزئیات سفارش
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            بستن
          </button>
        </div>

        <dl className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <dt className="text-sm text-gray-500">شماره سفارش</dt>
            <dd className="font-medium text-gray-900">{order.id}</dd>
          </div>

          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <dt className="text-sm text-gray-500">مشتری</dt>
            <dd className="font-medium text-gray-900">{order.customer}</dd>
          </div>

          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <dt className="text-sm text-gray-500">مبلغ</dt>
            <dd className="font-medium text-gray-900">
              {numberFormatter.format(order.price)}
            </dd>
          </div>

          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <dt className="text-sm text-gray-500">تعداد کالا</dt>
            <dd className="font-medium text-gray-900">
              {numberFormatter.format(order.items)}
            </dd>
          </div>

          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <dt className="text-sm text-gray-500">وضعیت</dt>
            <dd>
              <OrderStatusBadge status={order.status} />
            </dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-500">تاریخ ثبت</dt>
            <dd className="font-medium text-gray-900">
              {dateFormatter.format(new Date(order.createdAt))}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
