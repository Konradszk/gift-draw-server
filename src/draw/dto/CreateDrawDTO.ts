import { IsArray, IsDate, IsNotEmpty, IsString, MinDate, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDrawDTO {

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string;

  @IsNotEmpty()
  @IsString()
  secret: string;

  @IsDate()
  @Type(() => Date)
  @MinDate(CreateDrawDTO.getMinimalFinishDate())
  finishDate: Date;

  @IsArray()
  participants: string[];

 static getMinimalFinishDate() {
    const finishDay = new Date();
    finishDay.setDate(finishDay.getDate() + 1);
    return finishDay;
  }
}
