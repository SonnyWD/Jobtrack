import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidatesModule } from './candidates/candidates.module';
import { CompaniesModule } from './companies/companies.module';
import { ApplicationsModule } from './applications/applications.module';
import { FollowupsModule } from './followups/followups.module';

@Module({
  imports: [CandidatesModule, CompaniesModule, ApplicationsModule, FollowupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
