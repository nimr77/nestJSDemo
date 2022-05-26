import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) {}
    @Get()
    getMarkers() {}

    @Get('/:id')
    getMarker() {
        
    }

    @Put('/:id')
    editMarker(){}

    @Post()
    postMarker(){}

    @Delete('/:id')
    deleteMarker(){}
}
