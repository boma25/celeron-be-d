import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateBlogDto {
  @IsUrl()
  coverImage: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
