import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateTechnologyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsUrl()
  @IsOptional()
  iconUrl?: string;
}
