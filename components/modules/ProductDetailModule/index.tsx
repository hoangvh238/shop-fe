import { Spacer } from "@nextui-org/react";
import React from "react";

import RelatedProduct from "./RelatedProduct";
import Link from "./Link";

import ProductViewInfo, {
  ProductViewInfoProps,
} from "@/components/core/common/product-view-item";

function ProductDetailModule({ product }: { product: ProductViewInfoProps }) {
  return (
    <>
      <div className="container mx-auto py-4">
        <Link name={product?.name} />
        <Spacer y={5} />
        <ProductViewInfo {...product} />
        <Spacer y={5} />
        <RelatedProduct />
      </div>
    </>
  );
}

export default ProductDetailModule;
