import { IsEnum, IsInt, IsString } from 'class-validator';
import { ApplicationStatus } from '../entities/application-status.enum';

export class CreateApplicationDto {
  @IsString()
  position!: string;

  @IsEnum(ApplicationStatus)
  status!: ApplicationStatus;

  @IsInt()
  companyId!: number;

  @IsInt()
  candidateId!: number;
}
