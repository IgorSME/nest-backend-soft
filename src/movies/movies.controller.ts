import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AddMovieDto } from './dto/add-movie.dto';
import { MoviesService } from './movies.service';
import { Movie } from './schemas/movie.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll(): Promise<Movie[]> {
    return this.moviesService.getAll();
  }

  @Get(':idParam')
  @UseGuards(AuthGuard)
  getById(@Param('idParam') idParam: string): Promise<Movie> {
    return this.moviesService.getById(idParam);
  }

  @Post()
  @UseGuards(AuthGuard)
  add(@Body() addMovieDto: AddMovieDto): Promise<Movie> {
    return this.moviesService.addMovie(addMovieDto);
  }

  @Delete(':idParam')
  @UseGuards(AuthGuard)
  removeById(@Param('idParam') idParam: string): Promise<Movie> {
    return this.removeById(idParam);
  }

  @Patch(':idParam')
  @UseGuards(AuthGuard)
  updateById(
    @Body() updateMovie: AddMovieDto,
    @Param('idParam') idParam: string,
  ): Promise<Movie> {
    return this.updateById( updateMovie, idParam)
  }
}
