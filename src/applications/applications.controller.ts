import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard('jwt'))
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  createApplication(
    @Body() createApplicationDto: CreateApplicationDto,
    @Req() req,
  ) {
    const candidateId = req.user.sub;
    return this.applicationsService.createApplication(
      createApplicationDto,
      candidateId,
    );
  }

  @Get()
  findAllApplications(@Req() req) {
    const candidateId = req.user.sub;
    return this.applicationsService.findAllApplications(candidateId);
  }

  @Get(':id')
  findOneApplication(
    @Param('id', ParseIntPipe) applicationId: number,
    @Req() req,
  ) {
    const candidateId = req.user.sub;
    return this.applicationsService.findOneApplication(
      candidateId,
      +applicationId,
    );
  }

  @Patch(':id')
  updateApplication(
    @Param('id', ParseIntPipe) applicationId: number,
    @Body() updateApplicationDto: UpdateApplicationDto,
    @Req() req,
  ) {
    const candidateId = req.user.sub;
    return this.applicationsService.updateApplication(
      applicationId,
      updateApplicationDto,
      candidateId,
    );
  }

  @Delete(':id')
  removeApplication(
    @Param('id', ParseIntPipe) applicationId: number,
    @Req() req,
  ) {
    const candidateId = req.user.sub;
    return this.applicationsService.removeApplication(
      applicationId,
      candidateId,
    );
  }
}
