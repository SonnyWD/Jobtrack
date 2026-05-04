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
import { FollowupsService } from './followups.service';
import { CreateFollowupDto } from './dto/create-followup.dto';
import { UpdateFollowupDto } from './dto/update-followup.dto';

@Controller('followups')
export class FollowupsController {
  constructor(private readonly followupsService: FollowupsService) {}

  @Post('application/:applicationId')
  createFollowup(
    @Body() createFollowupDto: CreateFollowupDto,
    @Req() req,
    @Param('applicationId') applicationId: string,
  ) {
    const candidate = req.user;
    return this.followupsService.createFollowup(
      createFollowupDto,
      +applicationId,
      candidate,
    );
  }

  @Get()
  findAllFollowups(@Req() req) {
    const candidate = req.user;
    return this.followupsService.findAllFollowups(candidate);
  }

  @Get('application/:applicationId')
  findAllFollowupsById(
    @Param('applicationId') applicationId: string,
    @Req() req,
  ) {
    const candidate = req.user;
    return this.followupsService.findAllFollowupsById(
      +applicationId,
      candidate,
    );
  }

  @Get(':id')
  findOneFollowupById(@Param('id') followupId: string, @Req() req) {
    const candidate = req.user;
    return this.followupsService.findOneFollowup(+followupId, candidate);
  }

  @Patch(':id')
  updateFollowup(
    @Param('id') followupId: string,
    @Body() updateFollowupDto: UpdateFollowupDto,
    @Req() req,
  ) {
    const candidate = req.user;
    return this.followupsService.updateFollowup(
      +followupId,
      updateFollowupDto,
      candidate,
    );
  }

  @Delete(':id')
  removeFollowup(@Param('id') followupId: string, @Req() req) {
    const candidate = req.user;
    return this.followupsService.removeFollowup(+followupId, candidate);
  }
}
