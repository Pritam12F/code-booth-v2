import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { prisma } from '@workspace/db';
import { createTenBooths } from '@workspace/db/seed-booth';

@Injectable()
export class UserService {
  async fetchAllUsersEmails(email: string) {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          email: {
            equals: email,
          },
        },
      },
      select: {
        email: true,
        id: true,
      },
    });

    return users;
  }

  async signUp({ email, password }: { email: string; password: string }) {
    const userExists = await prisma.user.findFirst({
      where: { email },
    });

    if (userExists) {
      throw new Error('User already exists');
    }

    const insertedUser = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, 10),
        accountType: 'CREDENTIALS',
      },
    });

    await createTenBooths(insertedUser.id);
  }
}
