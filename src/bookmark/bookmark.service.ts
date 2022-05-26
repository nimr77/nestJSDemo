import { Injectable } from '@nestjs/common';
import { Bookmark, PrismaClient } from '@prisma/client';
import { CreateBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
    constructor(private prisma:PrismaClient) {
    }

    async getBookmarks(userId:number){
        return await this.prisma.bookmark.findMany({
            where:{
                userId:userId,
            }
        });
    }

    async createBookmark(bookmark:CreateBookmarkDto,userId:number){
        console.log(bookmark);
        return await this.prisma.bookmark.create({
            data:{
                postedBy:bookmark.userId,
                url:bookmark.url,
                userId:userId
            }
        });
    }

    async deleteBookmark(id:number){
        return await this.prisma.bookmark.delete({
            where:{
                id:id
            }
        });
    }

    async updateBookmark(bookmark:Bookmark){
        return await this.prisma.bookmark.update({
            where:{
                id:bookmark.id
            },
            data:bookmark
        });
    }   
}
