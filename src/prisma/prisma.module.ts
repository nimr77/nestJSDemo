import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaController } from './prisma.controller';
import { PrismaService } from './prisma.service';
@Global()
@Module({
  providers: [PrismaService],
  controllers: [PrismaController],
  exports: [PrismaService]
})
export class PrismaModule{
    
}
