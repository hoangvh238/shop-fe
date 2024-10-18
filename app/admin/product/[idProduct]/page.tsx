import React from "react";

import AdminSubProductManagement from "@/components/modules/AdminSubProductManagement";

const page = ({ params: { idProduct } }: { params: { idProduct: string } }) => {
    return <AdminSubProductManagement productID={idProduct} />;
};

export default page;
