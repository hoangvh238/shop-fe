"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Image,
  User,
  Progress,
} from "@nextui-org/react";
import { ShoppingBag, Truck, CreditCard, CheckCircle } from "lucide-react";

import { enums } from "@/settings";

type Item = {
  quantity: number;
  price: number;
  color: string;
  size: string;
  image: string;
  customCanvasId: string;
};

type Order = {
  orderStatus: string;
  orderCode: string;
  items: Item[];
  totalPrice: number;
  address: string;
  recipientPhone: string;
  recipientMail: string;
  recipientName: string;
  createdDate: string;
};

type Transaction = {
  status: string;
  paymentMethod: string;
  alreadyPaid: number;
  unpaid: number;
};

type OrderDetailsProps = {
  order: Order;
  transaction: Transaction;
};

export default function ImprovedOrderDetails({
  order,
  transaction,
}: OrderDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "warning";
      case "success":
        return "success";
      default:
        return "default";
    }
  };

  const getProgressValue = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return 33;
      case "shipped":
        return 66;
      case "delivered":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="container mx-auto my-20 max-w-4xl space-y-6 p-4">
      <Card>
        <CardHeader className="flex items-center justify-between bg-primary p-9 text-white">
          <div>
            <h1 className="text-3xl font-bold">Mô tả sản phẩm</h1>
            <p className="text-sm opacity-80">
              Mua vào ngày {new Date(order?.createdDate)?.toLocaleDateString()}
            </p>
          </div>
          <Chip
            className="font-bold uppercase"
            color={getStatusColor(order?.orderStatus)}
            size="lg"
            variant="shadow"
          >
            {
              enums.OrderStatusTranslate[
                order?.orderStatus as keyof typeof enums.OrderStatusTranslate
              ]
            }
          </Chip>
        </CardHeader>
        <CardBody className="p-9">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">
                Đơn hàng #{order?.orderCode}
              </p>
              <p className="text-sm text-gray-500">
                {order?.items.length} Sản phẩm
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">
                {order?.totalPrice?.toLocaleString("VN-vi")} VND
              </p>
              <p className="text-sm text-gray-500">
                {transaction?.paymentMethod}
              </p>
            </div>
          </div>
          <Divider className="my-4" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h2 className="mb-2 text-lg font-semibold">Mô tả vận chuyển</h2>
              <User
                avatarProps={{ name: order?.recipientName, size: "lg" }}
                description={order?.recipientPhone}
                name={order?.recipientName}
              />
              <p className="mt-2 text-sm text-gray-600">{order?.address}</p>
              <p className="text-sm text-gray-600">{order?.recipientMail}</p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-semibold">
                Tiến trình đơn hàng
              </h2>
              <Progress
                className="mb-2"
                value={getProgressValue(order?.orderStatus)}
              />
              <div className="flex justify-between text-sm">
                <span>Mua hàng</span>
                <span>Vận chuyển</span>
                <span>Đã giao hàng</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="p-6">
        <CardHeader>
          <h2 className="text-xl font-bold">Đơn hàng</h2>
        </CardHeader>
        <CardBody>
          <Table aria-label="Order items table" className="mt-4">
            <TableHeader>
              <TableColumn>SẢN PHẨM</TableColumn>
              <TableColumn>SỐ LƯỢNG</TableColumn>
              <TableColumn>GIÁ</TableColumn>
              <TableColumn>TỔNG TIỀN</TableColumn>
            </TableHeader>
            <TableBody>
              {order?.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        alt={`Item ${index + 1}`}
                        className="rounded-md object-cover"
                        height={60}
                        src={item.image}
                        width={60}
                      />
                      <div>
                        <p className="font-medium">Custom T-Shirt</p>
                        <p className="text-sm text-gray-500">
                          {item.color}, {item.size}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    {item.price?.toLocaleString("VN-vi")} VND
                  </TableCell>
                  <TableCell className="font-medium">
                    {(item.quantity * item.price)?.toLocaleString("VN-vi")} VND
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Card className="p-6">
        <CardHeader>
          <h2 className="text-xl font-bold">Thanh toán</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tiền mua sản phẩm</span>
              <span>{order?.totalPrice?.toLocaleString("VN-vi")} VND</span>
            </div>
            <div className="flex justify-between">
              <span>Vận chuyển</span>
              <span>Miễn phí</span>
            </div>
            <Divider className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Tổng tiền</span>
              <span>{order?.totalPrice?.toLocaleString("VN-vi")} VND</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Trả</span>
              <span>
                {transaction?.alreadyPaid?.toLocaleString("VN-vi")} VND
              </span>
            </div>
            {transaction?.unpaid > 0 && (
              <div className="flex justify-between text-sm font-medium text-red-500">
                <span>Chưa trả</span>
                <span>{transaction?.unpaid?.toLocaleString("VN-vi")} VND</span>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardBody className="flex items-center p-4">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-500">Ngày mua hàng</p>
              <p className="font-semibold">
                {new Date(order?.createdDate)?.toLocaleDateString()}
              </p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex items-center p-4">
            <Truck className="h-8 w-8 text-primary" />
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-500">Trạng thái vận chuyển</p>
              <p className="w-fit font-semibold capitalize">
                {
                  enums.OrderStatusTranslate[
                    order?.orderStatus as keyof typeof enums.OrderStatusTranslate
                  ]
                }
              </p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex items-center p-4">
            <CreditCard className="h-8 w-8 text-primary" />
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-500">Phương pháp thanh toán</p>
              <p className="font-semibold">
                {
                  enums.PaymentMethodTranslate[
                    transaction?.paymentMethod as keyof typeof enums.PaymentMethodTranslate
                  ]
                }
              </p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex items-center p-4">
            <CheckCircle className="h-8 w-8 text-primary" />
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-500">Trạng thái thanh toán</p>
              <p className="font-semibold">
                {
                  enums.TransactionStastusTranslate[
                    transaction?.status as keyof typeof enums.TransactionStastusTranslate
                  ]
                }
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
