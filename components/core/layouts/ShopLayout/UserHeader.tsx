"use client";
import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
} from "@nextui-org/react";
import Link from "next/link";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import React from "react";

import webStorageClient from "@/utils/webStorageClient";
function HeaderShopLayout({ user }: any) {
  const router = useRouter();

  const handleLogout = () => {
    webStorageClient.removeAll();
    router.push("/sign-in");
    router.refresh();
  };

  const role = React.useMemo(() => {
    return user?.scope?.some((scope: string) => scope?.includes("Admin"))
      ? "Quản lí"
      : "Khách hàng";
  }, [user]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-lg transition-all duration-500 lg:px-24">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link className="text-2xl font-bold text-gray-800" href="/">
          StyledUp
        </Link>
        <nav className="hidden space-x-6 md:flex">
          <Link className="text-gray-600 hover:text-primary" href="/">
            Trang chủ
          </Link>
          <Link className="text-gray-600 hover:text-primary" href="/product">
            Sản phẩm
          </Link>
          <Link className="text-gray-600 hover:text-primary" href="/blog">
            Bài viết
          </Link>
          <Link className="text-gray-600 hover:text-primary" href="/contact">
            Liên hệ
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800">
            <Search className="h-5 w-5" />
          </button>
          <button
            className="relative text-gray-600 hover:text-gray-800"
            onClick={() => router.push("/checkout")}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
              1
            </span>
          </button>
          <button className="relative text-gray-600 hover:text-gray-800">
            <Heart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
              1
            </span>
          </button>

          <Popover placement="bottom" showArrow={true}>
            <PopoverTrigger>
              <Avatar className="cursor-pointer" src={user?.picture ?? ""} />
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-2 px-1 py-2">
                <User
                  avatarProps={{
                    src: user?.picture ?? "",
                  }}
                  classNames={{
                    description:
                      role === "Quản lí" ? "text-red-500" : "text-blue-500",
                  }}
                  description={role}
                  name={user?.email ?? "Ẩn danh"}
                />
                <span className="h-px w-full bg-gray-400" />
                <Link
                  className="text-gray-600 hover:text-primary"
                  href="/setting"
                >
                  Tài khoản của tôi
                </Link>
                <Link
                  className="text-gray-600 hover:text-primary"
                  href="/checkout"
                >
                  Giỏ hàng của tôi
                </Link>
                <button
                  className="flex cursor-pointer items-start text-gray-600 hover:text-primary"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            className="transition-all duration-500 hover:bg-foreground hover:text-background hover:opacity-100"
            data-hover={false}
            onClick={handleLogout}
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    </header>
  );
}

export default HeaderShopLayout;
