import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.createCompany(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.companiesService.findAllCompanies();
  }

  @Get(':id')
  findOne(@Param('id') companyId: number) {
    return this.companiesService.findOneCompany(companyId);
  }
}
