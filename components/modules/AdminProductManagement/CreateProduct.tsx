"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next-nprogress-bar";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];

function CreateProduct() {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="flex w-full gap-4">
        <button
          className="text-xl text-slate-600 hover:text-foreground"
          onClick={() => router.back()}
        >
          <Icon icon="solar:alt-arrow-left-line-duotone" />
        </button>
        <h3 className="text-xl font-medium uppercase">Tạo sản phẩm mới</h3>
      </div>
      <p className="mt-4 opacity-85">
        Điền thông tin bên dưới để tạo sản phẩm mới
      </p>
      <div className="mt-5 grid max-w-[900px] grid-cols-1 gap-5">
        <Input
          labelPlacement="outside"
          label="Tên sản phẩm"
          placeholder="Nhập tên sản phẩm"
          isRequired
        />
        <Input
          labelPlacement="outside"
          label="Mã sản phẩm"
          placeholder="Nhập mã sản phẩm"
          isRequired
        />
        <Textarea
          labelPlacement="outside"
          label="Mô tả sản phẩm"
          placeholder="Nhập mô tả sản phẩm"
          minRows={5}
          isRequired
        />
        <div className="grid grid-cols-2 gap-5">
          <Input
            type="number"
            label="Giá sản phẩm"
            placeholder="Nhập giá sản phẩm"
            labelPlacement="outside"
            isRequired
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-small text-default-400">VNĐ</span>
              </div>
            }
          />
          <Input
            type="number"
            labelPlacement="outside"
            label="Giá khuyến mãi"
            placeholder="Nhập giá khuyến mãi"
            isRequired
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-small text-default-400">VNĐ</span>
              </div>
            }
          />
        </div>
        <Button color="primary">Xác nhận</Button>
      </div>
    </div>
  );
}

export default CreateProduct;
