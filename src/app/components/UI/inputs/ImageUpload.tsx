"use client";

import { useCallback } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

type ImageUploadProps = {
  onChange: (value: string) => void;
  value: string;
};

const uploadPreset = "svch3rpy";

function ImageUpload({ onChange, value }: ImageUploadProps) {
  const handleUpload = useCallback(
    (result: { info: { secure_url: string } }) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}>
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative flex flex-col items-center justify-center gap-4 p-20 transition border-2 border-dashed cursor-pointer hover:opacity-70 border-neutral-300 text-neutral-600">
            <TbPhotoPlus size={50} />
            <strong>Click to upload</strong>
            {value ? (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={value}
                  alt="Upload"
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : null}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}

export default ImageUpload;
