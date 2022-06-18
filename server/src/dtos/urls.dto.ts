import { IsString } from 'class-validator';

export class EncodeUrlDto {
  @IsString()
  originalUrl: string;
}
