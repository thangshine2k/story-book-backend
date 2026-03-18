import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  storyId!: number;

  @Column()
  chapterNumber!: number;

  @Column()
  title!: string;

  @Column()
  contentUrl!: string; // link R2
}
