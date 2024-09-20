"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import RatingRadioGroup from "./rating-radio-group";

import { cn } from "@/utils/cn";
import Image from "next/image";
import { useRouter } from "next-nprogress-bar";

export type ProductListItemColor = {
  name: string;
  hex: string;
};

export type ProductItem = {
  id: string;
  name: string;
  href: string;
  price: number | string;
  color: string;
  size: string;
  isNew?: boolean;
  rating?: number;
  availableColors?: ProductListItemColor[];
  ratingCount?: number;
  description?: string;
  imageSrc: string;
};

export type ProductListItemProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "id"
> & {
  isPopular?: boolean;
  removeWrapper?: boolean;
} & ProductItem;

const ProductListItem = React.forwardRef<HTMLDivElement, ProductListItemProps>(
  (
    {
      name,
      price,
      rating,
      ratingCount,
      description,
      imageSrc,
      isNew,
      isPopular,
      availableColors,
      removeWrapper,
      className,
      ...props
    },
    ref,
  ) => {
    const [isStarred, setIsStarred] = React.useState(false);
    const hasColors = availableColors && availableColors?.length > 0;

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
        {isNew && isPopular ? (
          <span className="absolute right-7 top-7 z-20 text-tiny font-semibold text-default-400">
            NEW
          </span>
        ) : null}
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
            <p className="text-small text-default-500">{description}</p>
          </div>
          <Image
            alt={name}
            className={cn(
              "h-full w-full object-cover transition-all hover:scale-105",
              {
                "flex h-full w-56 items-center": isPopular,
                // "mb-2": hasColors,
              },
            )}
            height={500}
            src={imageSrc}
            width={300}
            onClick={() => router.push("/product/1")}
          />
        </div>
        <div className="flex flex-col gap-3 p-4">
          {hasColors ? (
            <div className="">
              <h4 className="sr-only">Available colors</h4>
              <ul className="mt-auto flex items-center justify-center space-x-3">
                {availableColors.map((color) => (
                  <li
                    key={color.name}
                    className="h-2 w-2 rounded-full border border-default-300 border-opacity-10"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className="sr-only">{color.name}</span>
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
            <p className="text-medium font-medium text-red-500">{price} VNĐ</p>
            <h3 className="text-medium font-medium text-default-700">{name}</h3>
          </div>
          {description && !isPopular ? (
            <p className="text-small text-default-500">{description}</p>
          ) : null}
          {rating !== undefined ? (
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
          ) : null}
          {/* <div className="flex gap-2">
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
            >
              Thêm vào giỏ hàng
            </Button>
          </div> */}
        </div>
      </div>
    );
  },
);

ProductListItem.displayName = "ProductListItem";

export default ProductListItem;
