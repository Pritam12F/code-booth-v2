import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateBoothDTO {
  @IsString()
  readonly intervieweeId?: string;

  @IsString()
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
