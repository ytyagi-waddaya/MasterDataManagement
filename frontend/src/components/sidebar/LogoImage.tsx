"use client"; 

import Image from "next/image";

export default function LogoImage() {
  return (
    <Image
      src="/logo.svg"
      alt="auth image"
      width={100}
      height={80}
      priority
    />
  );
}
