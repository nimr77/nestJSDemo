import { IsArray, IsInt, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateBookmarkDto {
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsArray()
    tags: string[];

    @IsNotEmpty()
    @IsInt()
    userId:number;

}