"use client";

import React from "react";
import { Checkbox, Divider } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

import OrderSummaryItem, { OrderSummaryItemType } from "./order-summary-item";

export type OrderSummaryProps = React.HTMLAttributes<HTMLDivElement> & {
  hideTitle?: boolean;
  items: OrderSummaryItemType[];
  submitOrder: (inputItem: OrderItemType[]) => void;
  totalPrice: number;
  inputItem: OrderItemType[];
  setVoucher: (voucher: string) => void;
  voucher: string;
  isSuccess: boolean;
  isError: boolean;
};

export type OrderItemType = {
  id: string;
  price: number;
  quantity: number;
  size: string;
};

const OrderSummary = React.forwardRef<HTMLDivElement, OrderSummaryProps>(
  (
    {
      hideTitle,
      items,
      setVoucher,
      totalPrice,
      inputItem,
      isSuccess,
      isError,
      voucher,
      submitOrder,
      ...props
    },
    ref,
  ) => {
    const [selectList, setSelectList] =
      React.useState<OrderItemType[]>(inputItem);

    const params = useSearchParams();
    const itemProduct = params.get("itemProduct");
    const itemSize = params.get("size");

    React.useEffect(() => {
      submitOrder(selectList);
    }, [selectList]);

    React.useEffect(() => {
      console.log('items2', items)
      if (itemProduct && itemSize && (isSuccess || isError)) {
        const item = items.find(
          (e) => e.customCanvas.id === itemProduct && e.size === itemSize,
        );
        const selected: any = {
          id: item?.customCanvas.id,
          price: item?.customCanvas.price,
          quantity: item?.quantity,
          size: item?.size,
        };

        setSelectList([selected]);
      }
    }, [items.length]);

    console.log("selectList", selectList);

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
    }, [items.length]);

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
                    const newSelectList = selectList;

                    newSelectList.splice(indexChecked, 1);
                    setSelectList([...newSelectList]);
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
          <dl className="flex flex-col gap-4 py-4">
            <div className="flex justify-between">
              <dt className="text-small text-default-500">Giá sản phẩm</dt>
              <dd className="text-small font-semibold text-default-700">
                {totalPrice.toLocaleString("VN-vi") || 0} VNĐ
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
