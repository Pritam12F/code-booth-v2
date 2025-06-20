import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { BoothsService } from './booths.service';
import { UpdateBoothDto } from './dto/update-booth.dto';

@Controller('booths')
export class BoothsController {
  constructor(private boothsService: BoothsService) {}

  @Get()
  async fetchBooths(@Headers() headers: Record<string, string>) {
    try {
      return await this.boothsService.fetchAllBooths(headers.email!);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Could not fetch booths',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  async fetchBooth(
    @Headers() headers: Record<string, string>,
    @Param('id') boothId: string,
  ) {
    try {
      return await this.boothsService.fetchBooth(headers.userId!, boothId);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Could not fetch booth',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: err,
        },
      );
    }
  }

  @Put(':id')
  async updateBooth(
    @Headers() headers: Record<string, string>,
    @Body() updateBoothDto: UpdateBoothDto,
    @Param('id') boothId: string,
  ) {
    try {
      return await this.boothsService.updateBooth(
        boothId,
        headers.userId!,
        updateBoothDto,
      );
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Could not update booth',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: err,
        },
      );
    }
  }

  @Delete(':id')
  async deleteBooth(@Param('id') id: string) {
    try {
      await this.boothsService.deleteBooth(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Could not delete booth',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
