import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers:[PrismaClient]
})
export class UsersModule {}
