import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ChapterService } from './chapter.service';

@Controller('chapters')
export class ChapterController {
  constructor(private readonly service: ChapterService) {}

  @Post()
  create(@Body() body = {}) {
    return this.service.create(body);
  }

  @Get(':storyId/:number')
  getChapter(
    @Param('storyId') storyId: number,
    @Param('number') number: number,
  ) {
    return this.service.getChapter(storyId, number);
  }
}
