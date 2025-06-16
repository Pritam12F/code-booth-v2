import {
  IsArray,
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateBoothDto {
  @IsString()
  @IsOptional()
  readonly intervieweeId?: string;

  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsBoolean()
  @IsOptional()
  readonly passed?: boolean;

  @IsObject()
  @IsOptional()
  readonly review?: {
    readonly reviewId: number;
    readonly reviewContent: string;
  };

  @IsArray()
  @IsOptional()
  readonly tasks?: {
    readonly taskId: number;
    readonly taskContent: string;
  }[];
}
