import type { OrderStatus } from "../types/order";

type OrderStatusBadgeProps = {
  status: OrderStatus;
};

const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Processing: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Cancelled: "bg-red-50 text-red-700 ring-red-600/20",
};

const statusLabels: Record<OrderStatus, string> = {
  Pending: "در انتظار",
  Processing: "در حال پردازش",
  Completed: "تکمیل شده",
  Cancelled: "لغو شده",
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
