"use client"
import React from "react";

import products from "@/helpers/data/products";
import ProductListItem from "@/components/core/common/product-list-item";

const productsWithAvailableColors = products.map((product) => ({
  ...product,
  availableColors: [
    {
      name: "Black",
      hex: "#18181b",
    },
    {
      name: "Red",
      hex: "#f871a0",
    },
    {
      name: "Yellow",
      hex: "#f9c97c",
    },
  ],
}));

function RelatedProduct() {
  return (
    <div className="my-20">
      <h3 className="mb-4 text-xl font-medium">Sản phẩm tương tự</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        {/* {productsWithAvailableColors.slice(0, 5).map((product) => (
          <ProductListItem
            key={product.id}
            {...product}
            className="snap-start"
          />
        ))} */}
      </div>
    </div>
  );
}

export default RelatedProduct;
