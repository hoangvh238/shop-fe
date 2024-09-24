"use client";

import Link from "next/link";
import { Search, ShoppingCart, Heart } from "lucide-react";
import { useRouter } from "next-nprogress-bar";

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          StyledUp
        </Link>

        <nav className="hidden space-x-6 md:flex">
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            Trang chủ
          </Link>
          <Link href="/product" className="text-gray-600 hover:text-gray-800">
            Sản phẩm
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-gray-800">
            Bài viết
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-800">
            Liên hệ
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/sign-in" className="text-blue-500 hover:text-blue-600">
            Đăng nhập / Đăng ký
          </Link>
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
        </div>
      </div>
    </header>
  );
}
