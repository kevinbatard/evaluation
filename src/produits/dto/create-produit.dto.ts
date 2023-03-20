import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsNumber, Length } from 'class-validator';

export class CreateProduitDto {
  @ApiProperty()
  @IsString()
  @Length(1, 255)
  nom: string;

  @ApiProperty()
  @IsNumber()
  prix: number;

  @ApiProperty()
  @IsNumber()
  quantité: number;
}
