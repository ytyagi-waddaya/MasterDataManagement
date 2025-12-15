export function generateKey(name: string): string {
  return name
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_") 
    .replace(/_+/g, "_")         
    .replace(/^_|_$/g, "");      
}



// const key = generateModuleKey(input.name);

// const exists = await prisma.module.findUnique({
//   where: { key },
// });

// if (exists) throw new Error("Module with this key already exists");

// await prisma.module.create({
//   data: {
//     name: input.name,
//     key,
//     description: input.description,
//     isActive: input.isActive,
//     isSystem: input.isSystem,
//   },
// });
