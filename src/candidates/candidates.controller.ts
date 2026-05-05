import { Controller, Get, Delete, Req } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  findOneCandidate(@Req() req) {
    const candidate = req.user.sub;
    return this.candidatesService.findOneCandidate(candidate);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('me')
  removeCandidate(@Req() req) {
    const candidate = req.user.sub;
    return this.candidatesService.removeCandidate(candidate);
  }
}
