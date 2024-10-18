import React from "react";

import { Metadata } from "next";

import EditProductComponent from "@/components/modules/AdminSubProductManagement/EditSubProductManagement";

export const metadata: Metadata = {
  title: "Trang chỉnh sửa | Quản lý mẫu sản phẩm",
};

const AdminEditManagement = ({
  params: { idSubproduct, idProduct },
}: {
  params: { idSubproduct: string, idProduct: string };
}) => {
  return (
    <EditProductComponent idProduct={idProduct} idSubproduct={idSubproduct} />
  );
};

export default AdminEditManagement;
