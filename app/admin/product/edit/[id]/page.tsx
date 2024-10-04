import React from "react";

import { Metadata } from "next";

import EditProduct from "@/components/modules/AdminProductManagement/EditProduct";

export const metadata: Metadata = {
  title: "Trang chỉnh sửa | Quản lý mẫu sản phẩm",
};

const AdminEditManagement = ({
  params: { id },
}: {
  params: { id: string };
}) => {
  return <EditProduct idProduct={id} />;
};

export default AdminEditManagement;
