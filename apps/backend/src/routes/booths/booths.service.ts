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

    const { title, intervieweeId, passed, tasks, review } = updateData;

    if (!title && !intervieweeId && !passed && !tasks && !review) {
      throw new Error('No data to update');
    }

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
