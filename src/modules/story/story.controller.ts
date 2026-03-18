import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StoryService } from './story.service';

@Controller('stories')
export class StoryController {
  constructor(private readonly service: StoryService) {}

  @Post()
  create(@Body() body = {}) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }
}
