import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang quản trị | Quản lý sản phẩm",
};

import AdminProductManagement from "@/components/modules/AdminProductManagement";

export default function StatisticsPage() {
  return <AdminProductManagement />;
}
