// src/lib/seed.ts

import { prisma } from "../src/lib/prisma.js";   // ✅ your project’s prisma instance
import bcrypt from "bcrypt";

async function main() {
  const email = "alice@example.com";
  const plainPassword = "Test@123";

  console.log("🌱 Running seed script...");

  // Check if user already exists
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log(`⚠️ User already exists: ${email}`);
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Create the user
  const user = await prisma.user.create({
    data: {
      name: "Alice Example",
      email,
      password: hashedPassword,
      type: "INTERNAL",
      status: "ACTIVE",
    },
  });

  console.log("✅ User created successfully:");
  console.log(user);
}

main()
  .then(() => {
    console.log("🌱 Seed complete.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seed error:", err);
    process.exit(1);
  });
