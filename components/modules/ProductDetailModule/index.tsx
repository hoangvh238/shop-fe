import { Spacer } from "@nextui-org/react";
import React from "react";

import Link from "./Link";

import ProductViewInfo from "@/components/core/common/product-view-item";
function ProductDetailModule({ product }: { product: any }) {
  return (
    <>
      <div className="container mx-auto px-2 py-4 pb-16 lg:px-24">
        <Link name={product?.name} />
        <Spacer y={5} />
        <ProductViewInfo {...product} />
        {/* <Spacer y={5} /> */}
        {/* <RelatedProduct /> */}
      </div>
    </>
  );
}

export default ProductDetailModule;
