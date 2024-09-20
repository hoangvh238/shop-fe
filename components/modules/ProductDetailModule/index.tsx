"use client";

import { BreadcrumbItem, Breadcrumbs, Spacer } from "@nextui-org/react";
import React from "react";

import ProductViewInfo, {
  ProductViewItem,
} from "@/components/core/common/product-view-item";
import RelatedProduct from "./RelatedProduct";

const item: ProductViewItem = {
  id: "942837-004",
  name: "Áo thun lạnh",
  description:
    "Áo thun lạnh với chất liệu vải mềm mại, co giãn thoáng khí giúp mang lại sự thoải mái tối đa khi mặc. Thiết kế đơn giản, phù hợp với nhiều phong cách khác nhau từ đi chơi đến đi làm.",
  images: [
    "/images/trending/shirt.png",
    "/images/trending/shirt.png",
    "/images/trending/shirt.png",
    "/images/trending/shirt.png",
    "/images/trending/shirt.png",
    "/images/trending/shirt.png",
  ],
  price: "200.000",
  rating: 4.5,
  ratingCount: 320,
  sizes: ["S", "M", "L", "XL", "XXL"],
  isPopular: true,
  availableColors: [
    { name: "Trắng", hex: "#ffffff" },
    { name: "Đen", hex: "#000000" },
    { name: "Xám", hex: "#808080" },
  ],
  details: [
    {
      title: "Kích thước & Vừa vặn",
      items: [
        "Form chuẩn; chọn size như thông thường",
        "Vải nhẹ, co giãn tốt",
        "Thiết kế đơn giản, phù hợp với mọi hoàn cảnh",
      ],
    },
    {
      title: "Vận chuyển & Trả hàng",
      items: [
        "Miễn phí vận chuyển & đổi trả",
        "Hoàn trả dễ dàng, không yêu cầu thêm chi phí",
        "Đóng gói cẩn thận, bao bì sang trọng",
        "Giao hàng trong 24 giờ!",
      ],
    },
    {
      title: "Lưu ý từ nhà sản xuất",
      items: [
        "Chất liệu vải thoáng mát, phù hợp cho cả mùa hè",
        "Dễ dàng phối với nhiều trang phục khác nhau",
        "Có thể giặt máy, không phai màu",
      ],
    },
  ],
};

function ProductDetailModule() {
  return (
    <>
      <div className="container mx-auto py-4">
        <Breadcrumbs className="px-6">
          <BreadcrumbItem>Trang chủ</BreadcrumbItem>
          <BreadcrumbItem>Áo thung lạnh</BreadcrumbItem>
        </Breadcrumbs>
        <Spacer y={5} />
        <ProductViewInfo {...item} />
        <Spacer y={5} />
        <RelatedProduct />
      </div>
    </>
  );
}

export default ProductDetailModule;
