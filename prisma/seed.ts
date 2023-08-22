import { EAdminType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  //seed super admin
  await prisma.admin.create({
    data: {
      email: 'admin@admin.com',
      adminType: EAdminType.SUPER_ADMIN,
      password: '$2b$10$Umk.oeeVHPQwly53FRsAXe/hW2ugfqoypSaO6hefxKd05Jr49i6Zq',
      firstName: 'Boma',
      lastName: 'Amakiri',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
