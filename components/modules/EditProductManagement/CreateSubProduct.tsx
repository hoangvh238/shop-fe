"use client";
import { Button, CheckboxGroup, Input, RadioGroup } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next-nprogress-bar";
import React from "react";

import ColorRadioItem from "@/components/core/common/color-radio-item";
import UploadImage from "@/components/core/common/upload-image";
import TagGroupCheckboxItem from "@/components/core/common/tag-group-checkbox-item";

const item = {
  sizes: ["S", "M", "L", "XL", "XXL"],
  availableColors: [
    { name: "Trắng", hex: "#ffffff" },
    { name: "Đen", hex: "#000000" },
    { name: "Xám", hex: "#808080" },
  ],
};

const AdminCreateSubProduct = () => {
  const router = useRouter();

  const [inforUpload, setInforUpload] = React.useState<any[]>([]);

  return (
    <div className="flex flex-col">
      <div className="flex w-full gap-4">
        <button
          className="text-xl text-slate-600 hover:text-foreground"
          onClick={() => router.back()}
        >
          <Icon icon="solar:alt-arrow-left-line-duotone" />
        </button>
        <h3 className="text-xl font-medium uppercase">Tạo mẫu sản phẩm mới</h3>
      </div>
      <p className="mt-4 opacity-85">
        Điền thông tin bên dưới để tạo mẫu sản phẩm mới
      </p>
      <div className="mt-5 grid max-w-[900px] grid-cols-1 gap-5">
        <RadioGroup
          aria-label="Color"
          label="Chọn màu sản phẩm"
          classNames={{
            base: "ml-1 mt-6",
            wrapper: "gap-2",
          }}
          defaultValue={item.availableColors?.at(0)?.hex}
          orientation="horizontal"
        >
          {item.availableColors?.map(({ name, hex }) => (
            <ColorRadioItem key={name} color={hex} tooltip={name} value={hex} />
          ))}
        </RadioGroup>
        <CheckboxGroup
          aria-label="Select size"
          className="gap-1"
          // defaultValue="39"
          label="Chọn kích cỡ sản phẩm"
          orientation="horizontal"
          onChange={(e) => {
            console.log('target', e)
          }}
        >
          {item.sizes?.map((size) => (
            <TagGroupCheckboxItem key={size} size="lg" value={size}>
              {size}
            </TagGroupCheckboxItem>
          ))}
        </CheckboxGroup>
        <div className="grid grid-cols-2 gap-5">
          <Input
            isRequired
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-small text-default-400">VNĐ</span>
              </div>
            }
            label="Giá sản phẩm"
            labelPlacement="outside"
            placeholder="Nhập giá sản phẩm"
            type="number"
          />
          <Input
            isRequired
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-small text-default-400">VNĐ</span>
              </div>
            }
            label="Giá khuyến mãi"
            labelPlacement="outside"
            placeholder="Nhập giá khuyến mãi"
            type="number"
          />
        </div>
        <UploadImage
          setInforUpload={setInforUpload}
          inforUpload={inforUpload}
        />
        <Button color="primary">Xác nhận</Button>
      </div>
    </div>
  );
};

export default AdminCreateSubProduct;
