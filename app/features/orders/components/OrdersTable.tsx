import type { Order } from "../types/order";
import { OrderStatusBadge } from "./OrderStatusBadge";

type OrdersTableProps = {
  orders: Order[];
};

const numberFormatter = new Intl.NumberFormat("fa-IR");

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  calendar: "persian",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-700">
                شماره سفارش
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-700">
                مشتری
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-700">
                مبلغ
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-700">
                تعداد کالا
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-700">
                وضعیت
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-gray-700">
                تاریخ ثبت
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {order.id}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                  {order.customer}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                  {numberFormatter.format(order.price)}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                  {numberFormatter.format(order.items)}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <OrderStatusBadge status={order.status} />
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                  {dateFormatter.format(new Date(order.createdAt))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
