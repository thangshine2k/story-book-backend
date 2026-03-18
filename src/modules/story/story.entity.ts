import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
