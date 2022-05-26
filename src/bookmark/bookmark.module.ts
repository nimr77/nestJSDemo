import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService,PrismaClient]
})
export class BookmarkModule {}
