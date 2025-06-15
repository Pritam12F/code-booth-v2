import {
  Controller,
  Headers,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { BoothsService } from './booths.service';

@Controller('booths')
export class BoothsController {
  constructor(private boothsService: BoothsService) {}

  @Post()
  async fetchBooths(@Headers() headers: Record<string, string>) {
    try {
      return await this.boothsService.fetchAllBooths(headers.token!);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Could not signup user',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
