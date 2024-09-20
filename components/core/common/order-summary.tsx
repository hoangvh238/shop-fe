"use client";

import React from "react";
import { Button, Divider, Input } from "@nextui-org/react";

import OrderSummaryItem, { OrderSummaryItemType } from "./order-summary-item";

export type OrderSummaryProps = React.HTMLAttributes<HTMLDivElement> & {
  hideTitle?: boolean;
  items: OrderSummaryItemType[];
};

const OrderSummary = React.forwardRef<HTMLDivElement, OrderSummaryProps>(
  ({ hideTitle, items, ...props }, ref) => (
    <div ref={ref} {...props}>
      {!hideTitle && (
        <>
          <h2 className="font-medium text-default-500">Your Order</h2>
          <Divider className="mt-4" />
        </>
      )}
      <h3 className="sr-only">Items in your cart</h3>
      <ul className="">
        {items?.map((item) => <OrderSummaryItem key={item.id} {...item} />)}
      </ul>
      <div>
        <form
          className="mb-4 mt-6 flex items-end gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            classNames={{
              label: "text-default-700",
              inputWrapper: "bg-background",
            }}
            color="primary"
            label="Mã giảm giá"
            labelPlacement="outside"
            placeholder="Nhập mã giảm giá"
            variant="bordered"
          />
          <Button type="submit">Xác nhận</Button>
        </form>
        <dl className="flex flex-col gap-4 py-4">
          <div className="flex justify-between">
            <dt className="text-small text-default-500">Giá sản phẩm</dt>
            <dd className="text-small font-semibold text-default-700">
              500.000 VNĐ
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-small text-default-500">Vận chuyển</dt>
            <dd className="text-small font-semibold text-default-700">
              50.000 VNĐ
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-small text-default-500">Giảm giá</dt>
            <dd className="text-small font-semibold text-success">
              - 20.000 VNĐ
            </dd>
          </div>
          <Divider />
          <div className="flex justify-between">
            <dt className="text-small font-semibold text-default-500">
              Tổng cộng
            </dt>
            <dd className="text-small font-semibold text-default-700">
              530.000 VNĐ
            </dd>
          </div>
        </dl>
      </div>
    </div>
  ),
);

OrderSummary.displayName = "OrderSummary";

export default OrderSummary;
