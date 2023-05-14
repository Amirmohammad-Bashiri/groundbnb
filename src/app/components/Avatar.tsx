"use client";

import Image from "next/image";

type AvatarProps = {
  src: string | null | undefined;
};

function Avatar({ src }: AvatarProps) {
  const imageSrc = src ? src : "/images/placeholder.jpg";
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src={imageSrc}
    />
  );
}

export default Avatar;
