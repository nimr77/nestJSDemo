import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaController } from './prisma.controller';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  controllers: [PrismaController]
})
export class PrismaModule  extends PrismaClient{
    
}
