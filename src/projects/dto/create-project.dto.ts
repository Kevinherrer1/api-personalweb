import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsUUID,
  IsArray,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  repositoryUrl?: string;

  @IsUrl()
  @IsOptional()
  projectUrl?: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  technologyIds?: string[];
} 