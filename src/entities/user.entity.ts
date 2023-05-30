import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'



@Entity('users')
export class User extends BaseEntity {

  @ApiProperty({example: 'id number', description: " User  id number"})
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({example: 'User name', description: " User  name"})
  @Column({ name: 'username', type: 'varchar' })
  username: string

  @ApiProperty({example: 'email', description: " User  email"})
  @Column({ name: 'email', type: 'varchar' })
  email: string

  @ApiProperty({example: 'User password', description: " User  password"})
  @Column({ name: 'password', type: 'varchar' })
  password: string

  @ApiProperty({example: 'Access token', description: " Access token"})
  @Column({ name: 'access-token', type: 'varchar' })
  accessToken: string;

  @ApiProperty({example: 'Refresh token', description: " Refresh  token"})
  @Column({ name: 'refresh-token', type: 'varchar' })
  refreshToken: string;

}