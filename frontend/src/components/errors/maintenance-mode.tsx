"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Maintenance() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
      
      {/* SVG */}
      <div className="w-full">
        <Image
          src="/503-Error-Service-Unavailable.svg"
          alt="Maintenance Illustration"
          width={600}
          height={600}
          className="mx-auto"
        />
      </div>

      {/* Text */}
      <div>
        <h1 className="text-7xl font-bold">Maintenance</h1>
        <h2 className="mt-4 text-3xl font-medium">We’ll be back soon!</h2>
        <p className="mt-2 text-muted-foreground">
          Our website is currently undergoing scheduled maintenance.<br />
          We’ll be back online shortly. Thank you for your patience.
        </p>
      </div>

      {/* Back to home */}
      <Link href="/dashboard">
        <Button className="px-6 py-2 text-base">Back to Home</Button>
      </Link>
    </div>
  );
}
