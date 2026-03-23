import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Story } from '../story/story.entity';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'story_id' })
  storyId!: number;

  @Column({ name: 'chapter_number' })
  chapterNumber!: number;

  @Column()
  title!: string;

  @Column({ name: 'content_url' })
  contentUrl!: string;

  // 👇 thêm
  @ManyToOne(() => Story, (story) => story.chapters)
  @JoinColumn({ name: 'story_id' }) // 👈 fix tên cột join
  story!: Story;
}
