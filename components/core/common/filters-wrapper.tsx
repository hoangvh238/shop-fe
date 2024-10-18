"use client";

import type { Filter } from "@/types/filters-types";

import React from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  ScrollShadow,
  Switch,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

import RatingRadioGroup from "./rating-radio-group";
import PriceSlider from "./price-slider";
import TagGroupCheckboxItem from "./tag-group-checkbox-item";
import TagGroupCheckBoxColor from "./tag-group-color";

import { cn } from "@/utils/cn";
import { FilterTypeEnum } from "@/types/filters-types";
import * as queryString from "@/utils/queryString";

export type FiltersWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  items: Filter[];
  title?: string;
  showTitle?: boolean;
  showActions?: boolean;
  className?: string;
  scrollShadowClassName?: string;
  initialFilter: InitialFilterType;
  selectFilter: InitialFilterType;
  setFilter: (filter: InitialFilterType) => void;
  handleSearch: () => void;
};

export type InitialFilterType = {
  price_range: [number, number];
  color: string[];
  tag_group: string[];
};

const FiltersWrapper = React.forwardRef<HTMLDivElement, FiltersWrapperProps>(
  (
    {
      items,
      title = "Filters",
      showTitle = true,
      showActions = true,
      className,
      scrollShadowClassName,
      selectFilter,
      setFilter,
      handleSearch,
    },
    ref,
  ) => {
    const router = useRouter();

    const handleSearchQuery = () => {
      const query = queryString.generateQueryString({
        minPrice: selectFilter.price_range[0].toString(),
        maxPrice: selectFilter.price_range[1].toString(),
        sizes: selectFilter.tag_group.join(","),
        colors: selectFilter.color.join(","),
      });

      router.push(query);
      router.refresh();
      handleSearch();
    };
    const handleFilter = (key: string, value: any) => {
      setFilter({ ...selectFilter, [key]: value });
    };

    const renderFilter = React.useCallback(
      (filter: Filter) => {
        switch (filter.type) {
          case FilterTypeEnum.Tabs:
            return (
              <Tabs fullWidth aria-label={filter.title}>
                {filter.options?.map((option) => (
                  <Tab key={option.value} title={option.title} />
                ))}
              </Tabs>
            );
          case FilterTypeEnum.PriceRange:
            return (
              <PriceSlider
                aria-label={filter.title}
                defaultValue={selectFilter.price_range}
                handleFilter={handleFilter}
                range={filter.range}
                type={filter.type}
              />
            );

          case FilterTypeEnum.Rating:
            return <RatingRadioGroup />;

          case FilterTypeEnum.TagGroup:
            return (
              <CheckboxGroup
                aria-label="Select size"
                className="gap-1"
                defaultValue={selectFilter.tag_group}
                label="Chọn kích cỡ sản phẩm"
                orientation="horizontal"
                onChange={(e) => {
                  handleFilter(filter.type, e);
                }}
              >
                {filter.options?.map(
                  ({ title, value }: { title: string; value: string }) => (
                    <TagGroupCheckboxItem key={value} size="lg" value={value}>
                      {title}
                    </TagGroupCheckboxItem>
                  ),
                )}
              </CheckboxGroup>
            );
          case FilterTypeEnum.Toggle:
            return (
              <div className="-mx-4 flex flex-col">
                {filter.options?.map((option) => (
                  <Switch
                    key={option.value}
                    classNames={{
                      base: cn(
                        "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                        "justify-between cursor-pointer rounded-lg gap-2 -mr-2 px-4 py-3",
                      ),
                      wrapper: "mr-0",
                    }}
                    value={option.value}
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-medium">{option.title}</p>
                      <p className="text-tiny text-default-400">
                        {option.description}
                      </p>
                    </div>
                  </Switch>
                ))}
              </div>
            );
          case FilterTypeEnum.CheckboxGroup:
            return (
              <Accordion
                className="px-0"
                defaultExpandedKeys={filter?.defaultOpen ? ["options"] : []}
              >
                <AccordionItem
                  key="options"
                  classNames={{
                    title: "text-medium font-medium leading-8 text-default-600",
                    trigger: "p-0",
                    content: "px-1",
                  }}
                  title={filter.title}
                >
                  <CheckboxGroup aria-label={filter.title}>
                    {filter.options?.map((option) => (
                      <Checkbox key={option.value} value={option.value}>
                        {option.title}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </AccordionItem>
              </Accordion>
            );
          case FilterTypeEnum.Color:
            return (
              <CheckboxGroup
                aria-label="Select size"
                className="gap-1"
                defaultValue={selectFilter.color}
                label="Chọn kích cỡ sản phẩm"
                orientation="horizontal"
                onChange={(e) => {
                  handleFilter(filter.type, e);
                }}
              >
                {filter.options?.map((option) => (
                  <TagGroupCheckBoxColor
                    key={option.value}
                    radius="full"
                    value={option.value}
                  >
                    {option.title}
                  </TagGroupCheckBoxColor>
                ))}
              </CheckboxGroup>
            );
        }
      },
      [selectFilter],
    );

    return (
      <div
        ref={ref}
        className={cn(
          "h-full max-h-fit w-full max-w-sm overflow-y-scroll rounded-medium bg-content1 p-6",
          className,
        )}
      >
        {showTitle && (
          <>
            <h2 className="text-large font-medium text-foreground">{title}</h2>
            <Divider className="my-3 bg-default-100" />
          </>
        )}
        <ScrollShadow
          className={cn(
            "-mx-6 h-full px-6",
            {
              "h-[calc(100%+220px)]": showActions,
            },
            scrollShadowClassName,
          )}
        >
          <div className="flex flex-col gap-6">
            {items.map((filter) => (
              <div key={filter.title} className="flex flex-col gap-3">
                {filter.type !== FilterTypeEnum.CheckboxGroup ? (
                  <div>
                    <h3 className="text-medium font-medium leading-8 text-default-600">
                      {filter.title}
                    </h3>
                    <p className="text-small text-default-400">
                      {filter.description}
                    </p>
                  </div>
                ) : null}
                {renderFilter(filter)}
              </div>
            ))}
          </div>
          {showActions && (
            <>
              <Divider className="my-6 bg-default-100" />

              <div className="mt-auto flex flex-col gap-2">
                <Button
                  color="primary"
                  startContent={
                    <Icon
                      className="text-primary-foreground [&>g]:stroke-[3px]"
                      icon="solar:magnifer-linear"
                      width={16}
                    />
                  }
                  onClick={handleSearchQuery}
                >
                  Tìm kiếm
                </Button>
              </div>
            </>
          )}
        </ScrollShadow>
      </div>
    );
  },
);

FiltersWrapper.displayName = "FiltersWrapper";

export default FiltersWrapper;
