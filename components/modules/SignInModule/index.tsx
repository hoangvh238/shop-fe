"use client";

import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/button";
import { Checkbox, Divider, Input } from "@nextui-org/react";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import React from "react";

import { auth, provider } from "@/services/config";

function SignInModule() {
  const [isVisible, setIsVisible] = React.useState(false);


  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const resFirebase: any = await signInWithPopup(
        auth,
        provider.providerGoogle,
      );

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleFacebookLogin = async () => {
    try {
      const resFirebase: any = await signInWithPopup(
        auth,
        provider.providerFacebook,
      );

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
    } catch (error: any) {
      console.log(error);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex w-full items-center justify-center bg-background py-20">
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

        <form
          className="flex w-full flex-col gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            label="Số điện thoại"
            name="phone"
            placeholder="Nhập số điện thoại của bạn"
            type="phone"
            variant="underlined"
          />
          <Input
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
            label="Mật khẩu"
            name="password"
            placeholder="Nhập mật khẩu của bạn"
            type={isVisible ? "text" : "password"}
            variant="underlined"
          />
          <div className="flex items-center justify-between px-1 py-2">
            <Checkbox name="remember" size="sm">
              Nhớ mật khẩu
            </Checkbox>
            <Link className="text-default-500" href="#">
              Quên mật khẩu?
            </Link>
          </div>
          <Button color="primary" type="submit">
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
