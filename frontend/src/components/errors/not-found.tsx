// app/not-found.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
      {/* SVG */}
      <div className="w-full ">
        {/* max-w-sm */}
        <Image
          src="/404-Error.svg"
          alt="404 Illustration"
          width={800}
          height={800}
          className="mx-auto"
        />
      </div>

      {/* Text */}
      <div>
        <h1 className="text-7xl font-bold">Oops!</h1>
        <h2 className=" mt-4 text-3xl font-medium">Something went wrong</h2>
        <p className="mt-2 text-muted-foreground">
          The page you're looking for isn't found,
          we suggest you go back to home.
        </p>
      </div>

      {/* Back to home button */}
      <Link href="/dashboard">
        <Button className="px-6 py-2 text-base">Back to Home</Button>
      </Link>
    </div>
  );
}
