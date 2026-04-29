import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Candidate } from 'src/candidates/entities/candidate.entity';
import { ApplicationStatus } from './application-status.enum';
import { Followup } from 'src/followups/entities/followup.entity';
import { Company } from 'src/companies/entities/company.entity';
@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  position!: string;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.APPLIED,
  })
  status!: ApplicationStatus;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => Candidate, (candidate) => candidate.applications)
  candidate!: Candidate;

  @OneToMany(() => Followup, (followup) => followup.application)
  followups!: Followup[];

  @ManyToOne(() => Company, (company) => company.applications)
  company!: Company;
}
