import React from "react";

import AdminSubProductManagement from "@/components/modules/EditProductManagement";

const page = ({ params: { idProduct } }: { params: { idProduct: string } }) => {
    return <AdminSubProductManagement productID={idProduct} />;
};

export default page;
