"use client";

import React, { useCallback, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { Search as SearchIcon } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";

import ImprovedOrderDetails from "./ImprovedOrderDetails";

import { generateQueryString } from "@/utils/queryString";
import { useGetOrderDetailQuery } from "@/store/queries/ordermanagement";

export default function TopSearch() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const params = useSearchParams();
  const code = params.get("vnp_TxnRef") ?? "";

  const { detailOrder, isFetching, isUninitialized } = useGetOrderDetailQuery(
    { code },
    {
      selectFromResult: ({ data, isFetching, isUninitialized }) => {
        return {
          detailOrder: data?.result ?? {},
          isFetching,
          isUninitialized,
        };
      },
    },
  );


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(generateQueryString({ vnp_TxnRef: `${searchValue}` }));
    }
  };

  const handleSearch = useCallback(
    (value: string) => setSearchValue(value),
    [],
  );


  return (
    <div className="min-h-screen w-full pt-10">
      <div className="mx-auto max-w-7xl px-4 py-4 shadow-lg sm:px-6 lg:px-8">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          Tra Cứu Đơn Hàng
        </h1>
        <form
          className="flex w-full items-center space-x-2"
          onSubmit={handleSubmit}
        >
          <Input
            className="flex-grow rounded-2xl bg-gray-100"
            placeholder="Nhập mã đơn hàng bạn cần tra cứu..."
            radius="lg"
            startContent={<SearchIcon className="text-default-400" size={18} />}
            type="search"
            // value={searchValue}
            onValueChange={handleSearch}
          />
          <Button
            className="cursor-pointer"
            color="primary"
            disabled={!searchValue.trim()}
            type="submit"
          >
            Tìm kiếm
          </Button>
        </form>
      </div>
      <div>
        <ImprovedOrderDetails {...detailOrder} isFetching={isFetching} />
      </div>
    </div>
  );
}
