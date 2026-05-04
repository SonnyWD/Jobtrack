import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto) {
    const normalizedName = createCompanyDto.name.trim().toLowerCase();
    const existingCompany = await this.companyRepository.findOne({
      where: { name: normalizedName },
    });
    if (existingCompany) {
      throw new ConflictException(`L'entreprise existe déjà`);
    }
    const company = this.companyRepository.create({
      ...createCompanyDto,
      name: normalizedName,
    });
    return this.companyRepository.save(company);
  }

  findAllCompanies() {
    const companies = this.companyRepository.find();
    return companies;
  }

  async findOneCompany(companyId: number) {
    const company = await this.companyRepository.findOne({
      where: {
        id: companyId,
      },
    });
    if (!company) {
      throw new NotFoundException(`L'entreprise recherchée n'existe pas`);
    }
    return company;
  }
}
