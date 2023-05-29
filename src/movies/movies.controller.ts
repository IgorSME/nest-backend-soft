import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddMovieDto } from './dto/add-movie.dto';
import { MoviesService } from './movies.service';
import { Movie } from './schemas/movie.schema';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Promise<Movie[]> {
    return this.moviesService.getAll();
  }

  @Get(':idParam')
  getById(@Param('idParam') idParam: string): Promise<Movie> {
    return this.moviesService.getById(idParam);
  }

  @Post()
  add(@Body() addMovieDto: AddMovieDto): Promise<Movie> {
    return this.moviesService.addMovie(addMovieDto);
  }

  @Delete(':idParam')
  removeById(@Param('idParam') idParam: string): Promise<Movie> {
    return this.removeById(idParam);
  }

  @Patch(':idParam')
  updateById(
    @Body() updateMovie: AddMovieDto,
    @Param('idParam') idParam: string,
  ): Promise<Movie> {
    return this.updateById( updateMovie, idParam)
  }
}
