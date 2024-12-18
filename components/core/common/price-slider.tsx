"use client";

import type { SliderProps } from "@nextui-org/react";
import type { RangeFilter, RangeValue } from "@/types/filters-types";

import React from "react";
import { Divider, Input, Slider } from "@nextui-org/react";

import { cn } from "@/utils/cn";

export type PriceSliderAnimation = "opacity" | "height";

export type PriceSliderProps = Omit<SliderProps, "ref"> & {
  range?: RangeFilter;
  animation?: PriceSliderAnimation;
  handleFilter: (key: string, value: any) => void;
  type: string;
  defaultValue: [number, number];
};

function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function scaleValue(
  value: number,
  fromRange: RangeValue,
  toRange: RangeValue = [0, 100],
) {
  const [fromMin, fromMax] = fromRange;
  const [toMin, toMax] = toRange;

  // Scaling factor to map the value from one range to another
  const scale = (toMax - toMin) / (fromMax - fromMin);

  // Applying the scaling factor to the value and adjusting by the minimum of the target range
  return (value - fromMin) * scale + toMin;
}

export type PriceSliderPipProps = {
  isInRange: boolean;
  animation?: PriceSliderAnimation;
};

const PriceSliderPip: React.FC<PriceSliderPipProps> = ({
  animation = "height",
  isInRange,
}) => {
  const rand = React.useMemo(() => Math.floor(Math.random() * 100), []);

  const height = clampValue(rand, 30, 100) + "%";

  const pip = React.useMemo(() => {
    if (animation === "height") {
      return (
        <span
          className="relative h-12 w-1 rounded-full bg-default-100 after:absolute after:bottom-0 after:h-0 after:w-full after:rounded-full after:bg-primary after:transition-all after:!duration-500 after:content-[''] data-[in-range=true]:after:h-full"
          data-in-range={isInRange}
          style={{
            height,
          }}
        />
      );
    }

    return (
      <span
        className="h-12 w-1 rounded-full bg-primary transition-all !duration-500"
        style={{
          background: isInRange
            ? "hsl(var(--nextui-primary-500))"
            : "hsl(var(--nextui-default-100))",
          height,
        }}
      />
    );
  }, [isInRange, height, animation]);

  return pip;
};

const PriceSlider = React.forwardRef<HTMLDivElement, PriceSliderProps>(
  (
    { range, animation, handleFilter, defaultValue, type, className, ...props },
    ref,
  ) => {
    const [value, setValue] = React.useState<RangeValue>(defaultValue);

    const rangePercentageValue = React.useMemo(() => {
      const rangeScale = [
        range?.min || defaultValue[0],
        range?.max || defaultValue[1],
      ] as RangeValue;

      const minPercentage = Math.floor(scaleValue(value[0], rangeScale));
      const maxPercentage = Math.floor(scaleValue(value[1], rangeScale));

      return [minPercentage, maxPercentage] as const;
    }, [value, range?.min, range?.max, defaultValue]);

    const rangePips = React.useMemo(() => {
      return Array.from({ length: 32 }).map((_, index) => {
        const pipValuePercentage = Math.round(scaleValue(index, [0, 31]));

        const isInRange =
          pipValuePercentage >= rangePercentageValue[0] + 5 &&
          pipValuePercentage <= rangePercentageValue[1] + 2;

        return (
          <PriceSliderPip
            key={index}
            animation={animation}
            isInRange={isInRange}
          />
        );
      });
    }, [animation, rangePercentageValue]);

    const onMinInputValueChange = React.useCallback(
      (inputValue: string) => {
        const newValue = Number(inputValue.replaceAll(".", ""));
        const minValue = range?.min ?? defaultValue[0];

        if (!isNaN(newValue)) {
          const clampedValue = clampValue(newValue, minValue, value[1]);

          setValue([clampedValue, value[1]]);
        }
      },
      [value, range?.min, defaultValue],
    );

    const onMaxInputValueChange = React.useCallback(
      (inputValue: string) => {
        const newValue = Number(inputValue.replaceAll(".", ""));
        const maxValue = range?.max ?? defaultValue[1];

        if (!isNaN(newValue) && newValue <= maxValue) {
          setValue([value[0], newValue]);
        }
      },
      [value, range?.max, defaultValue],
    );

    return (
      <div className={cn("flex flex-col gap-3", className)}>
        <div className="flex flex-col gap-1">
          <div className="flex h-12 w-full items-end justify-between px-2">
            {rangePips}
          </div>
          <Slider
            {...props}
            ref={ref}
            formatOptions={{ style: "currency", currency: "VND" }}
            maxValue={range?.max}
            minValue={range?.min}
            size="sm"
            step={range?.step}
            value={value}
            onChange={(value) => {
              handleFilter(type, value);
              setValue(value as RangeValue);
            }}
          />
        </div>
        <div className="flex items-center">
          <Input
            aria-label="Min price"
            endContent={<p className="text-default-400">VND</p>}
            labelPlacement="outside"
            type="text"
            value={`${value[0].toLocaleString("VN-vi")}`}
            onValueChange={onMinInputValueChange}
          />
          <Divider className="mx-2 w-2" />
          <Input
            aria-label="Max price"
            endContent={<p className="text-default-400">VND</p>}
            labelPlacement="outside"
            type="text"
            value={`${value[1].toLocaleString("VN-vi")}`}
            onValueChange={onMaxInputValueChange}
          />
        </div>
      </div>
    );
  },
);

PriceSlider.displayName = "PriceSlider";

export default PriceSlider;
