// // src/lib/seed.ts

// import { prisma } from "../src/lib/prisma.js";   // ✅ your project’s prisma instance
// import bcrypt from "bcrypt";

// async function main() {
//   const email = "alice@example.com";
//   const plainPassword = "Test@123";

//   console.log("🌱 Running seed script...");

//   // Check if user already exists
//   const existing = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (existing) {
//     console.log(`⚠️ User already exists: ${email}`);
//     return;
//   }

//   // Hash password
//   const hashedPassword = await bcrypt.hash(plainPassword, 10);

//   // Create the user
//   const user = await prisma.user.create({
//     data: {
//       name: "Alice Example",
//       email,
//       password: hashedPassword,
//       type: "INTERNAL",
//       status: "ACTIVE",
//     },
//   });

//   console.log("✅ User created successfully:");
//   console.log(user);
// }

// main()
//   .then(() => {
//     console.log("🌱 Seed complete.");
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error("❌ Seed error:", err);
//     process.exit(1);
//   });

import { prisma } from "../src/lib/prisma.js";
import bcrypt from "bcrypt";
import { generateKey } from "../src/common/utils/generate-key.js";

/* ---------------------------------------------------------
   SYSTEM PREFIX MAP (GLOBAL, UNIQUE, SHORT)
--------------------------------------------------------- */
const SYSTEM_PREFIX_MAP: Record<string, string> = {
  User: "USR",
  Role: "ROL",
  Module: "MOD",
  Dashboard: "DSH",
  Resource: "RES",
  Action: "ACT",
  Permission: "PER",
};

