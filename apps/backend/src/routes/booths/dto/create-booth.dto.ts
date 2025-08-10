import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBoothDTO {
  @IsString()
  @IsOptional()
  readonly intervieweeId?: string;

  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @IsString()
  @IsOptional()
  readonly icon?: string;

  @IsString()
  @IsOptional()
  readonly description!: string;

  @IsString()
  @IsNotEmpty()
  readonly type!: 'HTML_CSS_JS' | 'REACT';

  @IsArray()
  @IsOptional()
  readonly tasks?: any[];
}
