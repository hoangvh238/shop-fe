"use client";
import {
  Avatar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  User,
  Button,
  Link,
  Input,
} from "@nextui-org/react";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import React from "react";
import Image from "next/image";

import webStorageClient from "@/utils/webStorageClient";
import { useGetCartQuery } from "@/store/queries/cartManagement";
import webLocalStorage from "@/utils/webLocalStorage";
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

  const { cartItems, isSuccess } = useGetCartQuery(null, {
    selectFromResult: ({ data, isSuccess, error }) => {
      if (error) {
        const newData = webLocalStorage.get("cart");

        return {
          cartItems: newData ?? [],
          isSuccess,
        };
      }

      return {
        cartItems: data?.result?.items ?? [],
        isSuccess,
      };
    },
    refetchOnMountOrArgChange: true,
  });

  console.log("cartItems", cartItems);

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
          <Input
            className="w-max"
            placeholder="Tìm kiếm sản phẩm"
            startContent={<Search className="h-5 w-5" />}
            onSubmit={() => {
              console.log("1", 1);
            }}
          />

          <Tooltip
            closeDelay={500}
            content={
              <div className="mx-auto max-w-md bg-white p-4">
                <h2 className="mb-2 text-xl font-normal text-gray-600">
                  Sản Phẩm Mới Thêm
                </h2>
                <div className="border-t border-gray-200">
                  {cartItems.map((cart: any) => (
                    <div
                      key={cart?.customCanvas?.id}
                      className="flex items-center border-b border-gray-200 py-2"
                    >
                      <Image
                        alt={cart?.customCanvas?.name}
                        className="w-15 h-15 mr-3 object-cover"
                        height={50}
                        src={cart?.customCanvas?.images[0]}
                        width={50}
                      />
                      <div className="flex-grow">
                        <Link
                          className="text-sm text-gray-800"
                          href={`/customProduct/${cart?.customCanvas?.id}`}
                          underline="hover"
                        >
                          {cart?.customCanvas?.name}
                        </Link>
                        <p className="text-sm font-bold text-red-500">
                          ₫{cart?.customCanvas?.price?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {cartItems?.length ?? 0} Thêm Hàng Vào Giỏ
                  </span>
                  <button className="rounded bg-primary px-4 py-2 text-white">
                    Xem Giỏ Hàng
                  </button>
                </div>
              </div>
            }
            delay={200}
          >
            <button
              className="relative text-gray-600 hover:text-gray-800"
              onClick={() => router.push("/checkout")}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                {cartItems?.length ?? 0}
              </span>
            </button>
          </Tooltip>

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
                  name={user?.email[0] ?? "Ẩn danh"}
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
