"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button,
  Input,
  Link,
  RadioGroup,
  ScrollShadow,
} from "@nextui-org/react";
import {} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { ARIcon } from "./icons";
import ColorRadioItem from "./color-radio-item";
import TagGroupRadioItem from "./tag-group-radio-item";
import Toast from "./toast-item";

import { cn } from "@/utils/cn";
import CameraKitApp from "@/components/modules/CameraKit/CameraKitApp";
import { useAddCardMutation } from "@/store/queries/cartManagement";
import webLocalStorage from "@/utils/webLocalStorage";
import { useSeftEditMutation } from "@/store/queries/productManagement";
import useNewTabRedirect from "@/hooks/useNewTabRedirect";
import webStorageClient from "@/utils/webStorageClient";
import { CameraKit } from "@/components/modules/CameraKit/CameraKitContext";

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
    const [quantity, setQuantity] = React.useState<string>("1");
    const [size, setSize] = React.useState("");
    const [handleCart, setHandleCart] = React.useState<"buy" | "cart">("buy");
    const [seftEdit] = useSeftEditMutation();
    const [redirectNewTab] = useNewTabRedirect();
    const pathname = usePathname();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [addCart, { isLoading }] = useAddCardMutation();

    const [selectedImage, setSelectedImage] = React.useState(
      items[0]?.images[0],
    );

    const [selectItem, setSelectItem] = React.useState<Item | undefined>(
      items[0],
    );

    React.useEffect(() => {
      setSelectItem(items[0]);
      setSelectedImage(items[0]?.images[0]);
    }, [items]);

    const handleAddToCart = async () => {
      setHandleCart("cart");
      try {
        await Toast(
          addCart,
          {
            quantity: Number(quantity),
            customCanvasId: selectItem?.id,
            size: size,
          },
          "Thêm vào giỏ hàng",
        );
      } catch (err) {
        handleAuth();
      }
    };
    const handleBuy = async () => {
      setHandleCart("buy");
      try {
        await addCart({
          quantity: Number(quantity),
          customCanvasId: selectItem?.id,
          size: size,
        }).unwrap();
      } catch (err) {
        handleAuth();
      }
      router.push(`/checkout?itemProduct=${selectItem?.id}&size=${size}`);
      router.refresh();
    };

    const handleAuth = () => {
      let oldData = webLocalStorage.get("cart") ?? [];

      const isSame = oldData.some(
        (data: any) =>
          data?.customCanvas?.id === selectItem?.id && data?.size === size,
      );

      if (isSame) {
        oldData = oldData.map((data: any) => {
          if (
            data?.customCanvas?.id === selectItem?.id &&
            data?.size === size
          ) {
            return {
              ...data,
              quantity: Number(quantity) + data?.quantity,
            };
          } else return data;
        });
      } else
        oldData.push({
          quantity: Number(quantity),
          size: size,
          customCanvas: {
            price: selectItem?.price,
            images: selectItem?.images,
            name: name,
            id: selectItem?.id,
          },
        });

      webLocalStorage.set("cart", [...oldData]);
    };

    const decQuantity = () => {
      setQuantity(String(Number(quantity) - 1));
    };
    const incQuantity = () => {
      setQuantity(String(Number(quantity) + 1));
    };

    const handleDegisn = async () => {
      try {
        const { result } = await seftEdit({ id: selectItem?.id }).unwrap();
        const token = webStorageClient.getToken();

        redirectNewTab(
          `https://styleup-canvas.vercel.app/editor/${result}?size=${size}&token=${token}`,
        );
      } catch (err) {
        router.push(`/sign-in?redirect=${pathname}`);
      }
    };

    const valueQuantity: string = React.useMemo(() => {
      const numberQuantity = Number(quantity);

      if (numberQuantity >= 1 || quantity == "") return quantity;
      setQuantity("1");

      return "1";
    }, [quantity]);

    const router = useRouter();

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col gap-4 pb-40 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8",
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
            className="aspect-video h-full w-full max-w-xl rounded-xl bg-cover"
            height={900}
            src={selectedImage}
            width={900}
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
                  alt={name}
                  className="h-full w-full rounded-medium object-cover"
                  height={900}
                  src={image}
                  width={900}
                />
              </button>
            ))}
          </ScrollShadow>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
            <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
              <ModalContent className="rounded-xl">
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Thử áo quần với công nghệ AR
                    </ModalHeader>
                    <ModalBody>
                      {isOpen && (
                        <CameraKit>
                          <CameraKitApp />
                        </CameraKit>
                      )}
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
            <Button onPress={onOpen}>
              <ARIcon />
            </Button>
          </div>
          <h2 className="sr-only">Product information</h2>
          {/* <div className="my-2 flex items-center gap-2">
            <RatingRadioGroup hideStarsText size="sm" value={`${rating}`} />
            <p className="text-small text-default-400">
              {ratingCount} {ratingCount === 1 ? "review" : "reviews"}
            </p>
          </div> */}
          <p className="text-xl font-medium tracking-tight">
            {((selectItem?.price ?? 0) * Number(quantity)).toLocaleString(
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
            orientation="horizontal"
            value={selectItem?.id}
            onChange={(e) => {
              const newSelectionItem = items.find(
                (item: Item) => item?.id === e.target.value,
              );

              setSize("");
              setSelectItem(newSelectionItem);
              setSelectedImage(newSelectionItem?.images[0] ?? "");
            }}
          >
            {colors?.map(({ name, hex }, index) => (
              <ColorRadioItem
                key={items[index]?.id}
                color={hex}
                tooltip={name}
                value={items[index]?.id}
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
              orientation="horizontal"
              value={size}
              onChange={({ target }) => setSize(target.value)}
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
              isDisabled={!size || !quantity}
              isLoading={isLoading && handleCart === "buy"}
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
              isDisabled={!size || !quantity}
              isLoading={isLoading && handleCart === "cart"}
              size="lg"
              startContent={<Icon icon="solar:cart-plus-outline" width={24} />}
              variant="bordered"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </Button>
            <Button
              fullWidth
              className="text-medium font-medium"
              color="primary"
              isDisabled={!size || !quantity}
              size="lg"
              startContent={<Icon icon="solar:pen-2-linear" width={24} />}
              variant="flat"
              onClick={handleDegisn}
            >
              Tự thiết kế
            </Button>
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
