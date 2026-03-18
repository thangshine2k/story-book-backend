import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from './chapter.entity';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

type ChapterContent = {
  title: string;
  content: string;
};

@Injectable()
export class ChapterService {
  private redis: Redis;

  constructor(
    @InjectRepository(Chapter)
    private repo: Repository<Chapter>,
    private configService: ConfigService,
  ) {
    this.redis = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: parseInt(
        this.configService.get<string>('REDIS_PORT') || '6379',
        10,
      ),
    });
  }

  async getChapter(storyId: number, number: number) {
    const cacheKey = `chapter:${storyId}:${number}`;

    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached) as ChapterContent;

    const chapter = await this.repo.findOne({
      where: { storyId, chapterNumber: number },
    });

    if (!chapter) return null;

    const content: ChapterContent = {
      title: chapter.title,
      content: `Content from ${chapter.contentUrl}`,
    };

    await this.redis.set(cacheKey, JSON.stringify(content), 'EX', 3600);

    return content;
  }

  create(data: Partial<Chapter>) {
    return this.repo.save(this.repo.create(data));
  }
}
