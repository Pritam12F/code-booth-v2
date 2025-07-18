import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @IsOptional()
  readonly review?: string;

  @IsString()
  @IsOptional()
  readonly rating?: string;

  @IsArray()
  @IsOptional()
  readonly tasks?: any[];
}
