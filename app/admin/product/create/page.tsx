import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang quản trị | Tạo sản phẩm mới",
};

import CreateProduct from "@/components/modules/AdminProductManagement/CreateProduct";

export default function StatisticsPage() {
  return <CreateProduct />;
}
