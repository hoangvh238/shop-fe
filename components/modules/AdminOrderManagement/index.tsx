"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  User,
  Pagination,
  Selection,
  SortDescriptor,
  Tooltip,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { Plus } from "lucide-react";

import { users, fakeUsers } from "@/helpers/data/table";
import {
  DeleteIcon,
  EditIcon,
  SearchIcon,
} from "@/components/core/common/icons";
import useTableQueries from "@/hooks/useTableQueries";
import ConfirmationModal from "@/components/core/common/confirmation-modal";
import Opener from "@/components/core/common/opener";
import { useGetAllOrderMutation } from "@/store/queries/ordermanagement";
import { enums } from "@/settings";

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

type User = (typeof fakeUsers)[0];

// const columns = [
//   { name: "ID", uid: "id" },
//   { name: "NAME", uid: "fullname" },
//   { name: "ROLE", uid: "role" },
//   { name: "DEPARTMENT", uid: "department" },
//   { name: "STATUS", uid: "is_active" },
//   { name: "ACTIONS", uid: "actions" },
// ];
const columns = [
  { name: "ID", uid: "id" },
  { name: "TÊN", uid: "recipientName" },
  { name: "TIỀN", uid: "totalPrice" },
  {
    name: "ĐỊA CHỈ",
    uid: "address",
  },
  {
    name: "EMAIL",
    uid: "recipientMail",
  },
  {
    name: "SDT",
    uid: "recipientPhone",
  },
  { name: "VẬN CHUYỂN", uid: "orderStatus" },
  { name: "THANH TOÁN", uid: "transactionStatus" },
  { name: "ACTIONS", uid: "actions" },
];

const CellContent = ({
  item,
  columnKey,
}: {
  item: any;
  columnKey: React.Key;
}) => {
  const router = useRouter();

  const [selectedKeys] = React.useState<Selection>(new Set(["text"]));
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  const renderCell = React.useCallback(
    (user: any, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof User];

      switch (columnKey) {
        case "id":
          return (
            <p className="text-bold text-small capitalize">{user.orderCode}</p>
          );
        case "recipientName":
          return (
            <p className="text-bold text-small capitalize">
              {user.recipientName}
            </p>
          );
        case "totalPrice":
          return (
            <p className="text-bold text-small capitalize">
              {user.totalPrice.toLocaleString("VN-vi")}
            </p>
          );
        case "address":
          return (
            <Tooltip content={user?.address ?? ""}>
              <p className="text-bold max-w-20 truncate text-sm capitalize">
                {user?.address}
              </p>
            </Tooltip>
          );
        case "recipientMail":
          return (
            <p className="text-bold text-small capitalize">
              {user.recipientMail ?? "null"}
            </p>
          );
        case "recipientPhone":
          return (
            <p className="text-bold text-small capitalize">
              {user.recipientPhone}
            </p>
          );
        case "orderStatus":
          switch (user?.orderStatus) {
            case enums.OrderStatus.Pending:
              return (
                <Chip className="min-w-28 capitalize" color="warning">
                  Đang xử lí
                </Chip>
              );
            case enums.OrderStatus.Confirmed:
              return (
                <Chip className="min-w-28 capitalize" color="primary">
                  Đã xác thực
                </Chip>
              );
            case enums.OrderStatus.Shipped:
              return (
                <Chip className="min-w-28 capitalize" color="secondary">
                  Đang giao hàng
                </Chip>
              );
            case enums.OrderStatus.Delivered:
              return (
                <Chip className="min-w-28 capitalize" color="success">
                  Đã giao hàng
                </Chip>
              );
            case enums.OrderStatus.Canceled:
              return (
                <Chip className="min-w-28 capitalize" color="danger">
                  Đã hủy
                </Chip>
              );
            default:
              return (
                <Chip className="min-w-28 capitalize" color="danger">
                  Không rõ
                </Chip>
              );
          }
        case "transactionStatus":
          switch (user?.transaction?.status) {
            case enums.TransactionStastus.Pending:
              return (
                <Chip className="min-w-28 capitalize" color="warning">
                  Đang xử lí
                </Chip>
              );
            case enums.TransactionStastus.Success:
              return (
                <Chip className="min-w-28 capitalize" color="success">
                  Thành công
                </Chip>
              );
            case enums.TransactionStastus.Failed:
              return (
                <Chip className="min-w-28 capitalize" color="danger">
                  Thất bại
                </Chip>
              );
            default:
              return (
                <Chip className="min-w-28 capitalize" color="danger">
                  Không rõ
                </Chip>
              );
          }
        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Chỉnh sửa">
                <button
                  className="cursor-pointer text-lg text-default-400 active:opacity-50"
                  onClick={() => router.push(`/admin/product/edit/${user?.id}`)}
                >
                  <EditIcon />
                </button>
              </Tooltip>
              <Opener
                renderContent={({ close }) => (
                  <ConfirmationModal
                    actionText="Xoá sản phẩm"
                    header="Ban có chắc chắn muốn xoá sản phẩm này?"
                    message="Sau khi xoá, sản phẩm sẽ không thể khôi phục."
                    type="danger"
                    onClose={close}
                    onConfirm={close}
                  />
                )}
                renderOpener={({ open }) => (
                  <Tooltip color="danger" content="Xoá">
                    <button
                      className="cursor-pointer text-lg text-danger active:opacity-50"
                      onClick={open}
                    >
                      <DeleteIcon />
                    </button>
                  </Tooltip>
                )}
              />
            </div>
          );
        default:
          return cellValue;
      }
    },
    [selectedValue],
  );

  return renderCell(item, columnKey);
};

