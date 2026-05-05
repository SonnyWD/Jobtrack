import { Injectable, NotFoundException } from '@nestjs/common';
import { Candidate } from './entities/candidate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCandidateWithHashDto } from './dto/create-candidate-with-hash.dto';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
  ) {}

  createCandidate(createCandidateDto: CreateCandidateWithHashDto) {
    const candidate = this.candidateRepository.create(createCandidateDto);
    return this.candidateRepository.save(candidate);
  }
  async findByEmail(email: string) {
    const existingCandidate = await this.candidateRepository.findOne({
      where: {
        email,
      },
    });
    return existingCandidate;
  }

  async findOneCandidate(candidateId: number) {
    const candidate = await this.candidateRepository.findOne({
      where: {
        id: candidateId,
      },
    });
    if (!candidate) {
      throw new NotFoundException(`Le candidat n'existe pas`);
    }
    return candidate;
  }

  async removeCandidate(candidateId: number) {
    const candidate = await this.findOneCandidate(candidateId);
    await this.candidateRepository.remove(candidate);
    return { message: `Candidat supprimé avec succès.` };
  }
}
