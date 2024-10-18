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
    <div className="w-full bg-slate-800 py-2 text-sm text-white lg:px-24">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            className="flex items-center hover:text-gray-300"
            href="tel:0828828497"
          >
            <Phone className="mr-2 h-4 w-4" />
            <span>0828 828 497</span>
          </Link>
          <Link
            className="flex items-center hover:text-gray-300"
            href="mailto:thangtv.dev@gmail.com"
          >
            <Mail className="mr-2 h-4 w-4" />
            <span>thangtv.dev@gmail.com</span>
          </Link>
        </div>
        <div className="hidden py-1 text-center md:block">
          Theo dõi chúng tôi để nhận các ưu đãi cực kỳ hấp dẫn lên đến 80%
        </div>
        <div className="flex items-center space-x-4">
          <Link className="hover:text-gray-300" href="#">
            <Instagram className="h-4 w-4" />
          </Link>
          <Link className="hover:text-gray-300" href="#">
            <Youtube className="h-4 w-4" />
          </Link>
          <Link className="hover:text-gray-300" href="#">
            <Facebook className="h-4 w-4" />
          </Link>
          <Link className="hover:text-gray-300" href="#">
            <Twitter className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
