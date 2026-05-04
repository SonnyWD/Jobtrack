import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Candidate } from 'src/candidates/entities/candidate.entity';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  createApplication(
    @Body() createApplicationDto: CreateApplicationDto,
    @Req() req,
  ) {
    const candidate = req.user;
    return this.applicationsService.createApplication(
      createApplicationDto,
      candidate,
    );
  }

  @Get()
  findAllApplications(@Req() req) {
    const candidate = req.user;
    return this.applicationsService.findAllApplications(candidate);
  }

  @Get(':id')
  findOneApplication(@Param('id') applicationId: string, @Req() req) {
    const candidate = req.user;
    return this.applicationsService.findOneApplication(
      candidate,
      +applicationId,
    );
  }

  @Patch(':id')
  updateApplication(
    @Param('id') applicationId: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
    @Req() req,
  ) {
    const candidate = req.user;
    return this.applicationsService.updateApplication(
      +applicationId,
      updateApplicationDto,
      candidate,
    );
  }

  @Delete(':id')
  removeApplication(@Param('id') applicationId: string, @Req() req) {
    const candidate = req.user;
    return this.applicationsService.removeApplication(
      +applicationId,
      candidate,
    );
  }
}
