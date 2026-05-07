import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { Candidate } from 'src/candidates/entities/candidate.entity';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async createApplication(
    createApplicationDto: CreateApplicationDto,
    candidateId: number,
  ) {
    const company = await this.companyRepository.findOneBy({
      id: createApplicationDto.companyId,
    });
    if (!company) {
      throw new NotFoundException(`L'entreprise n'existe pas`);
    }
    const application = this.applicationRepository.create({
      ...createApplicationDto,
      candidate: { id: candidateId },
      company: { id: company.id },
    });
    return this.applicationRepository.save(application);
  }

  findAllApplications(candidateId: number) {
    const application = this.applicationRepository.find({
      where: { candidate: { id: candidateId } },
    });

    return application;
  }

  async findOneApplication(candidateId: number, applicationId: number) {
    const application = await this.applicationRepository.findOne({
      where: { candidate: { id: candidateId }, id: applicationId },
    });

    if (!application) {
      throw new NotFoundException(`La candidature demandée n'existe pas.`);
    }

    return application;
  }

  async updateApplication(
    applicationId: number,
    updateApplicationDto: UpdateApplicationDto,
    candidateId: number,
  ) {
    const application = await this.applicationRepository.findOneBy({
      id: applicationId,
      candidate: { id: candidateId },
    });

    if (!application) {
      throw new NotFoundException(`La candidature n'existe pas`);
    }

    Object.assign(application, updateApplicationDto);

    return this.applicationRepository.save(application);
  }

  async removeApplication(applicationId: number, candidateId: number) {
    const application = await this.applicationRepository.findOneBy({
      id: applicationId,
      candidate: { id: candidateId },
    });

    if (!application) {
      throw new NotFoundException(`La candidature est introuvable`);
    }

    await this.applicationRepository.remove(application);

    return { message: `La candidature a bien été supprimée` };
  }
}
