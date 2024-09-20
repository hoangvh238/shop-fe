"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next-nprogress-bar";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {
  Avatar,
  Badge,
  Divider,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];

function EditUser() {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="w-full flex gap-4">
        <button
          className="text-xl text-slate-600 hover:text-foreground"
          onClick={() => router.back()}
        >
          <Icon icon="solar:alt-arrow-left-line-duotone" />
        </button>
        <h3 className="text-xl font-medium uppercase">
          Edit {"Bao thang"}&apos;s profile
        </h3>
      </div>
      <div className="mt-5">
        <Badge
          disableOutline
          classNames={{
            badge: "w-8 h-8",
          }}
          color="primary"
          content={
            <Button
              isIconOnly
              className="p-0 text-primary-foreground"
              radius="full"
              size="lg"
              variant="light"
            >
              <Icon icon="solar:pen-2-linear" />
            </Button>
          }
          placement="bottom-right"
          shape="circle"
        >
          <Avatar
            className="h-32 w-32"
            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
          />
        </Badge>
      </div>
      <div className="grid grid-cols-6 gap-5 mt-5 max-w-[900px]">
        <RadioGroup
          label="Role"
          classNames={{
            base: "col-span-6",
            label: "text-foreground",
            wrapper: "justify-between",
          }}
          orientation="horizontal"
          isRequired
        >
          <Radio value="buenos-aires">Admin</Radio>
          <Radio value="sydney">Exam Management Team</Radio>
          <Radio value="san-francisco">IT Support</Radio>
          <Radio value="london">Proctor</Radio>
        </RadioGroup>
        <Divider className="col-span-6" />
        <Input
          className="col-span-3"
          labelPlacement="outside"
          label="Username"
          placeholder="Enter Username"
          isRequired
        />
        <Input
          className="col-span-3"
          labelPlacement="outside"
          label="Fullname"
          placeholder="Enter Fullname"
          isRequired
        />
        <Input
          className="col-span-3"
          labelPlacement="outside"
          label="Email"
          placeholder="Enter Email"
          isRequired
        />
        <Input
          className="col-span-3"
          labelPlacement="outside"
          label="Phone Number"
          placeholder="Enter Phone Number"
          isRequired
        />
        <Select
          label="Gender"
          className="col-span-3"
          labelPlacement="outside"
          placeholder="Select gender"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
        <Select
          label="Department"
          className="col-span-3"
          labelPlacement="outside"
          placeholder="Select Department"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
        <div className="grid grid-cols-4 col-span-6 gap-5">
          <Select
            label="Country"
            labelPlacement="outside"
            placeholder="Select Country"
          >
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
          <Select
            label="State/Province"
            labelPlacement="outside"
            placeholder="Select State/Province"
          >
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
          <Select
            label="District"
            labelPlacement="outside"
            placeholder="Select District"
          >
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
          <Select
            label="Ward/Commune"
            labelPlacement="outside"
            placeholder="Select Ward/Commune"
          >
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
        </div>

        <Input
          className="col-span-3"
          labelPlacement="outside"
          label="ID Card"
          placeholder="Enter ID Card"
        />
        <Input
          className="col-span-3"
          labelPlacement="outside"
          label="Azure ID"
          placeholder="Enter Azure ID"
        />
        <Button color="primary" className="col-span-6">
          Save
        </Button>
      </div>
    </div>
  );
}

export default EditUser;
