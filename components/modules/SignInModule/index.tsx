"use client";

import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/button";
import { Checkbox, Divider, Input } from "@nextui-org/react";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import React from "react";
import { Toaster } from "sonner";
import { jwtDecode } from "jwt-decode";
import { useSearchParams } from "next/navigation";

import { auth, provider } from "@/services/config";
import webStorageClient from "@/utils/webStorageClient";
import {
  useLoginGoogleMutation,
  useSignInMutation,
} from "@/store/queries/auth";
import { validateEmail } from "@/utils/validationEmail";
import { constants } from "@/settings";
import webLocalStorage from "@/utils/webLocalStorage";
import { useAddCardMutation } from "@/store/queries/cartManagement";

type Form = {
  isRemember: boolean;
  email: string;
  password: string;
};
const initialForm: Form = {
  email: "",
  password: "",
  isRemember: false,
};

function SignInModule() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [form, setForm] = React.useState(initialForm);
  const [isSubmit, setSubmit] = React.useState(false);

  const [signIn] = useSignInMutation();
  const [loginGoogle, { isLoading }] = useLoginGoogleMutation();
  const [addCart] = useAddCardMutation();

  const params = useSearchParams();

  const urlRedirect = params.get("redirect") ?? "/";

  const router = useRouter();

  const handleForm = (value: any, key: string) => {
    setForm({ ...form, [key]: value });
  };

  function checkFields(form: any) {
    for (const [key, value] of Object.entries(form)) {
      if (!value && key !== "isRemember") {
        return false;
      }
    }

    return validateEmail(form.email);
  }
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);
    if (!checkFields(form)) return;
    try {
      const data = await signIn(form).unwrap();

      if (data) {
        webStorageClient.setToken(data?.result?.accessToken);
        router.push(urlRedirect);
      }
    } catch (err) { }
  };

  const handleGoogleLogin = async () => {
    try {
      const token: any = await signInWithPopup(auth, provider.providerGoogle);
      const { data } = await loginGoogle({
        accessToken: token?.user?.accessToken,
      });

      webStorageClient.setToken(data?.result?.accessToken);
      const user = jwtDecode(data?.result?.accessToken);

      webStorageClient.set(constants.USER_INFO, user);
      const dataCart = webLocalStorage.get("cart");

      if (dataCart) {
        dataCart.forEach((data: any) => {
          addCart({
            quantity: data?.quantity,
            customCanvasId: data?.customCanvas?.id,
            size: data?.size,
          });
        });
        webLocalStorage.set("cart", []);
      }
      setTimeout(() => {
        router.push(urlRedirect);
        router.refresh();
      }, 1000);
    } catch (error: any) { }
  };
  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, provider.providerFacebook);

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
    } catch (error: any) { }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex w-full items-center justify-center bg-background py-20">
      <Toaster closeButton richColors position="top-right" />
      <div className="flex w-full max-w-sm flex-col items-center gap-4 p-4">
        <div className="w-full text-left">
          <p className="pb-2 text-xl font-medium">Đăng nhập</p>
          <p className="text-small text-default-500">
            Vui lòng đăng nhập để tiếp tục
          </p>
        </div>

        <div className="flex w-full flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
            onClick={handleGoogleLogin}
          >
            Tiếp tục với Google
          </Button>
          <Button
            startContent={
              <Icon className="text-[#0765ff]" icon="fe:facebook" width={24} />
            }
            variant="bordered"
            onClick={handleFacebookLogin}
          >
            Tiếp tục với Facebook
          </Button>
        </div>

        <div className="flex w-full items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="text-default-500oặc shrink-0 text-tiny uppercase">
            Hoặc
          </p>
          <Divider className="flex-1" />
        </div>

        <form className="flex w-full flex-col gap-3" onSubmit={submitForm}>
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
            <Checkbox name="remember" size="sm">
              Nhớ mật khẩu
            </Checkbox>
            <Link className="text-default-500" href="#">
              Quên mật khẩu?
            </Link>
          </div>
          <Button color="primary" isLoading={isLoading} type="submit">
            Đăng nhập
          </Button>
        </form>

        <p className="text-center text-small">
          Chưa có tài khoản?&nbsp;
          <Link href="/sign-up">Đăng ký</Link>
        </p>
      </div>
    </div>
  );
}

export default SignInModule;
