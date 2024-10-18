import React, { useState, useCallback } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";

export default function JsonUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }, []);

  React.useEffect(() => {
    console.log("file", file);
  }, [file]);

  return (
    <Card
      className={`mx-auto w-full p-8 shadow-none`}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <CardBody
        className={`flex flex-col items-center gap-4 rounded-md border-2 border-dashed p-6 shadow-none ${isDragging ? "border-primary" : ""}`}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-default-100">
          <CloudUploadIcon className="h-8 w-8 text-default-500" />
        </div>
        <h2 className="text-lg font-semibold">
          Chọn file hoặc kéo thả vào đây
        </h2>
        <p className="text-sm text-default-500">File Json (5MB)</p>
        {file ? (
          <p className="text-sm text-success">Tên file: {file.name}</p>
        ) : (
          <p className="text-sm text-default-400">No file selected</p>
        )}
        <label htmlFor="file-upload">
          <Button as="span" className="mt-2" color="primary">
            Chọn File
          </Button>
        </label>
        <input
          accept="image/*"
          className="hidden"
          id="file-upload"
          type="file"
          onChange={onFileChange}
        />
      </CardBody>
    </Card>
  );
}

function CloudUploadIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}
