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

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll() {
    return 'getAll';
  }

  @Get(':idParam')
  getById(@Param('idParam') idParam: string) {
    return 'getById' + idParam;
  }

  @Post()
  add(@Body() addMovieDto: AddMovieDto) {
    return addMovieDto;
  }

  @Delete(':idParam')
  removeById(@Param('idParam') idParam: string) {
    return idParam;
  }

  @Patch(':idParam')
  updateById(
    @Body() updateMovie: AddMovieDto,
    @Param('idParam') idParam: string,
  ) {
    return updateMovie + idParam;
  }
}
