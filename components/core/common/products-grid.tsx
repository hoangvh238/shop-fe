"use client";

import React from "react";

import ProductListItem from "./product-list-item";

import { cn } from "@/utils/cn";
import { ProductCustom } from "@/types/item-type";

export type ProductGridProps = React.HTMLAttributes<HTMLDivElement> & {
  itemClassName?: string;
  products: ProductCustom[];
  isSuccess: boolean;
};

const ProductsGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
  ({ className, products, isSuccess, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid w-full grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          className,
        )}
        {...props}
      >
        {products?.map((product, index: number) => (
          <ProductListItem
            key={isSuccess ? product?.id : index}
            removeWrapper
            isLoading={!isSuccess}
            {...product}
            className={cn("w-full snap-start", className)}
          />
        ))}
      </div>
    );
  },
);

ProductsGrid.displayName = "ProductsGrid";

export default ProductsGrid;
