"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next-nprogress-bar";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { toast, Toaster } from "sonner";

import {
  useAddProductMutation,
  useGetProductQuery,
} from "@/store/queries/productManagement";
import UploadImage from "@/components/core/common/upload-image";

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

const initialForm = {
  nameProduct: "",
  codeProduct: "",
  discProduct: "",
  images: [],
};

function EditProduct({ idProduct }: { idProduct: string }) {
  const router = useRouter();
  const [form, setForm] = React.useState(initialForm);
  const [inforUpload, setInforUpload] = React.useState<any[]>([]);

  const [addProduct] = useAddProductMutation();

  React.useEffect(() => {
    handleForm("images", inforUpload);
  }, [inforUpload]);

  const handleForm = (key: string, value: string | string[]) => {
    setForm({ ...form, [key]: value });
  };

  const { product, isFetching } = useGetProductQuery(
    { id: idProduct },
    {
      selectFromResult: ({ data, isFetching }) => {
        return {
          product: data?.result,
          isFetching,
        };
      },
    },
  );

  const submitForm = async () => {
    const newProduct = {
      id: idProduct,
      name: form?.nameProduct ?? product?.name,
      descriptions: form?.discProduct ?? product?.descriptions,
      images:
        form?.images?.length != 0
          ? form.images.map((image: { url: string }) => image?.url)
          : product?.images,
      templateCode: form?.codeProduct ?? product?.templateCode,
      content: "{}",
      providerId: product?.providerId ?? "eb84fd5f-31b1-4222-99b6-d10aff379506",
    };
    const promise = () =>
      new Promise<void>(async (resolve, reject) => {
        try {
          await addProduct(newProduct).unwrap();

          return resolve();
        } catch (err) {
          return reject();
        }
      });

    toast.promise(promise, {
      loading: "Loading...",
      success: "Edit success",
      error: "Edit error",
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
        <h3 className="text-xl font-medium uppercase">Sửa sản phẩm</h3>
      </div>
      <p className="mt-4 opacity-85">Điền thông tin bên dưới để sửa sản phẩm</p>
      <div className="mt-5 grid max-w-[900px] grid-cols-1 gap-5">
        <Input
          isRequired
          id="nameProduct"
          label="Tên sản phẩm"
          labelPlacement="outside"
          placeholder="Nhập tên sản phẩm"
          onChange={({ target }) => handleForm(target.id, target.value)}
        />
        <Input
          isRequired
          id="codeProduct"
          label="Mã sản phẩm"
          labelPlacement="outside"
          placeholder="Nhập mã sản phẩm"
          onChange={({ target }) => handleForm(target.id, target.value)}
        />
        <Textarea
          isRequired
          id="discProduct"
          label="Mô tả sản phẩm"
          labelPlacement="outside"
          minRows={5}
          placeholder="Nhập mô tả sản phẩm"
          onChange={({ target }) => handleForm(target.id, target.value)}
        />
        <UploadImage
          inforUpload={inforUpload}
          setInforUpload={setInforUpload}
        />
        <Button color="primary" isDisabled={isFetching} onClick={submitForm}>
          Xác nhận
        </Button>
      </div>
    </div>
  );
}

export default EditProduct;
