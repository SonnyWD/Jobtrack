import { Application } from 'src/applications/entities/application.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location!: string | null;

  @OneToMany(() => Application, (application) => application.company)
  applications!: Application[];
}
