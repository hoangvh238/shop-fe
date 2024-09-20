"use client";

import { User } from "@nextui-org/react";

import { AcmeIcon } from "@/components/core/common/icons";

function AuthLayout({ children }: { children: React.ReactElement }) {
  return (
    <div className="relative flex h-screen w-screen">
      {/* Brand Logo */}
      <div className="absolute left-2 top-5 lg:left-5">
        <div className="flex items-center">
          <AcmeIcon size={40} />
          <p className="font-medium">NextTeam</p>
        </div>
      </div>

      {children}

      {/* Right side */}
      <div
        className="relative hidden w-1/2 flex-col-reverse rounded-medium rounded-tr-none rounded-br-none p-10 shadow-small lg:flex"
        style={{
          backgroundImage:
            "url(https://vinaconex25.com.vn/wp-content/uploads/2020/06/20221012_HUNI_03.FUDN-Upper-entrance-option-scaled-e1669946408238.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      >
        <div className="flex flex-col items-end gap-4">
          <User
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
            }}
            classNames={{
              base: "flex flex-row-reverse",
              name: "w-full text-right text-white",
              description: "text-white/80",
            }}
            description="Founder & CEO at ACME"
            name="Bruno Reichert"
          />
          <p className="w-full text-right text-2xl text-white/60">
            <span className="font-medium">“</span>
            <span className="font-normal italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget
              augue nec massa volutpat aliquet.
            </span>
            <span className="font-medium">”</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
