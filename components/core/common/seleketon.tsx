import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

const SekeletonCard = () => {
  return (
    <Card className="min-h-96 w-full space-y-5" radius="lg">
      <Skeleton className="">
        <div className="h-72 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="flex flex-col space-y-5 p-4">
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="w-full rounded-2xl">
          <div className="h-10 w-full rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
  );
};

export default SekeletonCard;
