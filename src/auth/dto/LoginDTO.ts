import { IsNotEmpty, IsString, MinLength } from 'class-validator';


export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  public login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  public password: string;
}
