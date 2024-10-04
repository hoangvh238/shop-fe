"use client";

import type { InputProps } from "@nextui-org/react";

import React from "react";
import { Input } from "@nextui-org/react";

import { cn } from "@/utils/cn";

export type ShippingFormProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: InputProps["variant"];
  hideTitle?: boolean;
  submitOrder: (item: any) => void;
  inputShipping: FormShippingType;
};

export type FormShippingType = {
  email: string;
  firstname: string;
  lastname: string;
  street: string;
  district: string;
  city: string;
  phoneNumber: string;
};

const ShippingForm = React.forwardRef<HTMLDivElement, ShippingFormProps>(
  (
    { variant = "flat", className, inputShipping, hideTitle, submitOrder },
    ref,
  ) => {
    const [form, setForm] = React.useState(inputShipping);

    const handleForm = (value: string, key: string) => {
      setForm({
        ...form,
        [key]: value,
      });
    };

    React.useEffect(() => {
      submitOrder(form);
    }, [form]);

    return (
      <div ref={ref} className={cn("flex flex-col gap-4", className)}>
        {!hideTitle && (
          <span className="relative text-foreground-500">
            Shipping Information
          </span>
        )}
        <Input
          isRequired
          id="email"
          label="Email"
          labelPlacement="outside"
          placeholder="thangtbv@gmail.com"
          type="email"
          value={form.email}
          variant={variant}
          onChange={({ target }) => {
            handleForm(target.value, target.id);
          }}
        />
        <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
          <Input
            isRequired
            id="firstname"
            label="Họ"
            labelPlacement="outside"
            placeholder="Trần Văn Bảo"
            value={form.firstname}
            variant={variant}
            onChange={({ target }) => {
              handleForm(target.value, target.id);
            }}
          />
          <Input
            isRequired
            id="lastname"
            label="Tên"
            labelPlacement="outside"
            placeholder="Thắng"
            value={form.lastname}
            variant={variant}
            onChange={({ target }) => {
              handleForm(target.value, target.id);
            }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
          <Input
            isRequired
            id="street"
            label="Đường"
            labelPlacement="outside"
            placeholder="kiệt 2, 89 Mẹ Nhu"
            value={form.street}
            variant={variant}
            onChange={({ target }) => {
              handleForm(target.value, target.id);
            }}
          />
          <Input
            id="district"
            label="Huyện, Quận"
            labelPlacement="outside"
            placeholder="Thanh khê"
            value={form.district}
            variant={variant}
            onChange={({ target }) => {
              handleForm(target.value, target.id);
            }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
          <Input
            isRequired
            id="city"
            label="Thành phố"
            labelPlacement="outside"
            placeholder="Đà Nẵng"
            value={form.city}
            variant={variant}
            onChange={({ target }) => {
              handleForm(target.value, target.id);
            }}
          />
          <Input
            isRequired
            id="phoneNumber"
            label="SDT"
            labelPlacement="outside"
            placeholder="(666) 666 666"
            startContent={<p>+84</p>}
            value={form.phoneNumber}
            variant={variant}
            onChange={({ target }) => {
              handleForm(target.value, target.id);
            }}
          />
        </div>
      </div>
    );
  },
);

ShippingForm.displayName = "ShippingForm";

export default ShippingForm;
