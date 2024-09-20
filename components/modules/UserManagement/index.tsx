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
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  SharedSelection,
  Tooltip,
  ButtonGroup,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";

import { users, statusOptions, fakeUsers } from "@/helpers/data/table";
import { capitalize } from "@/utils/capitalize";
import {
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  PlusIcon,
  SearchIcon,
} from "@/components/core/common/icons";
import useTableQueries from "@/hooks/useTableQueries";
import ConfirmationModal from "@/components/core/common/confirmation-modal";
import Opener from "@/components/core/common/opener";
import UserProfileModal from "@/components/core/common/user-profile-modal";
import { Icon } from "@iconify/react";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

type User = (typeof fakeUsers)[0];

const columns = [
  { name: "ID", uid: "id" },
  { name: "NAME", uid: "fullname" },
  { name: "ROLE", uid: "role" },
  { name: "DEPARTMENT", uid: "department" },
  { name: "STATUS", uid: "is_active" },
  { name: "ACTIONS", uid: "actions" },
];

const departments = [
  {
    id: 1,
    name: "Engineering",
  },
  {
    id: 2,
    name: "Marketing",
  },
  {
    id: 3,
    name: "Sales",
  },
  {
    id: 4,
    name: "HR",
  },
  {
    id: 5,
    name: "Finance",
  },
];

const roles = [
  {
    id: 1,
    name: "Admin",
  },
  {
    id: 2,
    name: "Exam Manager",
  },
  {
    id: 3,
    name: "IT Support",
  },
  {
    id: 4,
    name: "Proctor",
  },
];

export default function UserManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;
  const search = searchParams.get("search") || "";

  const rawStatus = searchParams.get("status") || "all";

  const status = rawStatus !== "all" ? new Set(rawStatus.split(",")) : "all";

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const { handleSearch, handleFilter, handleChangePage, handleChangeLimit } =
    useTableQueries();

  const hasSearchFilter = Boolean(search);

  const headerColumns = React.useMemo(() => {
    return columns;
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...fakeUsers];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.fullname.toLowerCase().includes(search.toLowerCase())
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

  const pages = Math.ceil(filteredItems.length / limit) || 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, limit]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: any, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "fullname":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={user.fullname}
          />
        );
      case "department":
        return (
          <p className="text-bold text-small capitalize">
            {departments.find((dep) => dep.id === user.department_id)?.name}
          </p>
        );
      case "role":
        return (
          <p className="text-bold text-small capitalize">
            {roles.find((role) => role.id === user.role_id)?.name}
          </p>
        );
      case "is_active":
        return (
          <Chip
            className="capitalize"
            color={cellValue ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {cellValue ? "Active" : "Inactive"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2 justify-center">
            <Opener
              renderContent={({ close }) => (
                <UserProfileModal id="" onClose={close} />
              )}
              renderOpener={({ open }) => (
                <Tooltip content="Details">
                  <button
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={open}
                  >
                    <EyeIcon />
                  </button>
                </Tooltip>
              )}
            />
            <Tooltip content="Edit user">
              <button
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => router.push(`/users/${user?.id}/edit`)}
              >
                <EditIcon />
              </button>
            </Tooltip>
            <Opener
              renderContent={({ close }) => (
                <ConfirmationModal
                  actionText="Delete"
                  header="Are you sure you want to delete this user?"
                  message="This action cannot be undone. This will permanently delete the user from the system."
                  type="danger"
                  onClose={close}
                  onConfirm={close}
                />
              )}
              renderOpener={({ open }) => (
                <Tooltip color="danger" content="Delete user">
                  <button
                    className="text-lg text-danger cursor-pointer active:opacity-50"
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
  }, []);

  const handleMultipleSelection = React.useCallback((keys: SharedSelection) => {
    handleFilter({ status: Array.from(keys).join(",") });
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      handleChangePage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      handleChangePage(page - 1);
    }
  }, [page]);

  const onLimitChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleChangeLimit(Number(e.target.value));
    },
    []
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
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
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
            </Dropdown>
            <ButtonGroup>
              <Button
                color="primary"
                // className="px-"
                // endContent={<PlusIcon />}
                onClick={() => router.push("/users/create")}
                // onPress={onOpen}
              >
                Add New
              </Button>
              <Button
                className="min-w-fit"
                color="primary"
                endContent={<Icon icon="solar:alt-arrow-down-line-duotone" />}
              />
            </ButtonGroup>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
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
      <div className="py-2 px-2 flex justify-center items-center">
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
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* <CreateUserModal isOpen={isOpen} onOpenChange={onOpenChange} /> */}
    </>
  );
}
