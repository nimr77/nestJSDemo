import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
    constructor(private prisma:PrismaClient){}
    @Get(':id')
    getUserInformation(@GetUser() user:User){
        return user;
    }
}
