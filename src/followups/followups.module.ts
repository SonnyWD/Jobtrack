import { Module } from '@nestjs/common';
import { FollowupsService } from './followups.service';
import { FollowupsController } from './followups.controller';
import { Followup } from './entities/followup.entity';
import { Application } from 'src/applications/entities/application.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Application, Followup])],
  controllers: [FollowupsController],
  providers: [FollowupsService],
})
export class FollowupsModule {}
