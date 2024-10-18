"use client";
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/button";
import router from "next/router";
import React from "react";

import UploadImage from "@/components/core/common/upload-image";
import { checkFields } from "@/utils/checkFields";
import JsonUpload from "@/components/core/common/upload-json";

const AdminCreateCustomCanvas = () => {
  const [inforUpload, setInforUpload] = React.useState([]);
  const [form, setForm] = React.useState({});

  const submitForm = () => { };

  return (
    <div className="flex flex-col">
      <div className="flex w-full gap-4">
        <button
          className="text-xl text-slate-600 hover:text-foreground"
          onClick={() => router.back()}
        >
          <Icon icon="solar:alt-arrow-left-line-duotone" />
        </button>
        <h3 className="text-xl font-medium uppercase">Tạo thiết kế mới</h3>
      </div>
      <p className="mt-4 opacity-85">
        Điền thông tin bên dưới để tạo thiết kế mới
      </p>
      <div className="mt-5 grid max-w-[900px] grid-cols-1 gap-5">
        <JsonUpload />
        <UploadImage
          inforUpload={inforUpload}
          setInforUpload={setInforUpload}
        />
        <Button
          color="primary"
          isDisabled={!checkFields(form)}
          onClick={submitForm}
        >
          Xác nhận
        </Button>
      </div>
    </div>
  );
};

export default AdminCreateCustomCanvas;
