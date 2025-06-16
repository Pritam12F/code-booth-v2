import { Injectable } from '@nestjs/common';
import { prisma } from '@workspace/db';
import { UpdateBoothDto } from './dto/update-booth.dto';

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

  async fetchBooth(email: string, boothId: string) {
    const userFetched = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        booths: {
          include: {
            tasks: true,
            review: true,
            rating: true,
            interviewee: true,
            interviewer: true,
          },
        },
      },
    });

    if (!userFetched?.booths.some((x) => x.id === boothId)) {
      return {
        message: 'User is not owner of this booth',
        booth: null,
      };
    }

    return {
      booth: userFetched?.booths.find((x) => x.id === boothId),
      message: 'Booth fetched successfully',
    };
  }

  async deleteBooth(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async updateBooth(
    boothId: string,
    email: string,
    updateData: UpdateBoothDto,
  ) {
    const fetchedUser = await prisma.user.findFirst({
      where: { email },
      select: { booths: true, participatedBooths: true },
    });

    if (!fetchedUser?.booths.some((booth) => booth.id === boothId)) {
      throw new Error('User is not owner of this booth');
    }

    const { title, intervieweeId, passed, tasks, review } = updateData;

    if (!title && !intervieweeId && !passed && !tasks && !review) {
      throw new Error('No data to update');
    }

    const fetchedBooth = await prisma.booth.findFirst({
      where: {
        id: boothId,
      },
      select: {
        review: true,
        tasks: true,
      },
    });

    const dataBooth = {
      title: title || undefined,
      intervieweeId: intervieweeId || undefined,
      passed: passed || undefined,
    };

    await prisma.booth.update({
      where: {
        id: boothId,
      },
      data: dataBooth,
    });

    if (review && tasks && tasks.length > 0) {
      if (fetchedBooth?.review?.id === review.reviewId) {
        await prisma.review.update({
          where: {
            id: review?.reviewId,
          },
          data: {
            content: review?.reviewContent,
          },
        });
      }

      await Promise.all(
        tasks.map((task) => {
          if (fetchedBooth?.tasks.some(({ id }) => id === task.taskId)) {
            return prisma.task.update({
              where: {
                id: task.taskId,
              },
              data: {
                name: task.taskContent,
              },
            });
          }
        }),
      );
    } else if (!review && tasks && tasks.length > 0) {
      await Promise.all(
        tasks.map((task) => {
          if (fetchedBooth?.tasks.some(({ id }) => id === task.taskId)) {
            return prisma.task.update({
              where: {
                id: task.taskId,
              },
              data: {
                name: task.taskContent,
              },
            });
          }
        }),
      );
    } else if (review && (!tasks || tasks.length <= 0)) {
      if (fetchedBooth?.review?.id === review.reviewId) {
        await prisma.review.update({
          where: {
            id: review?.reviewId,
          },
          data: {
            content: review?.reviewContent,
          },
        });
      }
    }
    return {
      message: `Booth ${boothId} updated successfully`,
    };
  }
}
