import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidatesModule } from './candidates/candidates.module';
import { CompaniesModule } from './companies/companies.module';
import { ApplicationsModule } from './applications/applications.module';
import { FollowupsModule } from './followups/followups.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rootroot',
      database: 'Jobstrack',
      autoLoadEntities: true,
      synchronize: false,
    }),

    AuthModule,
    CandidatesModule,
    CompaniesModule,
    ApplicationsModule,
    FollowupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
