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
import { FollowupsService } from './followups.service';
import { CreateFollowupDto } from './dto/create-followup.dto';
import { UpdateFollowupDto } from './dto/update-followup.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard('jwt'))
@Controller('followups')
export class FollowupsController {
  constructor(private readonly followupsService: FollowupsService) {}

  @Post('application/:applicationId')
  createFollowup(
    @Body() createFollowupDto: CreateFollowupDto,
    @Req() req,
    @Param('applicationId', ParseIntPipe) applicationId: number,
  ) {
    const candidateId = req.user.sub;
    return this.followupsService.createFollowup(
      createFollowupDto,
      applicationId,
      candidateId,
    );
  }

  @Get()
  findAllFollowups(@Req() req) {
    const candidateId = req.user.sub;
    return this.followupsService.findAllFollowups(candidateId);
  }

  @Get('application/:applicationId')
  findAllFollowupsById(
    @Param('applicationId', ParseIntPipe) applicationId: number,
    @Req() req,
  ) {
    const candidateId = req.user.sub;
    return this.followupsService.findAllFollowupsById(
      applicationId,
      candidateId,
    );
  }

  @Get(':id')
  findOneFollowupById(
    @Param('id', ParseIntPipe) followupId: number,
    @Req() req,
  ) {
    const candidateId = req.user.sub;
    return this.followupsService.findOneFollowup(followupId, candidateId);
  }

  @Patch(':id')
  updateFollowup(
    @Param('id', ParseIntPipe) followupId: number,
    @Body() updateFollowupDto: UpdateFollowupDto,
    @Req() req,
  ) {
    const candidateId = req.user.sub;
    return this.followupsService.updateFollowup(
      followupId,
      updateFollowupDto,
      candidateId,
    );
  }

  @Delete(':id')
  removeFollowup(@Param('id', ParseIntPipe) followupId: number, @Req() req) {
    const candidateId = req.user.sub;
    return this.followupsService.removeFollowup(followupId, candidateId);
  }
}
