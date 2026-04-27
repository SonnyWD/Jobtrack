import { Injectable } from '@nestjs/common';
import { CreateFollowupDto } from './dto/create-followup.dto';
import { UpdateFollowupDto } from './dto/update-followup.dto';

@Injectable()
export class FollowupsService {
  create(createFollowupDto: CreateFollowupDto) {
    return 'This action adds a new followup';
  }

  findAll() {
    return `This action returns all followups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} followup`;
  }

  update(id: number, updateFollowupDto: UpdateFollowupDto) {
    return `This action updates a #${id} followup`;
  }

  remove(id: number) {
    return `This action removes a #${id} followup`;
  }
}
