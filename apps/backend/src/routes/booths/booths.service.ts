import { Injectable } from '@nestjs/common';
import { prisma, Rating, Task } from '@workspace/db';
import { UpdateBoothDto } from './dto/update-booth.dto';
import { CreateBoothDTO } from './dto/create-booth.dto';

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

  async fetchBooth(userId: string, boothId: string) {
    const boothFetched = await prisma.booth.findFirst({
      where: {
        id: boothId,
        OR: [
          {
            intervieweeId: userId,
          },
          { interviewerId: userId },
        ],
      },
      include: {
        interviewee: true,
        interviewer: true,
        tasks: true,
        review: true,
        rating: true,
      },
    });

    return boothFetched;
  }

  async createBooth(userId: string, createBoothData: CreateBoothDTO) {
    const { intervieweeId, passed, title, review, rating, tasks } =
      createBoothData;

    if (!userId) {
      throw new Error('Interviewer ID not provided');
    }

    const newBooth = await prisma.booth.create({
      data: {
        interviewerId: userId,
        intervieweeId: intervieweeId!,
        title: title ?? `Example ${Math.random() * 20 + 1}`,
        passed,
      },
    });

    await prisma.review.create({
      data: {
        boothId: newBooth.id,
        content: review,
      },
    });

    await prisma.rating.create({
      data: {
        boothId: newBooth.id,
        content: rating as Pick<Rating, 'content'>['content'],
      },
    });

    await Promise.all(
      tasks!.map(async (task: Record<string, string>) => {
        await prisma.task.create({
          data: {
            boothId: newBooth.id,
            name: task.name!,
          },
        });
      }),
    );
  }

  async deleteTask(id: number) {
    await prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async deleteBooth(id: string) {
    await prisma.booth.delete({
      where: {
        id,
      },
    });
  }

  async updateBooth(
    boothId: string,
    userId: string,
    updateData: UpdateBoothDto,
  ) {
    const fetchedBooth = await prisma.booth.findFirst({
      where: { id: boothId, interviewerId: userId },
      include: {
        tasks: true,
        review: true,
      },
    });

    if (!fetchedBooth) {
      throw new Error(
        'User is not owner of this booth or booth does not exist',
      );
    }

    const { title, intervieweeId, passed, tasks, review, rating } = updateData;

    if (!title && !intervieweeId && !passed && !tasks && !review && !rating) {
      throw new Error('No data to update');
    }

    const dataBooth = {
      title: title,
      intervieweeId: intervieweeId,
      passed: passed,
    };

    await prisma.booth.update({
      where: {
        id: boothId,
      },
      data: dataBooth,
    });

    if (review) {
      await prisma.review.update({
        where: {
          boothId: fetchedBooth.id,
        },
        data: {
          content: review,
        },
      });
    }
    if (tasks && tasks.length > 0) {
      await Promise.all(
        tasks.map((task: Task) => {
          if (!task.id) {
            return prisma.task.create({
              data: {
                name: task.name,
                boothId: task.boothId,
              },
            });
          }
          return prisma.task.update({
            where: {
              boothId: task.boothId,
              id: task.id,
            },
            data: {
              name: task.name,
            },
          });
        }),
      );
    }
    if (rating) {
      await prisma.rating.update({
        where: {
          boothId: boothId,
        },
        data: {
          content: rating as Pick<Rating, 'content'>['content'],
        },
      });
    }
    return {
      message: `Booth ${boothId} updated successfully`,
    };
  }
}
