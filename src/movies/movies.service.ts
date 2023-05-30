import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm'; 
import { Movie } from 'src/entities/movie.entity'; 
import { AddMovieDto } from './dto/add-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>
  ) {}

  async getAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async getById(id: string): Promise<Movie> {
    return this.movieRepository.findOne({ where: { id } });
  }
  
  async addMovie(movieDto: AddMovieDto): Promise<Movie> {
    const newMovie =  this.movieRepository.create(movieDto);
    return this.movieRepository.save(newMovie);
}

async updateMovieById ( id: string, movieDto: AddMovieDto) {
  const updatedMovie = await this.movieRepository.findOne({ where: { id } });
  if(!updatedMovie) {
    throw new NotFoundException('Movie not found');
  }
  Object.assign(updatedMovie, movieDto);
  return this.movieRepository.save(updatedMovie)
} 

// async updateMovieFavorite ( id: string, movieDto: AddMovieDto): Promise<Movie> {
//   return this.movieModel.findByIdAndUpdate(id, movieDto, {new: true})
// }

async deleteMovieById (id:string): Promise<Movie> {
  const movieToDelete = await this.movieRepository.findOne({ where: { id } });
  if(!movieToDelete){
    throw new NotFoundException('Movie not found');
  }
  return this.movieRepository.remove(movieToDelete);
}
}
