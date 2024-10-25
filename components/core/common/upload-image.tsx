// pages/index.tsx

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast, Toaster } from "sonner";

import ImageGallery from "./image-gallery";

import { UploadImage } from "@/settings/uploadImage";

export type TypeImageUpload = {
  inforUpload: {
    size: string;
    url: string;
  }[];
  setInforUpload: (
    inforUpload: {
      size: string;
      url: string;
    }[],
  ) => void;
  label: string;
};

export default function Home({
  inforUpload,
  setInforUpload,
  label,
}: TypeImageUpload) {
  const [draggingOver, setDraggingOver] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (files) => {
      const promise = () =>
        new Promise<void>(async (resolve, reject) => {
          try {
            const infor: TypeImageUpload["inforUpload"] =
              await UploadImage(files);

            setInforUpload([...inforUpload, ...infor]);

            return resolve();
          } catch (err) {
            return reject();
          }
        });

      toast.promise(promise, {
        loading: "Loading...",
        success: "Thêm ảnh thành công",
        error: "Thêm ảnh thất bại",
      });
    },
  });

  const handleDragLeave = () => {
    setDraggingOver(false);
  };

  const handleDragOver = () => {
    setDraggingOver(true);
  };

  return (
    <div className="mx-auto w-full">
      {label && <h1 className="p-0 pb-2 text-sm font-normal">{label}</h1>}
      <Toaster closeButton richColors position="top-right" />
      {inforUpload.length != 0 && (
        <ImageGallery images={inforUpload} setImage={setInforUpload} />
      )}

      <div className="flex text-sm text-gray-600">
        <div
          className="w-full"
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
        >
          <div
            {...getRootProps({
              className: `${
                draggingOver ? "border-blue-500" : "border-gray-300"
              } mt-1 flex items-center justify-center rounded-md border-2 border-dashed px-6 pb-6 pt-5`,
            })}
          >
            <label
              className="inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              htmlFor="file-upload"
            >
              <div className="text-md">Chọn File</div>
              <input {...getInputProps()} />
            </label>
            <p className="pl-1 text-sm">hoặc kéo thả file vào đây</p>
          </div>
        </div>
      </div>
    </div>
  );
}
