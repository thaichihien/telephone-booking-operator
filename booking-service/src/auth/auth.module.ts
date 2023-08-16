import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AdminAuthGuard, DriverAuthGuard, RiderAuthGuard, RoleAuthGuard } from './role.auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Replace with your actual secret key
      signOptions: { expiresIn: process.env.JWT_EXPIRE }, // Adjust the expiration as per your needs
    }),
    JwtStrategy,
  ],
  providers: [AuthService, PrismaService, JwtStrategy, AdminAuthGuard, RoleAuthGuard, RiderAuthGuard, DriverAuthGuard],
  exports: [AuthService, AdminAuthGuard, RoleAuthGuard, RiderAuthGuard, JwtModule, DriverAuthGuard]
})
export class AuthModule { }
