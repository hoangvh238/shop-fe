"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import React from "react";
import Link from "next/link";
import { Toaster } from "sonner";

import { useSignUpMutation } from "@/store/queries/auth";
import { validateEmail } from "@/utils/validationEmail";
import toast from "@/components/core/common/toast-item";

type Form = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};
const initialForm: Form = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const SignUpModule = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [form, setForm] = React.useState(initialForm);
  const [isSubmit, setSubmit] = React.useState(false);
  const [signUp] = useSignUpMutation();

  const handleForm = (value: any, key: string) => {
    setForm({ ...form, [key]: value });
  };

  function checkFields(form: any) {
    for (const [, value] of Object.entries(form)) {
      if (!value) {
        return false;
      }
    }

    return validateEmail(form.email);
  }

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);
    if (!checkFields(form)) return;
    await toast(signUp, form, "Đăng kí");
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex w-full items-center justify-center bg-background py-20">
      <Toaster closeButton richColors position="top-right" />
      <div className="flex w-full max-w-sm flex-col items-center gap-4 p-4">
        <div className="w-full text-left">
          <p className="pb-2 text-xl font-medium">Đăng Kí</p>
          <p className="text-small text-default-500">
            Vui lòng đăng kí để tiếp tục
          </p>
        </div>
        <form className="flex w-full flex-col gap-3" onSubmit={submitForm}>
          <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
            <Input
              isRequired
              errorMessage="Please enter a firstName"
              id="firstName"
              isInvalid={form.firstName === "" && isSubmit}
              label="Họ"
              labelPlacement="outside"
              placeholder="Nhập họ của bạn"
              value={form.firstName}
              variant="underlined"
              onChange={({ target }) => {
                handleForm(target.value, target.id);
              }}
            />
            <Input
              isRequired
              errorMessage="Please enter a lastName"
              id="lastName"
              isInvalid={form.lastName === "" && isSubmit}
              label="Tên"
              labelPlacement="outside"
              placeholder="Nhập tên của bạn"
              value={form.lastName}
              variant="underlined"
              onChange={({ target }) => {
                handleForm(target.value, target.id);
              }}
            />
          </div>
          <Input
            isRequired
            errorMessage="Please enter a valid email"
            id="email"
            isInvalid={!validateEmail(form.email) && isSubmit}
            label="Tài khoản email"
            name="email"
            placeholder="Nhập email của bạn"
            type="email"
            value={form.email}
            variant="underlined"
            onChange={({ target }) => {
              handleForm(target.value, target.id);
            }}
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            errorMessage="Please enter a password"
            id="password"
            isInvalid={form.password === "" && isSubmit}
            label="Mật khẩu"
            name="password"
            placeholder="Nhập mật khẩu của bạn"
            type={isVisible ? "text" : "password"}
            value={form.password}
            variant="underlined"
            onChange={({ target }) => {
              handleForm(target.value, target.id);
            }}
          />
          <div className="flex items-center justify-between px-1 py-2">
            <Link className="text-default-500" href="#">
              Quên mật khẩu?
            </Link>
          </div>
          <Button color="primary" type="submit">
            Đăng nhập
          </Button>
        </form>

        <p className="text-center text-small">
          Đã có tài khoản?&nbsp;
          <Link className="text-blue-500" href="/sign-in">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpModule;
