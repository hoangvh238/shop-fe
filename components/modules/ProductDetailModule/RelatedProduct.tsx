"use client";
import React from "react";

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
