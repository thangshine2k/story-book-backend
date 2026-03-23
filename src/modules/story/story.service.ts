import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from './story.entity';
import { CreateStoryDto } from './create-story.dto';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private repo: Repository<Story>,
  ) {}

  async create(data: CreateStoryDto) {
    const { chapters, ...storyData } = data;

    const story = this.repo.create(storyData);

    if (chapters && chapters.length > 0) {
      story.chapters = chapters.map((chap, index) =>
        this.repo.manager.create('Chapter', {
          ...chap,
          chapterNumber: chap.chapterNumber ?? index + 1,
        }),
      );
    }

    return this.repo.save(story);
  }
  async findAll() {
    const stories = await this.repo.find({
      relations: ['chapters'],
      order: {
        id: 'ASC', // 👈 tăng dần
      },
    });

    return stories.map((s) => ({
      id: s.id,
      title: s.title,
      image: s.image,
      author: s.author,
      price: s.price,
      description: s.description,
      totalChapters: s.chapters?.length || 0,
    }));
  }

  findBySlug(slug: string) {
    return this.repo.findOne({
      where: { slug },
      relations: ['chapters'],
    });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['chapters'] });
  }

  async remove(id: number) {
    const story = await this.repo.findOne({ where: { id } });

    if (!story) {
      throw new Error('Story not found');
    }

    await this.repo.delete(id);

    return { message: 'Deleted successfully' };
  }

  async update(id: number, data: Partial<CreateStoryDto>) {
    const story = await this.repo.findOne({ where: { id } });

    if (!story) {
      throw new Error('Story not found');
    }

    Object.assign(story, data);

    return this.repo.save(story);
  }
}
