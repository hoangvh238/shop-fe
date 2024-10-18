"use client";

import React from "react";
import { Image, Link } from "@nextui-org/react";

import { cn } from "@/utils/cn";

export type OrderSummaryItemType = {
  size: string;
  quantity: number;
  customCanvas: {
    name: string;
    price: number;
    images: string;
    id: string;
  };
  deleteCard: (id: string) => void;
};

export type OrderSummaryItemProps = React.HTMLAttributes<HTMLLIElement> &
  OrderSummaryItemType;

const OrderSummaryItem = React.forwardRef<HTMLLIElement, OrderSummaryItemProps>(
  (
    { children, color, size, quantity, customCanvas, className, ...props },
    ref,
  ) => {
    return (
      <li
        ref={ref}
        className={cn(
          "flex w-full items-center gap-x-4 border-b-small border-divider py-4",
          className,
        )}
        {...props}
      >
        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg">
          <Image alt={customCanvas?.name} src={customCanvas?.images[0]} />
        </div>
        <div className="flex flex-1 flex-col">
          <h4 className="text-small">
            <Link
              className="font-medium text-foreground"
              href={customCanvas?.id}
              underline="hover"
            >
              {customCanvas?.name || children}
            </Link>
          </h4>
          <div className="flex items-center gap-3">
            <p>
              <span className="text-small text-default-500">Color: </span>
              <span className="text-small font-medium capitalize text-default-700">
                {color}
              </span>
            </p>
            <p>
              <span className="text-small text-default-500">Size: </span>
              <span className="text-small font-medium text-default-700">
                {size}
              </span>
            </p>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-small font-semibold text-default-700">
              {customCanvas?.price.toLocaleString("VN-vi")} VNĐ
            </span>
            <span className="text-small text-default-500">x {quantity}</span>
          </div>
        </div>
      </li>
    );
  },
);

OrderSummaryItem.displayName = "OrderSummaryItem";

export default OrderSummaryItem;
