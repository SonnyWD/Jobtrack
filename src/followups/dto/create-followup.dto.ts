import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { FollowupType } from '../entities/followup-type.enum';

export class CreateFollowupDto {
  @IsEnum(FollowupType)
  type!: FollowupType;

  @IsDateString()
  followup_date!: Date;

  @IsOptional()
  @IsString()
  note?: string;
}
