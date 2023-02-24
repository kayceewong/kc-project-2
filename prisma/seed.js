import Client from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new Client.PrismaClient()

const seed = async () => {
  await prisma.user.deleteMany()

  await prisma.user.createMany({
    data: Array(10).fill(null).map(() => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }))
  })

  // for (let i = 0; i < 10; i += 1) {
  //   await prisma.user.create({
  //     data: {
  //       firstName: faker.name.firstName(),
  //       lastName: faker.name.lastName()
  //     }
  //   })
  // }
}

seed()
