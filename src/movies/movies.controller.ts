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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('movies')
@ApiTags('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({summary: 'Get all movies'})
  @ApiResponse({status: 200, description: 'Success', type: [Movie]})
  @UseGuards(AuthGuard)
  getAll(): Promise<Movie[]> {
    return this.moviesService.getAll();
  }

  @Get(':idParam')
  @ApiOperation({summary: 'Get a movie by Id'})
  @ApiResponse({status: 200, description: 'Success', type: Movie})
  @UseGuards(AuthGuard)
  getById(@Param('idParam') idParam: string): Promise<Movie> {
    return this.moviesService.getById(idParam);
  }

  @Post()
  @ApiOperation({ summary: 'Add a new movie' })
  @ApiResponse({ status: 201, description: 'Created', type: Movie })
  @UseGuards(AuthGuard)
  add(@Body() addMovieDto: AddMovieDto): Promise<Movie> {
    return this.moviesService.addMovie(addMovieDto);
  }

  @Delete(':idParam')
  @ApiOperation({ summary: 'Remove a movie by Id' })
@ApiResponse({ status: 200, description: 'Success', type: Movie })
  @UseGuards(AuthGuard)
  removeById(@Param('idParam') idParam: string): Promise<Movie> {
    return this.removeById(idParam);
  }

  @Patch(':idParam')
@ApiOperation({ summary: 'Update a movie by ID' })
@ApiResponse({ status: 200, description: 'Success', type: Movie })
  @UseGuards(AuthGuard)
  updateById(
    @Body() updateMovie: AddMovieDto,
    @Param('idParam') idParam: string,
  ): Promise<Movie> {
    return this.updateById( updateMovie, idParam)
  }
}
