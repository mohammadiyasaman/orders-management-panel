import type { Order } from "../types/order";
import { OrderStatusBadge } from "./OrderStatusBadge";

type OrdersTableProps = {
  orders: Order[];
  onOrderSelect: (order: Order) => void;
};

const numberFormatter = new Intl.NumberFormat("fa-IR");

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  calendar: "persian",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function OrdersTable({ orders, onOrderSelect }: OrdersTableProps) {
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
              <th
                scope="col"
                className="px-4 py-3 text-right text-sm font-semibold text-gray-700"
              >
                جزئیات
              </th>
            </tr>
          </thead>

          {orders.length > 0 ? (
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

                  <td className="px-4 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onOrderSelect(order)}
                      className="rounded-md border border-gray-400 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                      مشاهده
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  سفارشی مطابق جستجو و فیلترهای انتخاب‌شده پیدا نشد.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
