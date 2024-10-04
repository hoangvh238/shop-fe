"use client";

import React from "react";
import { Button, Checkbox, Divider, Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

import OrderSummaryItem, { OrderSummaryItemType } from "./order-summary-item";

export type OrderSummaryProps = React.HTMLAttributes<HTMLDivElement> & {
  hideTitle?: boolean;
  items: OrderSummaryItemType[];
  submitOrder: (inputItem: OrderItemType[]) => void;
  totalPrice: string;
  inputItem: OrderItemType[];
};

export type OrderItemType = {
  id: string;
  price: number;
  quantity: number;
  size: string;
};

const OrderSummary = React.forwardRef<HTMLDivElement, OrderSummaryProps>(
  ({ hideTitle, items, totalPrice, inputItem, submitOrder, ...props }, ref) => {
    const [selectList, setSelectList] =
      React.useState<OrderItemType[]>(inputItem);

    const params = useSearchParams();
    const itemProduct = params.get("itemProduct");
    const itemSize = params.get("size");

    React.useEffect(() => {
      submitOrder(selectList);
    }, [selectList]);

    React.useEffect(() => {
      if (itemProduct && itemSize) {
        const item = items.find((e) => e.customCanvas.id === itemProduct);
        const selected: any = {
          id: item?.customCanvas.id,
          price: item?.customCanvas.price,
          quantity: item?.quantity,
          size: item?.size,
        };
        setSelectList([selected]);
      }
    }, []);

    const products = React.useMemo(() => {
      return items?.map((item) => ({
        ...item,
        isSelected:
          (itemProduct === item?.customCanvas?.id && itemSize === item?.size) ||
          selectList.some(
            (selectedItem) =>
              selectedItem.id === item.customCanvas.id &&
              selectedItem.size === item.size,
          ),
      }));
    }, [items]);

    return (
      <div ref={ref} {...props}>
        {!hideTitle && (
          <>
            <h2 className="font-medium text-default-500">Giỏ hàng</h2>
            <Divider className="mt-4" />
          </>
        )}
        <h3 className="sr-only">Đơn hàng của bạn</h3>
        <ul className="flex flex-col">
          {products?.map((item: any, index) => (
            <div key={item?.customCanvas?.id} className="">
              <Checkbox
                aria-label={item?.customCanvas?.name}
                classNames={{
                  base: "w-full flex max-w-full",
                  label: "w-full flex max-w-full",
                }}
                isSelected={item.isSelected}
                value={item?.customCanvas?.id}
                onChange={({ target }) => {
                  if (target.checked) {
                    setSelectList([
                      ...selectList,
                      {
                        id: target.value,
                        price: products[index].customCanvas.price,
                        quantity: products[index].quantity,
                        size: products[index].size,
                      },
                    ]);
                    products[index].isSelected = true;
                  } else {
                    const indexChecked = selectList.findIndex(
                      (item: any) => item.id === target.value,
                    );

                    setSelectList(selectList.toSpliced(indexChecked, 1));
                    products[index].isSelected = false;
                  }
                }}
              >
                <OrderSummaryItem {...item} />
              </Checkbox>
            </div>
          ))}
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
                {totalPrice || 0} VNĐ
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
    );
  },
);

OrderSummary.displayName = "OrderSummary";

export default OrderSummary;
