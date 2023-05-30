import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie } from '../entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    JwtModule.register({  secret: process.env.ACCESS_TOKEN_PRIVATE_KEY || 'SECRET',
  signOptions: {
    expiresIn: '24h',
  },})
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService, JwtModule]
})
export class MoviesModule {}
