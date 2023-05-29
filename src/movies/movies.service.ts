import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { AddMovieDto } from './dto/add-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async getAll(): Promise<Movie[]> {
    return this.movieModel.find();
  }

  async getById(id: string): Promise<Movie> {
    return this.movieModel.findById(id);
  }
  
  async addMovie(movieDto: AddMovieDto): Promise<Movie> {
    const newMovie = new this.movieModel(movieDto);
    return newMovie.save();
}

async updateMovieById ( id: string, movieDto: AddMovieDto) {
  return this.movieModel.findByIdAndUpdate(id, movieDto)
} 

// async updateMovieFavorite ( id: string, movieDto: AddMovieDto): Promise<Movie> {
//   return this.movieModel.findByIdAndUpdate(id, movieDto, {new: true})
// }

async deleteMovieById (id:string): Promise<Movie> {
  return this.movieModel.findByIdAndRemove(id)
}
}
