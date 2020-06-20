import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  public login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  public name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  public password: string;
}
