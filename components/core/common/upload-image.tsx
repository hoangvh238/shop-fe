// pages/index.tsx

import { useState } from "react";
import { useDropzone } from "react-dropzone";

import ImageGallery from "./image-gallery";

import { UploadImage } from "@/settings/uploadImage";

export default function Home({ inforUpload, setInforUpload }: any) {
  const [draggingOver, setDraggingOver] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: async (files) => {
      const infor = await UploadImage(files);

      setInforUpload([...inforUpload, ...infor]);
    },
  });

  const handleDragLeave = () => {
    setDraggingOver(false);
  };

  const handleDragOver = () => {
    setDraggingOver(true);
  };

  return (
    <div className="mx-auto w-full sm:p-6 lg:p-8">
      <ImageGallery images={inforUpload} setImage={setInforUpload} />

      <div className="flex text-sm text-gray-600">
        <div
          className="w-full"
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
        >
          <div
            {...getRootProps({
              className: `${draggingOver ? "border-blue-500" : "border-gray-300"
                } mt-1 flex items-center justify-center rounded-md border-2 border-dashed px-6 pb-6 pt-5`,
            })}
          >
            <label
              className="inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              htmlFor="file-upload"
            >
              <div className="text-md">Choose File</div>
              <input {...getInputProps()} />
            </label>
            <p className="pl-1 text-sm">or drag and drop</p>
          </div>
        </div>
      </div>
    </div>
  );
}
