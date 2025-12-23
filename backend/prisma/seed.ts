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

async function main() {
  console.log("🌱 Running seed script...");

  /* ---------------------------------------------------------
   * 1️⃣ SEED DEFAULT ACTIONS
   * --------------------------------------------------------- */
  const defaultActions = [
    { name: "Create", description: "Grants the ability to create new records within the system." },
    { name: "Read", description: "Allows viewing and retrieving system records and data." },
    { name: "Update", description: "Allows editing and modifying existing system records." },
    { name: "Delete", description: "Grants permission to remove or permanently delete records." },
    { name: "Approve", description: "Authorizes the user to approve workflow items or requests." },
    { name: "Reject", description: "Allows rejecting workflow items, submissions, or approval requests." },
  ];

  // Keep created rows for later
  const actionRows = [];
  for (const action of defaultActions) {
    const key = generateKey(action.name);

    // ✅ safer: where by key (because some schemas don't have name unique)
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
   * 2️⃣ SEED DEFAULT RESOURCES
   * --------------------------------------------------------- */
  const defaultResources = [
    { name: "User", description: "Represents system users and their authentication/identity settings." },
    { name: "Role", description: "Defines user roles, access levels, and associated permissions within the system." },
    { name: "Module", description: "Logical grouping of system features and functional capabilities." },
    { name: "Dashboard", description: "Provides visual summaries, analytics, and performance insights for the application." },
    { name: "Resource", description: "Represents manageable system entities used for authorization and access control mapping." },
    { name: "Action", description: "Represents individual CRUD or workflow-level operations available for permission policies." },
    { name: "Permission", description: "Defines authorization mapping between resources and actions within the RBAC framework." },
  ];

  const resourceRows = [];
  for (const res of defaultResources) {
    const key = generateKey(res.name);

    const row = await prisma.resource.upsert({
      where: { key },
      update: {
        name: res.name,
        description: res.description,
        isActive: true,
        isSystem: true,
      },
      create: {
        name: res.name,
        key,
        description: res.description,
        isActive: true,
        isSystem: true,
      },
    });

    resourceRows.push(row);
  }
  console.log("✅ Default Resources seeded");

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
      description:
        "System Administrator role with unrestricted access to all modules, settings, and management capabilities.",
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
  } else {
    console.log("⚠️ User exists:", user.email);
  }

  /* ---------------------------------------------------------
   * 5️⃣ ASSIGN ADMIN ROLE → ALICE
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

  console.log(`🏷️ Assigned Admin role → ${user.email}`);

  /* ---------------------------------------------------------
   * 6️⃣ GENERATE ALL PERMISSIONS (Resource × Action)
   * --------------------------------------------------------- */
  const permissionRows = [];

  for (const res of resourceRows) {
    for (const act of actionRows) {
      // Example: USER_CREATE
      const permKey = generateKey(`${res.key}_${act.key}`);
      const permName = `${res.name}_${act.name}`;

      const permDescription = `Allows ${act.name.toLowerCase()} on ${res.name}.`;

      const perm = await prisma.permission.upsert({
        where: { key: permKey }, // ✅ safe unique
        update: {
          name: permName,
          description: permDescription,
          isActive: true,
          isSystem: true,
          resourceId: res.id,
          actionId: act.id,
        },
        create: {
          name: permName,
          key: permKey,
          description: permDescription,
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
   * 7️⃣ ASSIGN ALL PERMISSIONS TO ADMIN ROLE
   * --------------------------------------------------------- */
  /* ---------------------------------------------------------
 * 7️⃣ ASSIGN ALL PERMISSIONS TO ADMIN ROLE
 *    + accessLevel: "full"
 * --------------------------------------------------------- */
  for (const perm of permissionRows) {
    const exists = await prisma.rolePermission.findFirst({
      where: {
        roleId: adminRole.id,
        permissionId: perm.id,
      },
      select: { id: true },
    });

    if (!exists) {
      await prisma.rolePermission.create({
        data: {
          roleId: adminRole.id,
          permissionId: perm.id,
          accessLevel: "FULL", // ✅ ADD
        },
      });
    } else {
      // Optional: agar already exist hai to also enforce full
      await prisma.rolePermission.update({
        where: { id: exists.id },
        data: { accessLevel: "FULL" }, // ✅ ensure full
      });
    }
  }

  console.log(`✅ Admin role assigned all permissions (${permissionRows.length}) with accessLevel=full`);

  console.log("🌱 Seed complete!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed error:", err);
    process.exit(1);
  });