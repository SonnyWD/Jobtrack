import { Application } from 'src/applications/entities/application.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  location?: string;

  @OneToMany(() => Application, (application) => application.company)
  applications!: Application[];
}
