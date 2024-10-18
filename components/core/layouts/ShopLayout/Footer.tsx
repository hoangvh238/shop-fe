import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">StyledUp</h3>
            <p className="text-sm text-gray-400">
              Chọn ngay cho mình một chiếc áo thun và tự thiết kế theo phong
              cách của bạn
            </p>
          </div>
          <div>
            <h4 className="text-md mb-4 font-semibold">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-sm text-gray-400 hover:text-white"
                  href="/"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-400 hover:text-white"
                  href="/san-pham"
                >
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-400 hover:text-white"
                  href="/bai-viet"
                >
                  Bài viết
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-gray-400 hover:text-white"
                  href="/lien-he"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md mb-4 font-semibold">Liên hệ</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-400">0828 828 497</li>
              <li className="text-sm text-gray-400">thanhly.dev@gmail.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-md mb-4 font-semibold">Theo dõi chúng tôi</h4>
            <div className="flex space-x-4">
              <Link className="text-gray-400 hover:text-white" href="#">
                <Facebook size={20} />
              </Link>
              <Link className="text-gray-400 hover:text-white" href="#">
                <Instagram size={20} />
              </Link>
              <Link className="text-gray-400 hover:text-white" href="#">
                <Twitter size={20} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} StyledUp. Tất cả các quyền được
            bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
