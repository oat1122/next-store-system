import { PrismaClient } from "../src/generated/prisma/index.js";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // --- สร้าง Tags ล่วงหน้า ---
  const tagNames = [
    "Office",
    "Gaming",
    "Workstation",
    "Server",
    "Spare",
    "Repair",
    "Urgent",
    "SSD",
    "HDD",
    "Retired",
  ];

  const tags = await Promise.all(
    tagNames.map((name) =>
      prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  // --- สร้าง Computers ---
  for (let i = 0; i < 50; i++) {
    const computer = await prisma.computer.create({
      data: {
        code: `PC-${String(i + 1).padStart(4, "0")}`,
        name: faker.commerce.productName(),
        brand: faker.helpers.arrayElement([
          "Dell",
          "HP",
          "Lenovo",
          "Asus",
          "Acer",
          "MSI",
        ]),
        model:
          faker.commerce.productAdjective() +
          "-" +
          faker.number.int({ min: 100, max: 999 }),
        cpu: faker.helpers.arrayElement([
          "Intel Core i5",
          "Intel Core i7",
          "Intel Core i9",
          "AMD Ryzen 5",
          "AMD Ryzen 7",
          "AMD Ryzen 9",
        ]),
        gpu: faker.helpers.arrayElement([
          "NVIDIA RTX 3060",
          "NVIDIA RTX 3070",
          "NVIDIA RTX 3080",
          "AMD RX 6600",
          "AMD RX 6700",
          "Integrated Graphics",
        ]),
        ramGb: faker.helpers.arrayElement([8, 16, 32, 64]),
        storageGb: faker.helpers.arrayElement([256, 512, 1024, 2048]),
        storageType: faker.helpers.arrayElement(["SSD", "HDD", "Hybrid"]),
        condition: faker.helpers.arrayElement(["in_use", "repair", "retired"]),
        owner: faker.person.firstName(),
        location: faker.helpers.arrayElement([
          "Bangkok HQ",
          "Chiang Mai Office",
          "Pattaya Branch",
        ]),
      },
    });

    // --- Add Images ---
    const numImages = faker.number.int({ min: 1, max: 3 });
    for (let j = 0; j < numImages; j++) {
      await prisma.computerImage.create({
        data: {
          computerId: computer.id,
          url: faker.image.urlLoremFlickr({ category: "computer" }),
          isPrimary: j === 0,
        },
      });
    }

    // --- Add Random Tags ---
    const randomTags = faker.helpers.arrayElements(
      tags,
      faker.number.int({ min: 1, max: 3 })
    );
    for (const tag of randomTags) {
      await prisma.computerTag.create({
        data: {
          computerId: computer.id,
          tagId: tag.id,
        },
      });
    }
  }

  console.log("Seeding finished!");
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
