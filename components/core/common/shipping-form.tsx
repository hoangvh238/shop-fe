"use client";

import type { InputProps } from "@nextui-org/react";

import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Input,
} from "@nextui-org/react";
import axios from "axios";

import { cn } from "@/utils/cn";
import { endpointOther } from "@/helpers/enpoints";
import { constants } from "@/settings";
import webStorageClient from "@/utils/webStorageClient";

export type ShippingFormProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: InputProps["variant"];
  hideTitle?: boolean;
  submitOrder: (item: any) => void;
  inputShipping: FormShippingType;
  quantity: number;
  price: number;
};

export type FormShippingType = {
  email: string;
  firstname: string;
  lastname: string;
  street: string;
  district: string;
  city: string;
  phoneNumber: string;
};

interface Province {
  id: string;
  name: string;
}

interface District {
  id: string;
  name: string;
}

interface Ward {
  id: string;
  name: string;
}

const initialAddress = {
  id: "",
  name: "",
};

const ShippingForm = React.forwardRef<HTMLDivElement, ShippingFormProps>(
  (
    {
      variant = "flat",
      className,
      quantity,
      inputShipping,
      hideTitle,
      price,
      submitOrder,
    },
    ref,
  ) => {
    const [form, setForm] = React.useState(inputShipping);

    const [provinces, setProvinces] = React.useState<Province[]>([]);
    const [districts, setDistricts] = React.useState<Province[]>([]);
    const [wards, setWards] = React.useState<Province[]>([]);
    const [token, setToken] = React.useState("");
    const [shippingAmount, setShippingAmount] = React.useState(0);

    const [selectedProvince, setSelectedProvince] =
      React.useState(initialAddress);
    const [selectedDistrict, setSelectedDistrict] =
      React.useState(initialAddress);
    const [selectedWard, setSelectedWard] = React.useState(initialAddress);

    React.useEffect(() => {
      const fetchProvinces = async (newtoken: string) => {
        try {
          const response = await axios({
            method: "GET",
            url: endpointOther.GET_PROVINCE,
            headers: {
              Authorization: `Bearer ${newtoken}`,
            },
          });

          setProvinces(response.data?.data); // Giả định API trả về danh sách tỉnh
        } catch (error) {
          console.log("newtoken", newtoken);
        }
      };
      const loginGoship = async () => {
        try {
          const curtoken = webStorageClient.get(constants.ACCESS_TOKEN_GOSHIP);

          if (!curtoken) {
            const { data } = await axios.post(endpointOther.LOGIN_GOSHIP, {
              username: "leducanhphuongdev@gmail.com",
              password: constants.GOSHIP.PASSWORD,
              client_id: constants.GOSHIP.CLIENT_ID,
              client_secret: constants.GOSHIP.CLIENT_SECRET,
            });

            setToken(data?.access_token);
            webStorageClient.set(
              constants.ACCESS_TOKEN_GOSHIP,
              data?.access_token,
            );
            fetchProvinces(data?.access_token);
          } else {
            try {
              setToken(curtoken);
              fetchProvinces(curtoken);
            } catch (err) {
              webStorageClient.remove(constants.ACCESS_TOKEN_GOSHIP);
            }
          }
        } catch (err) {
          console.log("err", err);
        }
      };

      loginGoship();
    }, []);

    // Gọi API để lấy danh sách huyện/quận dựa trên tỉnh đã chọn
    React.useEffect(() => {
      if (selectedProvince) {
        const fetchDistricts = async () => {
          try {
            const response = await axios({
              method: "GET",
              url: endpointOther.GET_DISTRICT.replace(
                "{id}",
                selectedProvince?.id,
              ),
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            setDistricts(response?.data?.data); // Giả định API trả về danh sách huyện
            setWards([]); // Reset danh sách xã/phường khi chọn tỉnh mới
            setSelectedDistrict(initialAddress); // Reset giá trị huyện
            setSelectedWard(initialAddress); // Reset giá trị xã/phường
          } catch (error) {}
        };

        if (selectedProvince?.id) fetchDistricts();
      }
    }, [selectedProvince]);

    // Gọi API để lấy danh sách xã/phường dựa trên huyện/quận đã chọn
    React.useEffect(() => {
      if (selectedDistrict) {
        const fetchWards = async () => {
          try {
            const response = await axios({
              method: "GET",
              url: endpointOther.GET_WARDS.replace(
                "{id}",
                selectedDistrict?.id,
              ),
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            setWards(response?.data?.data); // Giả định API trả về danh sách xã
            setSelectedWard(initialAddress); // Reset giá trị xã/phường khi chọn huyện mới
          } catch (error) {}
        };

        if (selectedDistrict?.id) fetchWards();
      }
    }, [selectedDistrict]);

    React.useEffect(() => {
      const calculateShipping = async () => {
        try {
          const shippingPrice = await axios({
            method: "POST",
            url: endpointOther.CALCULATE_SHIPPING,
            data: formCalculateShipping,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const price = Math.floor(
            shippingPrice?.data?.data[0]?.total_amount / 1.8,
          );

          handleForm(price, "shippingPrice");

          setShippingAmount(price);
        } catch (err) {}
      };
      const formCalculateShipping = {
        shipment: {
          address_from: {
            district: "550400",
            city: "550000",
          },
          address_to: {
            district: selectedDistrict,
            city: selectedProvince,
          },
          parcel: {
            cod: 0,
            amount: price,
            width: 25,
            height: 30,
            length: 1.8 * quantity,
            weight: 0.2 * quantity,
          },
        },
      };

      if (selectedWard?.id) calculateShipping();
    }, [selectedWard]);

    // Xử lý khi chọn tỉnh/thành phố
    const handleProvinceChange = (e: any) => {
      const newSelected =
        provinces.find((province) => province?.id === e) ?? initialAddress;

      handleForm(newSelected?.name, "city");
      setSelectedProvince(newSelected);
    };


    // Xử lý khi chọn huyện/quận
    const handleDistrictChange = (e: any) => {
      const newSelected =
        districts.find((district) => district?.id === e) ?? initialAddress;

      handleForm(newSelected?.name, "district");
      setSelectedDistrict(newSelected);
    };

    // Xử lý khi chọn xã/phường
    const handleWardChange = (e: any) => {
      const newSelected = wards.find((ward) => ward?.id == e) ?? initialAddress;

      handleForm(newSelected?.name, "street");
      setSelectedWard(newSelected);
    };

    const handleForm = (value: string | number, key: string) => {
      setForm({
        ...form,
        [key]: value,
      });
    };

    React.useEffect(() => {
      submitOrder(form);
    }, [form]);

    return (
      <div ref={ref} className={cn("flex flex-col gap-4", className)}>
        {!hideTitle && (
          <span className="relative text-foreground-500">
            Shipping Information
          </span>
        )}
        <Input
          isRequired
          id="email"
          label="Email"
          labelPlacement="outside"
          placeholder="Mời nhập mail"
          type="email"
          value={form.email}
          variant={variant}
          onChange={({ target }) => {
            handleForm(target.value, target.id);
          }}
        />
        <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
          <Input
            isRequired
            id="firstname"
            label="Họ"
            labelPlacement="outside"
            placeholder="Mời nhập họ"
            value={form.firstname}
            variant={variant}
            onChange={({ target }) => {
              handleForm(target.value, target.id);
            }}
          />
          <Input
            isRequired
            id="lastname"
            label="Tên"
            labelPlacement="outside"
            placeholder="Mời nhập tên"
            value={form.lastname}
            variant={variant}
            onChange={({ target }) => {
              handleForm(target.value, target.id);
            }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
          <Autocomplete
            isRequired
            className="max-w-xs"
            classNames={{
              base: selectedProvince ? "text-black-500" : "",
            }}
            defaultItems={provinces}
            label="Tỉnh/Thành phố"
            labelPlacement="outside"
            listboxProps={{
              emptyContent: "Không tìm thấy Tỉnh/Thành phố nào.",
            }}
            placeholder="Chọn Tỉnh/Thành phố"
            value={selectedProvince?.name}
            variant={variant}
            onSelectionChange={handleProvinceChange}
          >
            {(province: Province) => (
              <AutocompleteItem key={province?.id} value={province?.id}>
                {province?.name}
              </AutocompleteItem>
            )}
          </Autocomplete>
          <Autocomplete
            isRequired
            className="max-w-xs"
            classNames={{
              base: selectedDistrict ? "text-black-500" : "",
            }}
            items={districts}
            label="Huyện/Quận"
            labelPlacement="outside"
            listboxProps={{
              emptyContent: "Không tìm thấy Quận/huyện nào.",
            }}
            placeholder="Chọn Huyện/Quận"
            value={selectedDistrict?.name}
            variant={variant}
            onSelectionChange={handleDistrictChange}
          >
            {(district: Province) => (
              <AutocompleteItem key={district?.id} value={district?.id}>
                {district?.name}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
          <Autocomplete
            isRequired
            className="max-w-xs"
            classNames={{
              base: selectedWard ? "text-black-500" : "",
            }}
            items={wards}
            label="Xã"
            labelPlacement="outside"
            listboxProps={{
              emptyContent: "Không tìm thấy phường/xã nào.",
            }}
            placeholder="Chọn Xã"
            value={selectedWard?.name}
            variant={variant}
            onSelectionChange={handleWardChange}
          >
            {(ward: Province) => (
              <AutocompleteItem key={ward?.id} value={ward?.id}>
                {ward?.name}
              </AutocompleteItem>
            )}
          </Autocomplete>
          <Input
            isRequired
            id="phoneNumber"
            label="SDT"
            labelPlacement="outside"
            placeholder="666 666 666"
            startContent={<p>+84</p>}
            value={form.phoneNumber}
            variant={variant}
            onChange={({ target }) => {
              handleForm(target.value, target.id);
            }}
          />
        </div>
        <form
          className="mb-4 mt-6 flex items-end gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            classNames={{
              label: "text-default-700",
              inputWrapper: "bg-background",
            }}
            color="primary"
            label="Mã giảm giá"
            labelPlacement="outside"
            placeholder="Nhập mã giảm giá"
            variant="bordered"
            // onChange={({ target }) => setVoucher(target.value)}
          />
          <Button type="submit">Xác nhận</Button>
        </form>
        <div className="flex justify-between">
          <dt className="text-small text-default-500">Vận chuyển</dt>
          <dd className="text-small font-semibold text-default-700">
            {Number(shippingAmount).toLocaleString("VN-vi")} VNĐ
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-small text-default-500">Giảm giá</dt>
          <dd className="text-small font-semibold text-success">0 VNĐ</dd>
        </div>
        <Divider />
        <div className="flex justify-between">
          <dt className="text-small font-semibold text-default-500">
            Tổng cộng
          </dt>
          <dd className="text-small font-semibold text-default-700">
            {Number(price + Number(shippingAmount)).toLocaleString("VN-vi")} VNĐ
          </dd>
        </div>
      </div>
    );
  },
);

ShippingForm.displayName = "ShippingForm";

export default ShippingForm;
