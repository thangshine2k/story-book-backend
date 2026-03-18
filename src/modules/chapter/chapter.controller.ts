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
  @Get('redis-check')
  async redisCheck() {
    const keys = await this.service['redis'].keys('chapter:*');
    const result: Record<string, string | null> = {};
    for (const key of keys) {
      result[key] = await this.service['redis'].get(key);
    }
    return result;
  }
}
