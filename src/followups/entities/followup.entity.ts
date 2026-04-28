import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { FollowupType } from './followup-type.enum';
import { Application } from 'src/applications/entities/application.entity';

@Entity()
export class Followup {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: FollowupType,
    default: FollowupType.SENT,
  })
  type!: FollowupType;

  @Column({ type: 'datetime' })
  followup_date!: Date;

  @Column({ type: 'text', nullable: true })
  note!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => Application, (application) => application.followups)
  application!: Application;
}
