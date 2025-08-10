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
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly icon?: string;

  @IsString()
  @IsOptional()
  readonly type?: 'HTML_CSS_JS' | 'REACT';

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
