import { EAdminType, PrismaClient } from '@prisma/client';
import {
  blogsSeedData,
  productsSeedData,
  superAdminSeedData,
  userSeedData,
} from './seed.data';

const prisma = new PrismaClient();

async function main() {
  //seed super admin
  const adminExist = await prisma.admin.findUnique({
    where: { email: superAdminSeedData.email },
  });
  !adminExist &&
    (await prisma.admin.create({
      data: superAdminSeedData,
    }));

  //seed blogs
  const blogsExist = await prisma.blog.findMany();
  !blogsExist.length &&
    (await prisma.blog.createMany({
      data: blogsSeedData,
    }));

  //seed products
  const productsExist = await prisma.product.findMany();
  !productsExist.length &&
    productsSeedData.forEach(async ({ medias, ...product }) => {
      const newProduct = await prisma.product.create({ data: product });
      medias.forEach(async (media) => {
        await prisma.productMedia.create({
          data: { ...media, product: { connect: { id: newProduct.id } } },
        });
      });
    });

  //seed user
  const userExist = await prisma.user.findUnique({
    where: { email: userSeedData.email },
  });
  !userExist && (await prisma.user.create({ data: userSeedData }));
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
