import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFollowupDto } from './dto/create-followup.dto';
import { UpdateFollowupDto } from './dto/update-followup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/applications/entities/application.entity';
import { Repository } from 'typeorm';
import { Followup } from './entities/followup.entity';

@Injectable()
export class FollowupsService {
  constructor(
    @InjectRepository(Followup)
    private readonly followupsRepository: Repository<Followup>,
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

  async createFollowup(
    createFollowupDto: CreateFollowupDto,
    applicationId: number,
    candidateId: number,
  ) {
    const existingApplication = await this.applicationRepository.findOne({
      where: {
        id: applicationId,
        candidate: { id: candidateId },
      },
    });
    if (!existingApplication) {
      throw new NotFoundException(`La candidature n'existe pas.`);
    }

    const followup = this.followupsRepository.create({
      ...createFollowupDto,
      application: existingApplication,
    });
    return this.followupsRepository.save(followup);
  }

  findAllFollowups(candidateId: number) {
    const followups = this.followupsRepository.find({
      where: {
        application: {
          candidate: { id: candidateId },
        },
      },
    });
    return followups;
  }

  async findAllFollowupsById(applicationId: number, candidateId: number) {
    const application = await this.applicationRepository.findOne({
      where: {
        id: applicationId,
        candidate: { id: candidateId },
      },
    });
    if (!application) {
      throw new NotFoundException(`La candidature n'existe pas.`);
    }
    const followups = await this.followupsRepository.find({
      where: {
        application: { id: application.id },
      },
    });
    return followups;
  }

  async findOneFollowup(followupId: number, candidateId: number) {
    const followup = await this.followupsRepository.findOne({
      where: {
        id: followupId,
        application: { candidate: { id: candidateId } },
      },
    });
    if (!followup) {
      throw new NotFoundException(`Le rappel n'existe pas`);
    }
    return followup;
  }

  async updateFollowup(
    followupId: number,
    updateFollowupDto: UpdateFollowupDto,
    candidateId: number,
  ) {
    const followup = await this.followupsRepository.findOne({
      where: {
        id: followupId,
        application: {
          candidate: { id: candidateId },
        },
      },
    });
    if (!followup) {
      throw new NotFoundException(`Le rappel n'existe pas.`);
    }
    Object.assign(followup, updateFollowupDto);
    if (Object.keys(updateFollowupDto).length === 0) {
      throw new BadRequestException(`Aucune donnée à modifier.`);
    }
    return this.followupsRepository.save(followup);
  }

  async removeFollowup(followupId: number, candidateId: number) {
    const followup = await this.followupsRepository.findOne({
      where: {
        id: followupId,
        application: {
          candidate: { id: candidateId },
        },
      },
    });
    if (!followup) {
      throw new NotFoundException(`Le rappel n'existe pas.`);
    }
    await this.followupsRepository.remove(followup);
    return { message: `Votre rappel a bien été supprimé.` };
  }
}
