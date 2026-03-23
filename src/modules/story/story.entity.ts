import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Chapter } from '../chapter/chapter.entity';

@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ unique: true })
  slug!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: true })
  author!: string;

  // 👇 thêm
  @Column({ nullable: true })
  image!: string;

  @Column({ type: 'float', default: 0 })
  price!: number;

  @OneToMany(() => Chapter, (chapter) => chapter.story, {
    cascade: true, // 👈 BẮT BUỘC để save nested
  })
  chapters!: Chapter[];
}
