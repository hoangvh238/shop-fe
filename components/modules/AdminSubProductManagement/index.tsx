"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  User,
  Selection,
  SortDescriptor,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { Plus } from "lucide-react";
import { Icon } from "@iconify/react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";

import { users, fakeUsers } from "@/helpers/data/table";
import { DeleteIcon, EditIcon, EyeIcon } from "@/components/core/common/icons";
import useTableQueries from "@/hooks/useTableQueries";
import ConfirmationModal from "@/components/core/common/confirmation-modal";
import Opener from "@/components/core/common/opener";
import { SubProduct } from "@/helpers/data/adminProducts";
import {
  useDeleteSubProductMutation,
  useGetAllSubProductQuery,
} from "@/store/queries/productManagement";
import Toast from "@/components/core/common/toast-item";

import "swiper/css";
import "swiper/css/navigation";

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
  { name: "GIÁ", uid: "price" },
  {
    name: "MÃ MÀU",
    uid: "color",
  },
  {
    name: "KÍCH CỠ",
    uid: "size",
  },
  { name: "TRẠNG THÁI", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const CellContent = ({
  item,
  columnKey,
  productID,
}: {
  item: any;
  columnKey: React.Key;
  productID: string;
}) => {
  const router = useRouter();

  const [deleteSubProduct] = useDeleteSubProductMutation();

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["text"]),
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  const handleDeleteProduct = (id: string) => {
    Toast(deleteSubProduct, { id: id }, "Xóa mẫu");
    router.refresh();
  };

  const renderCell = React.useCallback(
    (user: any, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof User];

      switch (columnKey) {
        case "id":
          return <p className="text-bold text-small capitalize">{user.id}</p>;
        case "price":
          return (
            <p className="text-bold text-small capitalize">
              {user.price.toLocaleString()}
            </p>
          );
        case "color":
          return (
            <div className="flex items-center">
              <span
                className="block size-8 rounded-full"
                style={{ backgroundColor: user.color }}
              />
            </div>
          );
        case "size":
          return <p className="text-bold text-small uppercase">{user.sizes}</p>;
        case "status":
          return (
            <Dropdown>
              <DropdownTrigger>
                {selectedValue === "available" ? (
                  <Chip className="capitalize" color="danger">
                    Dừng bán
                  </Chip>
                ) : (
                  <Chip className="capitalize" color="success">
                    Đang bán
                  </Chip>
                )}
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Single selection example"
                defaultSelectedKeys="available"
                selectedKeys={selectedKeys}
                selectionMode="single"
                variant="flat"
                onSelectionChange={setSelectedKeys}
              >
                <DropdownItem key="available">Đang bán</DropdownItem>
                <DropdownItem key="unavailable" className="text-danger">
                  Dừng bán
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Opener
                renderContent={({ close }) => (
                  <Modal isOpen={true} onClose={close}>
                    <ModalContent className="p-6">
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">
                            Ảnh của mẫu
                          </ModalHeader>
                          <ModalBody>
                            <Swiper
                              className="mySwiper"
                              modules={[Navigation]}
                              navigation={true}
                            >
                              {user?.images?.map((image: string) => (
                                <SwiperSlide key={image} className="w-[500px]">
                                  <Image
                                    alt="ảnh của mẫu"
                                    className="object-cover"
                                    height={500}
                                    src={image}
                                    width={500}
                                  />
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          </ModalBody>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                )}
                renderOpener={({ open }) => (
                  <Tooltip content="Xem ảnh của mẫu">
                    <button
                      className="cursor-pointer text-lg text-default-400 active:opacity-50"
                      onClick={open}
                    >
                      <EyeIcon />
                    </button>
                  </Tooltip>
                )}
              />
              <Tooltip content="Chỉnh sửa">
                <button
                  className="cursor-pointer text-lg text-default-400 active:opacity-50"
                  onClick={() =>
                    router.push(`/admin/product/${productID}/edit/${user?.id}`)
                  }
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
                    onConfirm={() => {
                      handleDeleteProduct(user?.id);
                      close();
                    }}
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

export default function AdminSubProductManagement({
  productID,
}: {
  productID: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;
  const search = searchParams.get("search") || "";

  const rawStatus = searchParams.get("status") || "all";

  const status = rawStatus !== "all" ? new Set(rawStatus.split(",")) : "all";

  const { subProducts } = useGetAllSubProductQuery(
    { id: productID },
    {
      selectFromResult: ({ data }) => {
        return {
          subProducts: data?.result?.products ?? [],
        };
      },
    },
  );

  const [visibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["text"]),
  );

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const { handleSearch, handleFilter, handleChangeLimit } = useTableQueries();

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

  const items = React.useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, limit]);

  const sortedItems = React.useMemo(() => {
    return [...subProducts].sort((a: SubProduct, b: SubProduct) => {
      const first = a[sortDescriptor.column as keyof SubProduct] as number;
      const second = b[sortDescriptor.column as keyof SubProduct] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items, subProducts]);

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
          <div className="flex w-full justify-between gap-3">
            <button
              className="text-xl text-slate-600 hover:text-foreground"
              onClick={() => router.back()}
            >
              <Icon icon="solar:alt-arrow-left-line-duotone" />
            </button>
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
              onClick={() => router.push(`/admin/product/${productID}/create`)}
            >
              Thêm mẫu mới
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Tổng {subProducts.length} Mẫu
          </span>
        </div>
      </div>
    );
  }, [
    search,
    status,
    visibleColumns,
    onSearchChange,
    onLimitChange,
    subProducts.length,
    hasSearchFilter,
  ]);

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
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
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  <CellContent
                    key={item.id}
                    columnKey={columnKey}
                    item={item}
                    productID={productID}
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
