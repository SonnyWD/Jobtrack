import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CandidatesService } from 'src/candidates/candidates.service';
import { CreateCandidateDto } from 'src/candidates/dto/create-candidate.dto';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly candidatesService: CandidatesService,
    private jwtService: JwtService,
  ) {}

  async register(createCandidateDto: CreateCandidateDto) {
    // Regarder si l'email n'est pas déjà utilisé
    const candidate = await this.candidatesService.findByEmail(
      createCandidateDto.email,
    );
    if (candidate) {
      throw new BadRequestException(`L'email est déjà utilisé.`);
    }
    // Hasher le mdp
    const passwordHash = await bcrypt.hash(createCandidateDto.password, 10);
    const { password, ...withoutPassword } = createCandidateDto;
    // Créer un nouveau candidat et le sauvegarder en base
    const newCandidate = { ...withoutPassword, passwordHash };
    const createCandidate =
      await this.candidatesService.createCandidate(newCandidate);
    // retourner le candidat
    return createCandidate;
  }

  async login(loginDto: LoginAuthDto) {
    const candidate = await this.candidatesService.findByEmail(loginDto.email);
    if (!candidate) {
      throw new UnauthorizedException(`Identifiants incorrects`);
    }
    const comparePassword = await bcrypt.compare(
      loginDto.password,
      candidate.passwordHash,
    );
    if (!comparePassword) {
      throw new UnauthorizedException(`Identifiants incorrects`);
    }
    const payload = { email: candidate.email, sub: candidate.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
