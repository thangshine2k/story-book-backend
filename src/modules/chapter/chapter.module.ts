import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from './chapter.entity';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Chapter])],
  providers: [ChapterService],
  controllers: [ChapterController],
})
export class ChapterModule {}
