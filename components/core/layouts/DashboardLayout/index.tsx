"use client";

import { useMediaQuery } from "usehooks-ts";
import { Icon } from "@iconify/react";
import { Button, ScrollShadow, Spacer, Tooltip } from "@nextui-org/react";

import Header from "./Header";

import Sidebar from "@/components/core/common/sidebar";
import { AcmeIcon } from "@/components/core/common/icons";
import { sectionNestedItems } from "@/helpers/data/sidebar-items";
import { cn } from "@/utils/cn";

function DashboardLayout({ children }: { children: React.ReactElement }) {
  const isCompact = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex h-dvh w-full">
      <div
        className={cn(
          "relative flex h-full w-72 flex-col !border-r-small border-divider p-6 transition-width",
          {
            "w-16 items-center px-2 py-6": isCompact,
          }
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 px-3",

            {
              "justify-center gap-0": isCompact,
            }
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <AcmeIcon className="text-background" />
          </div>
          <span
            className={cn(
              "text-small font-bold uppercase opacity-100 text-primary",
              {
                "w-0 opacity-0": isCompact,
              }
            )}
          >
            Next Exam
          </span>
        </div>
        <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
          <Sidebar
            defaultSelectedKey="home"
            isCompact={isCompact}
            items={sectionNestedItems}
          />
        </ScrollShadow>
        <Spacer y={2} />

        <div
          className={cn("mt-auto flex flex-col", {
            "items-center": isCompact,
          })}
        >
          <Tooltip
            content="Help & Feedback"
            isDisabled={!isCompact}
            placement="right"
          >
            <Button
              fullWidth
              className={cn(
                "justify-start truncate text-default-500 data-[hover=true]:text-foreground",
                {
                  "justify-center": isCompact,
                }
              )}
              isIconOnly={isCompact}
              startContent={
                isCompact ? null : (
                  <Icon
                    className="flex-none text-default-500"
                    icon="solar:info-circle-line-duotone"
                    width={24}
                  />
                )
              }
              variant="light"
            >
              {isCompact ? (
                <Icon
                  className="text-default-500"
                  icon="solar:info-circle-line-duotone"
                  width={24}
                />
              ) : (
                "Help & Information"
              )}
            </Button>
          </Tooltip>
          <Tooltip content="Log Out" isDisabled={!isCompact} placement="right">
            <Button
              className={cn(
                "justify-start text-default-500 data-[hover=true]:text-foreground",
                {
                  "justify-center": isCompact,
                }
              )}
              isIconOnly={isCompact}
              startContent={
                isCompact ? null : (
                  <Icon
                    className="flex-none rotate-180 text-default-500"
                    icon="solar:minus-circle-line-duotone"
                    width={24}
                  />
                )
              }
              variant="light"
            >
              {isCompact ? (
                <Icon
                  className="rotate-180 text-default-500"
                  icon="solar:minus-circle-line-duotone"
                  width={24}
                />
              ) : (
                "Log Out"
              )}
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="w-full flex-1 flex-col overflow-auto">
        {/* <header className="flex items-center gap-3 rounded-medium border-small border-divider p-4">
          <h2 className="text-medium font-medium text-default-700">Overview</h2>
        </header> */}
        <Header />
        <main className=" w-full overflow-visible p-4">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