async function main() {
  console.log("🌱 Running seed script...");

  /* ---------------------------------------------------------
   * 1️⃣ SEED DEFAULT ACTIONS
   * --------------------------------------------------------- */
  const defaultActions = [
  // CRUD
  { name: "Create", description: "Allows creating records." },
  { name: "Read", description: "Allows viewing records." },
  { name: "Update", description: "Allows editing records." },
  { name: "Delete", description: "Allows deleting records." },

  // Lifecycle
  { name: "Archive", description: "Allows archiving records." },
  { name: "Restore", description: "Allows restoring archived records." },

  // Approval Flow
  { name: "Approve", description: "Allows approval actions." },
  { name: "Reject", description: "Allows rejection actions." },

  // Collaboration
  { name: "Assign", description: "Allows assigning records to users." },
  { name: "Comment", description: "Allows commenting on records." },
  { name: "Attach", description: "Allows attaching files to records." },

  // Data Ops
  { name: "Export", description: "Allows exporting data." },
  { name: "Import", description: "Allows importing data." },

  // Bulk Ops
  { name: "Bulk Update", description: "Allows bulk update operations." },
  { name: "Bulk Delete", description: "Allows bulk delete operations." },
];


  const actionRows = [];
  for (const action of defaultActions) {
    const key = generateKey(action.name);

    const row = await prisma.action.upsert({
      where: { key },
      update: {
        name: action.name,
        description: action.description,
        isActive: true,
        isSystem: true,
      },
      create: {
        name: action.name,
        key,
        description: action.description,
        isActive: true,
        isSystem: true,
      },
    });

    actionRows.push(row);
  }

  console.log("✅ Default Actions seeded");

  /* ---------------------------------------------------------
   * 2️⃣ SEED SYSTEM RESOURCES + MASTER OBJECTS
   * --------------------------------------------------------- */
  const defaultResources = [
    { name: "User", description: "System users" },
    { name: "Role", description: "Access roles" },
    { name: "Module", description: "System modules" },
    { name: "Dashboard", description: "Dashboards" },
    { name: "Resource", description: "Resources for RBAC" },
    { name: "Action", description: "System actions" },
    { name: "Permission", description: "RBAC permissions" },
  ];

  const resourceRows = [];

  for (const res of defaultResources) {
    const key = generateKey(res.name);
    const codePrefix = SYSTEM_PREFIX_MAP[res.name];

    if (!codePrefix) {
      throw new Error(`❌ Missing codePrefix for resource: ${res.name}`);
    }

    const row = await prisma.$transaction(async (tx) => {
      /* ---------------- CREATE MASTER OBJECT ---------------- */
      const masterObject = await tx.masterObject.upsert({
        where: { key },
        update: {
          name: res.name,
          codePrefix,
          isActive: true,
          isSystem: true,
        },
        create: {
          name: res.name,
          key,
          codePrefix,
          isActive: true,
          isSystem: true,
        },
      });

      /* ---------------- INIT RECORD COUNTER ---------------- */
      await tx.masterObjectCounter.upsert({
        where: { masterObjectId: masterObject.id },
        update: {},
        create: {
          masterObjectId: masterObject.id,
          lastNumber: 0,
        },
      });

      /* ---------------- CREATE RESOURCE ---------------- */
      return tx.resource.upsert({
        where: { key },
        update: {
          name: res.name,
          description: res.description,
          isActive: true,
          isSystem: true,
          codePrefix, // ✅ REQUIRED
          masterObjectId: masterObject.id,
        },
        create: {
          name: res.name,
          key,
          description: res.description,
          isActive: true,
          isSystem: true,
          codePrefix, // ✅ REQUIRED
          masterObjectId: masterObject.id,
        },
      });
    });

    resourceRows.push(row);
  }

  console.log("✅ Default Resources + MasterObjects seeded");

  /* ---------------------------------------------------------
   * 3️⃣ ADMIN ROLE
   * --------------------------------------------------------- */
  const adminRoleName = "Admin";
  const adminKey = generateKey(adminRoleName);

  const adminRole = await prisma.role.upsert({
    where: { name: adminRoleName },
    update: {
      key: adminKey,
      isActive: true,
      isSystem: true,
    },
    create: {
      name: adminRoleName,
      key: adminKey,
      description: "System administrator with full access",
      isActive: true,
      isSystem: true,
    },
  });

  console.log("✅ Admin Role ready");

  /* ---------------------------------------------------------
   * 4️⃣ DEFAULT USER → ALICE
   * --------------------------------------------------------- */
  const email = "alice@example.com";
  const plainPassword = "Test@123";

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    user = await prisma.user.create({
      data: {
        name: "Alice Example",
        email,
        password: hashedPassword,
        type: "INTERNAL",
        status: "ACTIVE",
      },
    });

    console.log("👤 User created:", user.email);
  }

  /* ---------------------------------------------------------
   * 5️⃣ ASSIGN ADMIN ROLE
   * --------------------------------------------------------- */
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: user.id,
        roleId: adminRole.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      roleId: adminRole.id,
    },
  });

  console.log("🏷️ Admin role assigned");

  /* ---------------------------------------------------------
   * 6️⃣ GENERATE PERMISSIONS (RESOURCE × ACTION)
   * --------------------------------------------------------- */
  const permissionRows = [];

  for (const res of resourceRows) {
    for (const act of actionRows) {
      const permKey = `${act.key}__${res.key}`;
      const permName = `${act.key}__${res.key}`;


      const perm = await prisma.permission.upsert({
        where: { key: permKey },
        update: {
          name: permName,
          isActive: true,
          isSystem: true,
          resourceId: res.id,
          actionId: act.id,
        },
        create: {
          name: permName,
          key: permKey,
          description: `Allows ${act.name.toLowerCase()} on ${res.name}`,
          isActive: true,
          isSystem: true,
          resourceId: res.id,
          actionId: act.id,
        },
      });

      permissionRows.push(perm);
    }
  }

  console.log(`✅ Permissions generated: ${permissionRows.length}`);

  /* ---------------------------------------------------------
   * 7️⃣ ASSIGN ALL PERMISSIONS TO ADMIN
   * --------------------------------------------------------- */
  for (const perm of permissionRows) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: perm.id,
        },
      },
      update: { accessLevel: "FULL" },
      create: {
        roleId: adminRole.id,
        permissionId: perm.id,
        accessLevel: "FULL",
      },
    });
  }

  console.log("✅ Admin granted FULL access to all permissions");
  console.log("🌱 Seed complete!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed error:", err);
    process.exit(1);
  });
