import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from './story.entity';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private repo: Repository<Story>,
  ) {}

  create(data: Partial<Story>) {
    const story = this.repo.create(data);
    return this.repo.save(story);
  }

  findAll() {
    return this.repo.find();
  }

  findBySlug(slug: string) {
    return this.repo.findOne({ where: { slug } });
  }
}
