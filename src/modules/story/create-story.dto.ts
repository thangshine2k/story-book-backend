import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateStoryDto {
  @IsString()
  title!: string;

  @IsString()
  slug!: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  chapters?: CreateChapterDto[];
}

export class CreateChapterDto {
  storyId!: number;
  chapterNumber!: number;
  title!: string;
  contentUrl!: string;
}
