"use client";
import {
  Button,
  CheckboxGroup,
  Input,
  RadioGroup,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next-nprogress-bar";
import React from "react";

import ColorRadioItem from "@/components/core/common/color-radio-item";
import UploadImage from "@/components/core/common/upload-image";
import { useGetAllSubProductQuery } from "@/store/queries/productManagement";
import { SubProduct } from "@/helpers/data/adminProducts";
import { enums } from "@/settings";
import TagGroupCheckboxItem from "@/components/core/common/tag-group-checkbox-item";

const item = {
  sizes: ["SM", "M", "L", "XL", "XXL"],
  availableColors: [
    { name: "White", hex: "#FFFFFF" },
    { name: "Red", hex: "#FF0000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Green", hex: "#00FF00" },
    { name: "Black", hex: "#000000" },
    { name: "Yellow", hex: "#FFFF00" },
  ],
};

export type TypeColor = {
  name: string;
  hex: string;
}

const EditSubProductManagement = ({
  idSubproduct,
  idProduct,
}: {
  idSubproduct: string;
  idProduct: string;
}) => {
  const router = useRouter();

  const [inforUpload, setInforUpload] = React.useState([]);
  const [sizes, setSizes] = React.useState<string[]>([]);
  const [color, setColor] = React.useState<TypeColor>({ name: "", hex: "" });

  const { subProducts }: { subProducts: SubProduct } = useGetAllSubProductQuery(
    { id: idProduct },
    {
      selectFromResult: ({ data }) => {
        const subProduct = data?.result?.products?.find(
          (product: SubProduct) => product?.id === idSubproduct,
        );

        return {
          subProducts: subProduct,
        };
      },
    },
  );

  React.useEffect(() => {
    setSizes(subProducts?.sizes.split(",") ?? []);
    setColor({
      name: subProducts?.color,
      hex: enums.Color[subProducts?.color as keyof typeof enums.Color],
    });
  }, [subProducts]);

  return (
    <div className="flex flex-col">
      <div className="flex w-full gap-4">
        <button
          className="text-xl text-slate-600 hover:text-foreground"
          onClick={() => router.back()}
        >
          <Icon icon="solar:alt-arrow-left-line-duotone" />
        </button>
        <h3 className="text-xl font-medium uppercase">Sửa mẫu sản phẩm </h3>
      </div>
      <p className="mt-4 opacity-85">
        Điền thông tin bên dưới để sửa lại mẫu sản phẩm
      </p>
      <div className="mt-5 grid max-w-[900px] grid-cols-1 gap-5">
        <RadioGroup
          aria-label="Color"
          classNames={{
            base: "ml-1 mt-6",
            wrapper: "gap-2",
          }}
          label="Chọn màu sản phẩm"
          orientation="horizontal"
          value={color.hex}
          onChange={({ target }) =>
            setColor({ name: target.id, hex: target.defaultValue })
          }
        >
          {item?.availableColors?.map(({ name, hex }) => (
            <ColorRadioItem
              key={name}
              color={hex}
              id={name}
              tooltip={name}
              value={hex}
            />
          ))}
        </RadioGroup>
        <CheckboxGroup
          aria-label="Select size"
          className="gap-1"
          label="Chọn kích cỡ sản phẩm"
          orientation="horizontal"
          value={sizes}
          onChange={(e) => setSizes(e)}
        >
          {item?.sizes?.map((size) => (
            <TagGroupCheckboxItem
              key={size}
              checked={subProducts?.sizes?.includes(size)}
              size="lg"
              value={size}
            >
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
          inforUpload={inforUpload}
          setInforUpload={setInforUpload}
        />
        <Button color="primary">Xác nhận</Button>
      </div>
    </div>
  );
};

export default EditSubProductManagement;
