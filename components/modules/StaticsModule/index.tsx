"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useEffect, useState, useMemo } from "react";
import dayjs from "dayjs";

import { useGetAllOrderMutation } from "@/store/queries/ordermanagement";

export default function ThongKeECommerce() {
  const [data, setData] = useState({ items: [], total: "" });

  const [getAllOrder] = useGetAllOrderMutation();

  const getNewOrder = async () => {
    const { data } = await getAllOrder({
      filter: "string",
      skip: 0,
      pageIndex: 0,
      pageSize: 999,
      sortField: "name",
      asc: true,
    });

    setData(data?.result);
  };

  useEffect(() => {
    getNewOrder();
  }, []);

  const totalRevenue = useMemo(() => {
    return data.items
      .filter((order: any) => order.orderStatus === "Delivered")
      .reduce((sum, order: any) => sum + order.totalPrice, 0);
  }, [data]);

  const totalOrders = data.items.length;

  const uniqueCustomers = useMemo(() => {
    const emails = data.items.map((order: any) => order.recipientMail);

    return new Set(emails).size;
  }, [data]);

  const orderChartData = useMemo(() => {
    const ordersByDate = data.items.reduce((acc: any, order: any) => {
      const date = dayjs(order.createdDate).format("DD/MM");

      if (!acc[date]) acc[date] = { date, orders: 0, total: 0 };
      acc[date].orders += 1;
      acc[date].total += order.totalPrice;

      return acc;
    }, {});

    return Object.values(ordersByDate).sort((a: any, b: any) =>
      dayjs(a.date, "DD/MM").isAfter(dayjs(b.date, "DD/MM")) ? 1 : -1,
    );
  }, [data]);

  const formatCurrency = (value: any) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  return (
    <div className="">
      <h1 className="mb-6 text-3xl font-bold">Thống kê</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            Doanh Thu
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardBody>
            <div className="text-2xl font-bold">
              {formatCurrency(totalRevenue)}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            Số Đơn Hàng
            <ShoppingCart className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardBody>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            Khách Hàng
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardBody>
            <div className="text-2xl font-bold">{uniqueCustomers}</div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            Tỷ Lệ Hủy Đơn
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardBody>
            <div className="text-2xl font-bold">
              {(
                (data.items.filter(
                  (order: any) => order.orderStatus === "Canceled",
                ).length /
                  totalOrders) *
                100
              ).toFixed(2)}
              %
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>Biểu Đồ Đơn Hàng Theo Ngày</CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={orderChartData}
              margin={{
                left: 100,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip
                formatter={(value) => formatCurrency(value)}
                labelFormatter={(label) => `Ngày ${label}`}
              />
              <Line type="monotone" dataKey="orders" stroke="#8884d8" />
              <Line type="monotone" dataKey="total" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  );
}
