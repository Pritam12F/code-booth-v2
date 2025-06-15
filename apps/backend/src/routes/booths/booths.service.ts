import { Injectable } from '@nestjs/common';
import { prisma } from '@workspace/db';

@Injectable()
export class BoothsService {
  async fetchAllBooths(email: string) {
    const booths = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        booths: true,
        participatedBooths: true,
      },
    });

    return booths;
  }
}