export default function AdminOrderManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = React.useState({ items: [], total: "" });
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;
  const search = searchParams.get("search") || "";

  const rawStatus = searchParams.get("status") || "all";

  const status = rawStatus !== "all" ? new Set(rawStatus.split(",")) : "all";

  // const { products, isFetching } = useGetAllProductQuery(
  //   {
  //     filter: "",
  //     skip: 0,
  //     pageIndex: page,
  //     pageSize: limit,
  //     sortField: "name",
  //     asc: true,
  //   },
  //   {
  //     selectFromResult: ({ data, isFetching }: any) => {
  //       const newData = data?.result?.items?.map((item: ProductItem) => {
  //         return {
  //           ...item,
  //           colors: [
  //             {
  //               name: "red",
  //               hex: "#FF0000",
  //             },
  //             {
  //               name: "blue",
  //               hex: "#0000ff",
  //             },
  //             {
  //               name: "black",
  //               hex: "#000000",
  //             },
  //           ],
  //         };
  //       });

  //       return {
  //         products: newData ?? [],
  //         isFetching,
  //       };
  //     },
  //   },
  // );

  const [getAllOrder, result] = useGetAllOrderMutation();

  const getNewOrder = async () => {
    const { data } = await getAllOrder({
      filter: search,
      skip: (page - 1) * limit,
      pageIndex: page,
      pageSize: limit,
      sortField: (sortDescriptor.column as string) ?? "name",
      asc: sortDescriptor.direction === "ascending",
    });

    setData(data?.result);
  };

  React.useEffect(() => {
    getNewOrder();
  }, [page, limit, sortDescriptor]);

  const orders = React.useMemo(() => {
    return data?.items ?? [];
  }, [data]);

  const totalPage: number = React.useMemo(() => Number(data?.total), [data]);

  const [visibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["text"]),
  );

  const { handleSearch, handleFilter, handleChangePage, handleChangeLimit } =
    useTableQueries();

  const hasSearchFilter = Boolean(search);

  const headerColumns = React.useMemo(() => {
    return columns;
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...fakeUsers];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.fullname.toLowerCase().includes(search.toLowerCase()),
      );
    }
    // if (
    //   status !== "all" &&
    //   Array.from(status).length !== statusOptions.length
    // ) {
    //   filteredUsers = filteredUsers.filter((user) =>
    //     Array.from(status).includes(user.status)
    //   );
    // }

    return filteredUsers;
  }, [users, search, status]);

  const pages = Math.ceil(totalPage / limit) || 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, limit]);

  const onLimitChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleChangeLimit(Number(e.target.value));
    },
    [],
  );

  const onSearchChange = React.useCallback((value: string) => {
    handleFilter({ search: value });
  }, []);

  const onClear = React.useCallback(() => {
    handleSearch("");
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            defaultValue={search}
            placeholder="Tìm kiếm sản phẩm"
            startContent={<SearchIcon />}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />

          <div className="flex gap-3">
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={status}
                selectionMode="multiple"
                onSelectionChange={handleMultipleSelection}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            <Button
              color="primary"
              startContent={<Plus size={16} />}
              onClick={() => router.push("/admin/product/create")}
            >
              Thêm sản phẩm mới
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {users.length} users
          </span>
          <label className="flex items-center text-small text-default-400">
            Rows per page:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              onChange={onLimitChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    search,
    status,
    visibleColumns,
    onSearchChange,
    onLimitChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-center px-2 py-2">
        {/* <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span> */}
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={handleChangePage}
        />
        {/* <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div> */}
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[520px]",
        }}
        selectedKeys={selectedKeys}
        // selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              allowsSorting
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No users found"}
          isLoading={!result?.isSuccess}
          items={orders}
        >
          {(item: any) => (
            <TableRow key={item?.id}>
              {(columnKey) => (
                <TableCell>
                  <CellContent
                    key={item?.id}
                    columnKey={columnKey}
                    item={item}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* <CreateUserModal isOpen={isOpen} onOpenChange={onOpenChange} /> */}
    </>
  );
}
