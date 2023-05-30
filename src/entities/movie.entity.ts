
import { ApiProperty } from '@nestjs/swagger'
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('movies')
export class Movie extends BaseEntity {
  @ApiProperty({ example: 'Movie id', description: 'Movie id' })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({ example: 'Star Wars', description: 'Movie title' })
  @Column({ name: 'title', type: 'varchar' })
  title: string

  @ApiProperty({ example: 'Igor Smelyanets', description: 'Movie director' })
  @Column({ name: 'director', type: 'varchar' })
  director: string

  @ApiProperty({ example: '08-05-2000', description: 'Date of release' })
  @Column({ name: 'release date', type: 'varchar' })
  releaseDate: string


}