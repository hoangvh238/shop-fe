import React from "react";

import AdminCreateSubProduct from "@/components/modules/AdminSubProductManagement/CreateSubProduct";

const AdminCreateManagement = ({
  params: { idProduct },
}: {
  params: { idProduct: string };
}) => {
  return <AdminCreateSubProduct idProduct={idProduct} />;
};

export default AdminCreateManagement;
