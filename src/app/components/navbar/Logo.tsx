"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function Logo() {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="Logo"
      className="hidden cursor-pointer md:block"
      height={150}
      width={150}
      src="/images/logo.png"
      priority
    />
  );
}

export default Logo;
