import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    MoviesModule,
    MongooseModule.forRoot(
      `mongodb+srv://IgorSme:3hd24y8lLZt2Ym3c@igorsme.uenhe4p.mongodb.net/?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
