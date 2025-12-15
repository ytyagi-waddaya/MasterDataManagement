"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Forbidden() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
      
      {/* SVG */}
      <div className="w-full">
        <Image
          src="/403-Error-Forbidden.svg"
          alt="403 Forbidden Illustration"
          width={600}
          height={600}
          className="mx-auto"
        />
      </div>

      {/* Text */}
      <div>
        <h1 className="text-7xl font-bold">Forbidden</h1>
        <h2 className="mt-4 text-3xl font-medium">Access Denied</h2>
        <p className="mt-2 text-muted-foreground">
          You don’t have permission to view this page.<br />
          Please go back or contact your administrator.
        </p>
      </div>

      {/* Back to home */}
      <Link href="/dashboard">
        <Button className="px-6 py-2 text-base">Back to Home</Button>
      </Link>
    </div>
  );
}
