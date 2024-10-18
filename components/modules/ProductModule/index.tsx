"use client";

import React from "react";
import { Button, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useSearchParams } from "next/navigation";

import FiltersWrapper, {
  InitialFilterType,
} from "@/components/core/common/filters-wrapper";
import {
  useGetColorsQuery,
  useGetSizesQuery,
} from "@/store/queries/providerManagement";
import { enums } from "@/settings";
import { FilterTypeEnum } from "@/types/filters-types";
import { useFillterProductMutation } from "@/store/queries/productManagement";
import { TypeDateProduct } from "@/types/item-type";
import { dataProduct } from "@/helpers/data/product";
import ProductsGrid from "@/components/core/common/products-grid";

export type TypeOptions = {
  tittle: string;
  value: string;
};

export default function ProductModule() {
  const { isOpen, onOpen } = useDisclosure();
  const [sort, setSort] = React.useState({
    sortField: "updatedDate",
    asc: true,
  });

  const [fillterProduct, { isSuccess }] = useFillterProductMutation();

  const params = useSearchParams();
  const minPrice = params.get("minPrice") ?? 0;
  const maxPrice = params.get("maxPrice") ?? 100000;
  const sizes = params.get("sizes")?.split(",") ?? [];
  const colors = params.get("colors")?.split(",") ?? [];
  const initialFilter: InitialFilterType = {
    price_range: [Number(minPrice), Number(maxPrice)],
    color: colors,
    tag_group: sizes,
  };
  const [selectFilter, setFilter] = React.useState(initialFilter);
  const [result, setResult] = React.useState<TypeDateProduct>(dataProduct);

  const optionColors = useGetColorsQuery(
    { id: "a7316c60-5024-4b3f-842d-67ebe51d05c6" },
    {
      selectFromResult: ({ data }) => {
        return {
          type: FilterTypeEnum.Color,
          title: "Color",
          options: data?.result?.split(",").map((color: string) => {
            const colorUppercase: string = color.toUpperCase();

            return {
              title:
                enums.ColorTranslate[
                  colorUppercase as keyof typeof enums.ColorTranslate
                ],
              value: color,
              color:
                enums.Color[
                  colorUppercase as keyof typeof enums.ColorTranslate
                ],
            };
          }),
        };
      },
    },
  );
  const optionSizes = useGetSizesQuery(
    { id: "a7316c60-5024-4b3f-842d-67ebe51d05c6" },
    {
      selectFromResult: ({ data }) => {
        return {
          type: FilterTypeEnum.TagGroup,
          title: "Size",
          options: data?.result?.split(",").map((size: string) => ({
            title: size,
            value: size,
          })),
        };
      },
    },
  );

  const ecommerceItems = React.useMemo(() => {
    const baseColor = optionColors
      ? { ...optionColors }
      : {
          type: FilterTypeEnum.Color,
          title: "Màu",
          options: [],
        };
    const baseSize = optionSizes
      ? { ...optionSizes }
      : {
          type: FilterTypeEnum.TagGroup,
          title: "kích thước",
          options: [],
        };

    return [
      {
        type: FilterTypeEnum.PriceRange,
        title: "Phạm vi giá tiền",
        range: {
          min: 0,
          defaultValue: [100000, 400000] as [number, number],
          max: 5000000,
          step: 1,
        },
      },
      { ...baseColor },
      { ...baseSize },
    ];
  }, [optionColors, optionSizes]);

  React.useEffect(() => {
    handleSearch();
  }, []);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let newsort = sort;

    switch (e.target.value) {
      case "price_low_to_high":
        newsort = {
          sortField: "price",
          asc: true,
        };
        break;
      case "price_high_to_low":
        newsort = {
          sortField: "price",
          asc: false,
        };
        break;
      case "name_low_to_high":
        newsort = {
          sortField: "name",
          asc: true,
        };
        break;
      case "name_high_to_low":
        newsort = {
          sortField: "name",
          asc: false,
        };
        break;
    }
    setSort(newsort);
    handleSearch();
  };

  const handleSearch = async () => {
    const fillter = {
      filter: {
        priceRange: {
          minPrice: Number(selectFilter.price_range[0]),
          maxPrice: Number(selectFilter.price_range[1]),
        },
        color:
          selectFilter.color.length !== 0 ? selectFilter.color.join(",") : "",
        sizes:
          selectFilter.tag_group.length !== 0
            ? selectFilter.tag_group.join(",")
            : "",
      },
      skip: 0,
      pageIndex: 0,
      pageSize: 5,
      sortField: sort.sortField,
      asc: sort.asc,
    };

    try {
      const data = await fillterProduct(fillter).unwrap();

      setResult({ ...data });
    } catch (err) {}
  };

  const totalPage = React.useMemo(() => {}, [result]);
  const products = React.useMemo(() => {
    const newData = result?.result?.items?.map((product: any) => {
      const colors = product?.colors?.split(",").map((color: string) => ({
        name: color,
        hex: enums.Color[color.toUpperCase() as keyof typeof enums.Color],
      }));

      return {
        ...product,
        colors,
      };
    });

    return newData;
  }, [result?.result?.items]);

  return (
    <div className="max-w-8xl h-fit w-full px-2 pb-16 lg:px-24">
      <div className="flex gap-x-6">
        <div className="sticky left-0 top-16 max-h-screen pt-2">
          <FiltersWrapper
            className="bg-default-50"
            handleSearch={handleSearch}
            initialFilter={initialFilter}
            items={ecommerceItems}
            scrollShadowClassName="max-h-fit pb-12"
            selectFilter={selectFilter}
            setFilter={setFilter}
            title="Filter by"
          />
        </div>
        <div className="max-h-fit min-h-screen w-full flex-1 flex-col">
          <header className="relative z-20 flex flex-col gap-2 rounded-medium bg-default-50 px-4 pb-3 pt-2 md:pt-3">
            <div className="flex items-center gap-1 md:hidden md:gap-2">
              <h2 className="text-large font-medium">Shoes</h2>
              <span className="text-small text-default-400">(1240)</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-row gap-2">
                <Button
                  className="flex border-default-200 sm:hidden"
                  startContent={
                    <Icon
                      className="text-default-500"
                      height={16}
                      icon="solar:filter-linear"
                      width={16}
                    />
                  }
                  variant="bordered"
                  onPress={onOpen}
                >
                  Filters
                </Button>
                <div className="hidden items-center gap-1 md:flex">
                  <h2 className="text-medium font-medium">Sản phẩm</h2>
                  <span className="text-small text-default-400">(1240)</span>
                </div>
              </div>
              <Select
                aria-label="Sort by"
                classNames={{
                  base: "items-center justify-end",
                  label:
                    "hidden lg:block text-tiny whitespace-nowrap md:text-small text-default-400",
                  mainWrapper: "max-w-xs",
                }}
                defaultSelectedKeys={["newest"]}
                label="Sort by"
                labelPlacement="outside-left"
                placeholder="Select an option"
                variant="bordered"
                onChange={handleSort}
              >
                <SelectItem key="newest" value="newest">
                  Mới nhất
                </SelectItem>
                <SelectItem key="price_low_to_high" value="price_low_to_high">
                  Giá từ thấp đếp cao
                </SelectItem>
                <SelectItem key="price_high_to_low" value="price_high_to_low">
                  Giá từ cao đếp đến
                </SelectItem>
                <SelectItem key="name_low_to_high" value="name_low_to_high">
                  Tên từ thấp đến cao
                </SelectItem>
                <SelectItem key="name_high_to_low" value="name_high_to_low">
                  Tên từ cao đến thấp
                </SelectItem>
              </Select>
            </div>
          </header>
          <main className="mt-4 h-full w-full overflow-visible px-1">
            <div className="block rounded-medium">
              {/* Put your content here */}
              <ProductsGrid
                className="grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                isSuccess={isSuccess}
                products={products}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
