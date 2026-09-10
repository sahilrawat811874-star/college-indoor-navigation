import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RoleName } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from '../../database/prisma.service';
import { LoginDto, RegisterDto } from './dto';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}
  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email is already registered');
    const role = await this.prisma.role.upsert({ where: { name: RoleName.STUDENT }, update: {}, create: { name: RoleName.STUDENT, description: 'student role' } });
    const user = await this.prisma.user.create({ data: { name: dto.name, email: dto.email.toLowerCase(), passwordHash: await argon2.hash(dto.password), roleId: role.id }, include: { role: true } });
    return this.issueTokens(user.id, user.email, user.role.name);
  }
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() }, include: { role: true } });
    if (!user || !user.isActive || !(await argon2.verify(user.passwordHash, dto.password))) throw new UnauthorizedException('Invalid credentials');
    return this.issueTokens(user.id, user.email, user.role.name);
  }
  async me(userId: string) { const user = await this.prisma.user.findUnique({ where: { id: userId }, include: { role: true } }); if (!user) throw new UnauthorizedException(); const { passwordHash, ...safe } = user; return safe; }
  async refresh(refreshToken: string) { try { const payload = await this.jwt.verifyAsync(refreshToken, { secret: this.config.get<string>('JWT_REFRESH_SECRET') ?? 'dev_refresh_secret' }); return this.issueTokens(payload.sub, payload.email, payload.role); } catch { throw new UnauthorizedException('Invalid refresh token'); } }
  private async issueTokens(userId: string, email: string, role: RoleName | string) {
    const payload = { sub: userId, email, role };
    return { accessToken: await this.jwt.signAsync(payload, { secret: this.config.get<string>('JWT_ACCESS_SECRET') ?? 'dev_access_secret', expiresIn: this.config.get<string>('JWT_ACCESS_EXPIRES_IN') ?? '15m' }), refreshToken: await this.jwt.signAsync(payload, { secret: this.config.get<string>('JWT_REFRESH_SECRET') ?? 'dev_refresh_secret', expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES_IN') ?? '7d' }), user: { id: userId, email, role } };
  }
}
