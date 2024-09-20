import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import React from "react";

function TopBar() {
  return (
    <div className="w-full bg-slate-800 py-2 text-sm text-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="tel:0828828497"
            className="flex items-center hover:text-gray-300"
          >
            <Phone className="mr-2 h-4 w-4" />
            <span>0828 828 497</span>
          </Link>
          <Link
            href="mailto:thangtv.dev@gmail.com"
            className="flex items-center hover:text-gray-300"
          >
            <Mail className="mr-2 h-4 w-4" />
            <span>thangtv.dev@gmail.com</span>
          </Link>
        </div>
        <div className="hidden py-1 text-center md:block">
          Theo dõi chúng tôi để nhận các ưu đãi cực kỳ hấp dẫn lên đến 80%
        </div>
        <div className="flex items-center space-x-4">
          <Link href="#" className="hover:text-gray-300">
            <Instagram className="h-4 w-4" />
          </Link>
          <Link href="#" className="hover:text-gray-300">
            <Youtube className="h-4 w-4" />
          </Link>
          <Link href="#" className="hover:text-gray-300">
            <Facebook className="h-4 w-4" />
          </Link>
          <Link href="#" className="hover:text-gray-300">
            <Twitter className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
