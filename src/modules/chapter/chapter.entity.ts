import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
