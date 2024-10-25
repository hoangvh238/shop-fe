"use client";
import { Button, CheckboxGroup, Input, RadioGroup } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next-nprogress-bar";
import React from "react";
import { toast, Toaster } from "sonner";

import ColorRadioItem from "@/components/core/common/color-radio-item";
import UploadImage from "@/components/core/common/upload-image";
import TagGroupCheckboxItem from "@/components/core/common/tag-group-checkbox-item";
import {
  useAddSubProductMutation,
  useGetSubProductQuery,
} from "@/store/queries/productManagement";
import {
  useGetColorsQuery,
  useGetSizesQuery,
} from "@/store/queries/providerManagement";
import { enums } from "@/settings";
import { SubProduct } from "@/types/item-type";
import UploadJson from "@/components/core/common/upload-json";

const item = {
  sizes: ["S", "M", "L", "XL", "XXL"],
  availableColors: [
    { label: "Trắng", value: "White", hex: "#FFFFFF" },
    { label: "Đen", value: "Black", hex: "#000000" },
    { label: "Cam", value: "Orange", hex: "#FFA500" },
    { label: "Đỏ", value: "Red", hex: "#FF0000" },
    { label: "Xanh", value: "Blue", hex: "#0000FF" },
    { label: "Xanh", value: "Green", hex: "#00FF00" },
    { label: "Vàng", value: "Yellow", hex: "#FFFF00" },
  ],
};

const initialForm = {
  name: "",
  images: [],
  price: 0,
  color: "",
  sizes: "",
  discountPrice: 0,
};

const AdminEditSubProduct = ({
  idProduct,
  idSubproduct,
}: {
  idProduct: string;
  idSubproduct: string;
}) => {
  const router = useRouter();

  const [inforUpload, setInforUpload] = React.useState<any[]>([]);
  const [form, setForm] = React.useState(initialForm);
  const [uploadJson, setUploadJson] = React.useState<string>("{}");

  const [addSubProduct] = useAddSubProductMutation();

  const handleForm = (value: any, key: string) => {
    setForm({ ...form, [key]: value });
  };

  React.useEffect(() => {
    handleForm(inforUpload, "images");
  }, [inforUpload]);

  const { subProduct }: { subProduct: SubProduct } = useGetSubProductQuery(
    { id: idSubproduct },
    {
      selectFromResult: ({ data, isFetching }) => {
        return {
          subProduct: data?.result,
          isFetching,
        };
      },
    },
  );

  const { baseColors } = useGetColorsQuery(
    { id: "a7316c60-5024-4b3f-842d-67ebe51d05c6" },
    {
      selectFromResult: ({ data }) => {
        return {
          baseColors: data?.result?.split(",").map((color: string) => ({
            label:
              enums.ColorTranslate[
                color.toUpperCase() as keyof typeof enums.ColorTranslate
              ],
            value: color,
            hex: enums.Color[
              color.toUpperCase() as keyof typeof enums.ColorTranslate
            ],
          })),
        };
      },
    },
  );
  const { baseSizes } = useGetSizesQuery(
    { id: "a7316c60-5024-4b3f-842d-67ebe51d05c6" },
    {
      selectFromResult: ({ data }) => {
        return {
          baseSizes: data?.result?.split(","),
        };
      },
    },
  );

  const handleInputPrice = (event: any) => {
    let number = Number(
      event.target.value.replaceAll(".", "").replaceAll(",", ""),
    );

    if (isNaN(number) && number < 0) {
      event.preventDefault();

      return;
    }

    handleForm(number, event.target.id);
  };

  const handleSubmitForm = () => {
    const newProduct = {
      id: idSubproduct,
      name: subProduct?.name,
      content: uploadJson.length != 0 ? uploadJson : subProduct.content,
      images:
        form.images.length != 0
          ? form.images.map((image: { url: string }) => image?.url)
          : subProduct.images,
      price: form.price ?? subProduct.price,
      color: form.color ?? subProduct.color,
      sizes: form.sizes ?? subProduct.sizes,
      isPublic: true,
      templateId: idProduct,
      authorId: subProduct?.authorId ?? "5d6f809e-0e4f-404c-b02f-419466ef177c",
      lensVRUrl: subProduct?.lensVRUrl ?? "aaaaa",
      canvasCode: `${subProduct?.id}-${form.color.toUpperCase()}`,
    };

    const promise = () =>
      new Promise<void>(async (resolve, reject) => {
        try {
          await addSubProduct(newProduct).unwrap();

          return resolve();
        } catch (err) {
          return reject();
        }
      });

    toast.promise(promise, {
      loading: "Loading...",
      success: "Edit product success",
      error: "Edit product error",
    });
  };

  return (
    <div className="flex flex-col">
      <Toaster closeButton richColors position="top-right" />
      <div className="flex w-full gap-4">
        <button
          className="text-xl text-slate-600 hover:text-foreground"
          onClick={() => router.back()}
        >
          <Icon icon="solar:alt-arrow-left-line-duotone" />
        </button>
        <h3 className="text-xl font-medium uppercase">Sửa mẫu sản phẩm mới</h3>
      </div>
      <p className="mt-4 opacity-85">
        Điền thông tin bên dưới để sửa mẫu sản phẩm mới
      </p>
      <div className="mt-5 grid max-w-[900px] grid-cols-1 gap-5">
        <RadioGroup
          aria-label="Color"
          classNames={{
            base: "ml-1 mt-6",
            wrapper: "gap-2",
          }}
          defaultValue={item.availableColors?.at(0)?.hex}
          label="Chọn màu sản phẩm"
          orientation="horizontal"
          onChange={({ target }) => {
            handleForm(target.value, "color");
          }}
        >
          {baseColors?.map(
            ({
              label,
              hex,
              value,
            }: {
              label: string;
              hex: string;
              value: string;
            }) => (
              <ColorRadioItem
                key={hex}
                color={hex}
                tooltip={label}
                value={value}
              />
            ),
          )}
        </RadioGroup>
        <CheckboxGroup
          aria-label="Select size"
          className="gap-1"
          // defaultValue="39"
          label="Chọn kích cỡ sản phẩm"
          orientation="horizontal"
          onChange={(value) => {
            handleForm(value.join(","), "sizes");
          }}
        >
          {baseSizes?.map((size: string) => (
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
            id="price"
            label="Giá sản phẩm"
            labelPlacement="outside"
            placeholder="Nhập giá sản phẩm"
            type="text"
            value={form.price.toLocaleString()}
            onChange={handleInputPrice}
          />
          <Input
            isRequired
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-small text-default-400">VNĐ</span>
              </div>
            }
            id="discountPrice"
            label="Giá khuyến mãi"
            labelPlacement="outside"
            pattern="^\d+$"
            // placeholder="Nhập giá khuyến mãi"
            type="text"
            value={Number(form.discountPrice).toLocaleString()}
            onChange={handleInputPrice}
          />
        </div>
        <UploadJson label="Json của sản phẩm" setInforUpload={setUploadJson} />
        <UploadImage
          inforUpload={inforUpload}
          label="Ảnh của sản phẩm"
          setInforUpload={setInforUpload}
        />
        <Button color="primary" onClick={handleSubmitForm}>
          Xác nhận
        </Button>
      </div>
    </div>
  );
};

export default AdminEditSubProduct;
