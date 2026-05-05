import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFollowupDto } from './dto/create-followup.dto';
import { UpdateFollowupDto } from './dto/update-followup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/applications/entities/application.entity';
import { Repository } from 'typeorm';
import { Followup } from './entities/followup.entity';
import { Candidate } from 'src/candidates/entities/candidate.entity';

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
    candidate: Candidate,
  ) {
    const existingApplication = await this.applicationRepository.findOne({
      where: {
        id: applicationId,
        candidate: { id: candidate.id },
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

  findAllFollowups(candidate: Candidate) {
    const followups = this.followupsRepository.find({
      where: {
        application: {
          candidate: { id: candidate.id },
        },
      },
    });
    return followups;
  }

  async findAllFollowupsById(applicationId: number, candidate: Candidate) {
    const application = await this.applicationRepository.findOne({
      where: {
        id: applicationId,
        candidate: { id: candidate.id },
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

  async findOneFollowup(followupId: number, candidate: Candidate) {
    const followup = await this.followupsRepository.findOne({
      where: {
        id: followupId,
        application: { candidate: { id: candidate.id } },
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
    candidate: Candidate,
  ) {
    const followup = await this.followupsRepository.findOne({
      where: {
        id: followupId,
        application: {
          candidate: { id: candidate.id },
        },
      },
    });
    if (!followup) {
      throw new NotFoundException(`Le rappel n'existe pas.`);
    }
    Object.assign(followup, updateFollowupDto);
    return this.followupsRepository.save(followup);
  }

  async removeFollowup(followupId: number, candidate: Candidate) {
    const followup = await this.followupsRepository.findOne({
      where: {
        id: followupId,
        application: {
          candidate: { id: candidate.id },
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
