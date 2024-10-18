"use client";

import { useSearchParams } from "next/navigation";
import { parseDate } from "@internationalized/date";
import {
  Button,
  DateRangePicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spacer,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useRouter } from "next-nprogress-bar";
import dayjs from "dayjs";
import { useMemo } from "react";

import { columns, Event } from "./table";

import {
  PlusIcon,
  SearchIcon,
  VerticalDotsIcon,
} from "@/components/core/common/icons";
import { useGetAllEventsForManagerQuery } from "@/store/queries/eventsMangement";
import useTableQueries from "@/hooks/useTableQueries";

const animals = [
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

const statusOptions = [
  { key: "PENDING", label: "Pending" },
  { key: "APPROVED", label: "Approved" },
  { key: "REJECTED", label: "Rejected" },
];

function EventManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 7;
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "";
  const status = searchParams.get("status") || "";
  const location = searchParams.get("location") || "";
  const date: any = searchParams.get("date") || "";

  const dateFormatted = date ? JSON.parse(date) : null;

  const { handleSearch, handleFilter, handleFilterDate } = useTableQueries();

  //

  const {
    result = [],
    isFetching,
    total = 1,
  } = useGetAllEventsForManagerQuery(
    {
      page: page,
      limit: limit,
      search: search,
      filters: JSON.stringify({
        status,
        // club: currentClub?._id,
        location: location,
        type: type,
        createdAt: dateFormatted
          ? {
              $gte: dayjs(dateFormatted?.$gte).format(),
              $lte: dayjs(dateFormatted?.$lte).format(),
            }
          : "",
      }),
    },
    {
      selectFromResult: ({ data, isFetching }) => {
        return {
          result: data?.result?.events,
          isFetching,
          total: data?.result?.totalCount,
        };
      },
    },
  );

  // const handleSearch = _.debounce((value: string) => {
  //   router.push(createQueryString("search", `${value}`));
  // }, 300);

  // const handleFilterStatus = _.debounce((e) => {
  //   router.push(createQueryString("status", `${e?.target.value ?? ""}`));
  // }, 300);

  // const handleFilterDate = _.debounce((e) => {
  //   router.push(
  //     createQueryString(
  //       "date",
  //       `${
  //         e
  //           ? JSON.stringify({
  //               $gte: dayjs(e?.start).format(),
  //               $lte: dayjs(e?.end).format(),
  //             })
  //           : ""
  //       }`
  //     )
  //   );
  // }, 300);

  const renderCell = (event: Event, columnKey: React.Key) => {
    const cellValue = event[columnKey as keyof Event];

    switch (columnKey) {
      case "_id":
        return <div>{cellValue}</div>;
      case "name":
        return <div>{cellValue}</div>;
      case "startTime":
        return <div>{dayjs(cellValue).format("DD/MM/YY")}</div>;
      case "type":
        return <div>{cellValue}</div>;
      case "status":
        return <div>{cellValue}</div>;
      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
    }
  };

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center px-2 py-2">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={Math.ceil(total / limit)}
          onChange={(page) => router.push("/events?page=" + page)}
        />
      </div>
    );
  }, [total, limit, page]);

  return (
    <div className="">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-medium">Event Management</h3>
        <Button color="primary" endContent={<PlusIcon />}>
          Add New
        </Button>
      </div>

      <div className="grid w-full grid-cols-4 gap-4">
        <div>
          <span>Search</span>
          <Spacer y={2} />
          <Input
            isClearable
            className="mb-4"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={search}
            onValueChange={handleSearch}
          />
        </div>
      </div>
      <div className="mb-4 grid grid-cols-4 gap-4">
        <div>
          <span>Date</span>
          <Spacer y={2} />
          <DateRangePicker
            className="max-w-xs"
            label="Stay duration"
            value={
              dateFormatted
                ? {
                    start: parseDate(
                      dayjs(dateFormatted?.$gte).format("YYYY-MM-DD"),
                    ),
                    end: parseDate(
                      dayjs(dateFormatted?.$lte).format("YYYY-MM-DD"),
                    ),
                  }
                : null
            }
            onChange={handleFilterDate}
          />
        </div>
        <div>
          <span>Location</span>
          <Spacer y={2} />
          <Select
            className="max-w-xs"
            label="Favorite Animal"
            placeholder="Select an animal"
          >
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
        </div>
        <div>
          <span>Location</span>
          <Spacer y={2} />
          <Select
            className="max-w-xs"
            label="Favorite Animal"
            placeholder="Select an animal"
          >
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
        </div>
        <div>
          <span>Status</span>
          <Spacer y={2} />
          <Select
            className="max-w-xs"
            label="Status"
            placeholder="Select a status"
            selectedKeys={new Set([status])}
            onChange={(e) =>
              handleFilter({
                status: e.target.value,
              })
            }
          >
            {statusOptions.map((option) => (
              <SelectItem key={option.key}>{option.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <Table
        isHeaderSticky
        aria-label="Example table with dynamic content"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[520px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isFetching}
          items={result}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item: Event) => (
            <TableRow key={item._id}>
              {(columnKey) => {
                return <TableCell>{renderCell(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default EventManagement;
