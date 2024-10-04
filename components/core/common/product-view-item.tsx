"use client";

import React from "react";
import {
  Button,
  Image,
  Input,
  Link,
  RadioGroup,
  ScrollShadow,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next-nprogress-bar";

import ColorRadioItem from "./color-radio-item";
import TagGroupRadioItem from "./tag-group-radio-item";

import { cn } from "@/utils/cn";
import { useAddCardMutation } from "@/store/queries/cartManagement";
import { enums } from "@/settings";

export type ProductViewItemColor = {
  name: string;
  hex: string;
};

export type ProductViewItem = {
  id: string;
  name: string;
  description?: string;
  images: string[];
  price: number | string;
  rating?: number;
  ratingCount?: number;
  sizes?: string[];
  isPopular?: boolean;
  details?: {
    title: string;
    items: string[];
  }[];
  availableColors?: ProductViewItemColor[];
};

export type ProductViewInfoProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "id"
> & {
  isPopular?: boolean;
  isLoading?: boolean;
  removeWrapper?: boolean;
  name: string;
  colors: Array<{
    name: string;
    hex: string;
  }>;
  items: Array<Item>;
} & ProductViewItem;

type Item = {
  images: Array<string>;
  lensVRUrl: string;
  price: number;
  color: string;
  sizes: string;
  authorId: string;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  id: string;
};

const ProductViewInfo = React.forwardRef<HTMLDivElement, ProductViewInfoProps>(
  ({ name, colors, items, isPopular, className, ...props }, ref) => {
    const [isStarred, setIsStarred] = React.useState(false);
    const [quatity, setQuantity] = React.useState<string>("1");
    const [size, setSize] = React.useState("");

    const [addCart] = useAddCardMutation();

    const [selectedImage, setSelectedImage] = React.useState(
      items[0]?.images[0],
    );

    const [selectItem, setSelectItem] = React.useState<Item | undefined>(
      items[0],
    );

    React.useEffect(() => {
      setSelectItem(items[0]);
    }, [items]);

    const handleAddToCart = async () => {
      try {
        await addCart({
          quantity: Number(quatity),
          customCanvasId: selectItem?.id,
          size: size,
        });
      } catch (err) {
        console.log('err', err);
      }
    };
    const handleBuy = async () => {
      try {
        await addCart({
          quantity: Number(quatity),
          customCanvasId: selectItem?.id,
          size: size,
        });
        router.push(`/checkout?itemProduct=${selectItem?.id}&size=${size}`);
      } catch (err) {
        console.log('err', err);
      }
    };

    const decQuantity = () => {
      setQuantity(String(Number(quatity) - 1));
    };
    const incQuantity = () => {
      setQuantity(String(Number(quatity) + 1));
    };

    const valueQuantity: string = React.useMemo(() => {
      const numberQuantity = Number(quatity);

      if (numberQuantity >= 1 || quatity == "") return quatity;
      setQuantity("1");

      return "1";
    }, [quatity]);

    const router = useRouter();

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8",
          className,
        )}
        {...props}
      >
        {/* Product Gallery */}
        <div className="relative h-full w-full flex-none">
          <Button
            isIconOnly
            className={cn("absolute left-3 top-3 z-20", {
              // hidden: isPopular,
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
          {/* Main Image */}
          <Image
            alt={name}
            className="h-full w-full"
            radius="lg"
            src={selectedImage}
          />
          {/* Image Gallery */}
          <ScrollShadow
            className="-mx-2 -mb-4 mt-4 flex w-full max-w-full gap-4 px-2 pb-4 pt-2"
            orientation="horizontal"
          >
            {selectItem?.images?.map((image, index) => (
              <button
                key={`${image}-${index}`}
                className="relative h-24 w-24 flex-none cursor-pointer items-center justify-center rounded-medium ring-offset-background transition-shadow data-[selected=true]:outline-none data-[selected=true]:ring-2 data-[selected=true]:ring-focus data-[selected=true]:ring-offset-2"
                data-selected={image === selectedImage}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  removeWrapper
                  alt={name}
                  classNames={{
                    img: "h-full w-full",
                  }}
                  radius="lg"
                  src={image}
                />
              </button>
            ))}
          </ScrollShadow>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
          <h2 className="sr-only">Product information</h2>
          {/* <div className="my-2 flex items-center gap-2">
            <RatingRadioGroup hideStarsText size="sm" value={`${rating}`} />
            <p className="text-small text-default-400">
              {ratingCount} {ratingCount === 1 ? "review" : "reviews"}
            </p>
          </div> */}
          <p className="text-xl font-medium tracking-tight">
            {((selectItem?.price ?? 0) * Number(quatity)).toLocaleString(
              "vi-VN",
            )}{" "}
            VNĐ
          </p>
          {/* <div className="mt-4">
            <p className="sr-only">Product description</p>
            <p className="line-clamp-3 text-medium text-default-500">
              {description}
            </p>
          </div> */}
          <RadioGroup
            aria-label="Color"
            classNames={{
              base: "ml-1 mt-6",
              wrapper: "gap-2",
            }}
            value={enums.Color[selectItem?.color as keyof typeof enums.Color]}
            orientation="horizontal"
            onChange={(e) => {
              const newSelectionItem = items.find(
                (item: Item) => item?.color === e.target.value,
              );

              setSize("");
              setSelectItem(newSelectionItem);
            }}
          >
            {colors?.map(({ name, hex }) => (
              <ColorRadioItem
                key={name}
                color={hex}
                tooltip={name}
                value={name}
              />
            ))}
          </RadioGroup>
          <div className="mt-6 flex flex-col gap-1">
            <div className="mb-4 flex items-center gap-2 text-default-700">
              <Icon icon="carbon:delivery" width={24} />
              <p className="text-small font-medium">
                Giao hàng trong vòng 15 ngày
              </p>
            </div>
            <RadioGroup
              aria-label="Select size"
              className="gap-1"
              value={size}
              onChange={({ target }) => setSize(target.value)}
              orientation="horizontal"
            >
              {selectItem?.sizes?.split(",")?.map((size) => (
                <TagGroupRadioItem key={size} size="lg" value={size}>
                  {size}
                </TagGroupRadioItem>
              ))}
            </RadioGroup>
            <div className="mt-8 flex max-w-60 items-center gap-1">
              <Button className="h-10" size="sm" onClick={decQuantity}>
                -
              </Button>
              <Input
                isRequired
                classNames={{
                  base: "w-20",
                }}
                defaultValue="1"
                labelPlacement="outside"
                value={valueQuantity}
                width={40}
                onChange={({ target }) => {
                  setQuantity(target.value);
                }}
              />
              <Button className="h-10" size="sm" onClick={incQuantity}>
                +
              </Button>
            </div>
            <Link
              isExternal
              className="my-2 text-default-400"
              href="#"
              size="sm"
            >
              Hướng dẫn
              <Icon
                className="[&>path]:stroke-[2px]"
                icon="solar:arrow-right-up-linear"
              />
            </Link>
          </div>
          {/* <Accordion
            className="-mx-1 mt-2"
            itemClasses={{
              title: "text-default-400",
              content: "pt-0 pb-6 text-base text-default-500",
            }}
            items={name}
            selectionMode="multiple"
          >
            {name
              ? details.map(({ title, items }) => (
                <AccordionItem key={title} title={title}>
                  <ul className="list-inside list-disc">
                    {items.map((item) => (
                      <li key={item} className="text-default-500">
                        {item}
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              ))
              : []}
          </Accordion> */}
          <div className="mt-2 flex flex-col gap-2">
            <Button
              fullWidth
              className="text-medium font-medium"
              color="primary"
              isDisabled={!size || !quatity}
              size="lg"
              startContent={<Icon icon="solar:cart-large-2-bold" width={24} />}
              onClick={handleBuy}
            >
              Mua ngay
            </Button>
            <Button
              fullWidth
              className="text-medium font-medium"
              color="primary"
              isDisabled={!size || !quatity}
              size="lg"
              startContent={<Icon icon="solar:cart-plus-outline" width={24} />}
              variant="bordered"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </Button>
            <a
              href="http://localhost:3001/editor/123"
              rel="noreferrer"
              target="_blank"
            >
              <Button
                fullWidth
                className="text-medium font-medium"
                color="primary"
                size="lg"
                startContent={<Icon icon="solar:pen-2-linear" width={24} />}
                variant="flat"
              >
                Tự thiết kế
              </Button>
            </a>
            {/* <Button
              isIconOnly
              className="text-default-600"
              size="lg"
              variant="flat"
              onPress={() => setIsStarred(!isStarred)}
            >
              {isStarred ? (
                <Icon icon="solar:heart-bold" width={24} />
              ) : (
                <Icon icon="solar:heart-linear" width={24} />
              )}
            </Button> */}
          </div>
        </div>
      </div>
    );
  },
);

ProductViewInfo.displayName = "ProductViewInfo";

export default ProductViewInfo;
