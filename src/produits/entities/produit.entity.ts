import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

Entity();
export class Produit {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar' })
  nom: string;

  @ApiProperty()
  @Column({ type: 'integer' })
  prix: number;

  @ApiProperty()
  @Column({ type: 'integer' })
  quantité: number;
}
