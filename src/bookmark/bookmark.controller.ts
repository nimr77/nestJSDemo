import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto';
@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) {}
    @Get()
    getMarkers() {}

    @Get(':id')
    getMarker() {
        
    }

    @Put(':id')
    editMarker(){}

    @Post()
    postMarker(@Body() bookmark: CreateBookmarkDto,@GetUser('id') userId:number) {

        return this.bookmarkService.createBookmark(bookmark,userId);
    }

    @Delete(':id')
    deleteMarker(){}
}
