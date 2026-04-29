import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidatesModule } from './candidates/candidates.module';
import { CompaniesModule } from './companies/companies.module';
import { ApplicationsModule } from './applications/applications.module';
import { FollowupsModule } from './followups/followups.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    /*TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
    }),*/
    CandidatesModule,
    CompaniesModule,
    ApplicationsModule,
    FollowupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
