import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schemas/movie.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
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
