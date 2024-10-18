"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next-nprogress-bar";

import SekeletonCard from "./seleketon";

import { cn } from "@/utils/cn";
import { ProductCustom } from "@/types/item-type";

export type ProductListItemProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "id"
> & {
  isPopular?: boolean;
  removeWrapper?: boolean;
  isLoading?: boolean;
} & ProductCustom;

const ProductListItem = React.forwardRef<HTMLDivElement, ProductListItemProps>(
  (
    {
      name,
      images,
      minPrice,
      colors,
      provider,
      // rating,
      // ratingCount,
      isPopular,
      removeWrapper,
      className,
      isLoading = false,
      ...props
    },
    ref,
  ) => {
    const [isStarred, setIsStarred] = React.useState(false);
    const hasColors = colors && colors?.length > 0;

    const router = useRouter();

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full max-w-full flex-none scroll-ml-6 flex-col overflow-hidden rounded-large bg-content1 shadow-medium",
          {
            "rounded-none bg-transparent shadow-none": removeWrapper,
          },
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <SekeletonCard />
        ) : (
          <>
            <Button
              isIconOnly
              className={cn("absolute right-3 top-3 z-20", {
                hidden: isPopular,
              })}
              radius="full"
              size="sm"
              variant="flat"
              onPress={() => setIsStarred(!isStarred)}
            >
              <Icon
                className={cn("text-default-500", {
                  "text-warning": isStarred,
                })}
                icon="solar:star-bold"
                width={16}
              />
            </Button>
            <div
              className={cn(
                "relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-content2",
                {
                  "h-full justify-between": isPopular,
                },
              )}
            >
              <div
                className={cn("flex flex-col gap-2 px-4 pt-6", {
                  hidden: !isPopular,
                })}
              >
                <h3 className="text-xl font-semibold tracking-tight text-default-800">
                  {name}
                </h3>
                <p className="text-small text-default-500">{provider?.name}</p>
              </div>
              <div className="group relative">
                <Image
                  alt={name}
                  className={cn(
                    "h-full w-full cursor-pointer object-cover opacity-100 transition-all duration-500 hover:scale-105 group-hover:opacity-0",
                    {
                      "flex h-full w-56 items-center": isPopular,
                      // "mb-2": hasColors,
                    },
                  )}
                  height={500}
                  src={images[0] ?? ""}
                  width={300}
                  onClick={() => router.push(`/product/${props?.id}`)}
                />
                <Image
                  alt={name}
                  className={cn(
                    "absolute inset-0 h-full w-full cursor-pointer object-cover opacity-0 transition-all duration-500 hover:scale-105 group-hover:opacity-100",
                    {
                      "flex h-full w-56 items-center": isPopular,
                      // "mb-2": hasColors,
                    },
                  )}
                  height={500}
                  src={images[1] ?? ""}
                  width={300}
                  onClick={() => router.push(`/product/${props?.id}`)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 p-4">
              {hasColors ? (
                <div className="">
                  <h4 className="sr-only">Available colors</h4>
                  <ul className="mt-auto flex items-center justify-center space-x-3">
                    {colors?.map((color) => (
                      <li
                        key={color?.name}
                        className="h-4 w-4 rounded-full border border-default-300 border-opacity-10"
                        style={{ backgroundColor: color?.hex }}
                      >
                        <span className="sr-only">{color?.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div
                className={cn("flex flex-col items-center justify-between", {
                  hidden: isPopular,
                })}
              >
                <p className="text-medium font-medium text-red-500">
                  {minPrice?.toLocaleString()} VNĐ
                </p>
                <h3 className="text-medium font-medium text-default-700">
                  {name}
                </h3>
              </div>
              {provider?.name && !isPopular ? (
                <p className="text-small text-default-500">{provider?.name}</p>
              ) : null}
              {/* {rating !== undefined ? (
            <RatingRadioGroup
              hideStarsText
              isReadOnly
              className="gap-1"
              label={
                <p className="text-small text-default-400">({ratingCount})</p>
              }
              size="sm"
              value={`${rating}`}
            />
          ) : null} */}
              <div className="flex gap-2">
                {isPopular ? (
                  <Button
                    fullWidth
                    className="bg-default-300/20 font-medium text-default-700"
                    radius="lg"
                    variant="flat"
                  >
                    Save
                  </Button>
                ) : null}
                <Button
                  fullWidth
                  className="font-medium"
                  color="primary"
                  radius="lg"
                  variant={isPopular ? "flat" : "solid"}
                  onClick={() => router.push(`/product/${props?.id}`)}
                >
                  Xem chi tiết
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  },
);

ProductListItem.displayName = "ProductListItem";

export default ProductListItem;
