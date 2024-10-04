"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const Direction = ({ name }: { name: string }) => {
  return (
    <Breadcrumbs className="px-6">
      <BreadcrumbItem>
        <Link href="/">Trang chủ</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>{name}</BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default Direction;
