import { OrdersTable } from "./features/orders/components/OrdersTable";
import { orders } from "./features/orders/data/orders";

export default function Home() {
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

        <OrdersTable orders={orders} />
      </div>
    </main>
  );
}
