import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './create-story.dto';

@Controller('stories')
export class StoryController {
  constructor(private readonly service: StoryService) {}

  @Post()
  create(@Body() body: CreateStoryDto) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(Number(id));
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<CreateStoryDto>) {
    return this.service.update(Number(id), body);
  }
}
