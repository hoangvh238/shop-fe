import { SquareX } from "lucide-react";
import Image from "next/image";

export default function ImageGallery({
  images,
  setImage,
}: {
  images: any[];
  setImage: any;
}) {
  function prettyBytes(bytes: number): string {
    if (bytes === 0) return "0 B";

    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k)); // Determines the unit index
    const size = parseFloat((bytes / Math.pow(k, i)).toFixed(2)); // Converts and rounds the size

    return `${size} ${sizes[i]}`;
  }

  function deleteImage(index: number) {
    setImage(images.toSpliced(index, 1));
  }

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 py-4 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {images.map((image: any, index: number) => (
        <li key={image?.url} className="relative">
          <div className="aspect-w-10 aspect-h-7 group relative block h-48 w-full rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            <Image
              fill
              alt=""
              className="pointer-events-none object-cover group-hover:opacity-75"
              quality={100}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              src={image?.url}
            />
            <button
              className="group absolute inset-0 flex items-center justify-center focus:outline-none"
              type="button"
              onClick={() => deleteImage(index)}
            >
              <span className="absolute right-1/2 top-0 translate-x-1/2 opacity-0 transition-all group-hover:-top-8 group-hover:opacity-100">
                <SquareX />
              </span>
            </button>
          </div>
          <p className="pointer-events-none block text-sm font-medium text-gray-500">
            {prettyBytes(image?.size)}
          </p>
        </li>
      ))}
    </ul>
  );
}
