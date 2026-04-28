import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  website!: string;

  @Column({ nullable: true })
  location!: string;
}
