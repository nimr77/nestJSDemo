import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
        email: string;
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    name: string;
}

export class AuthTokenInformation{
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    userId:number;
} 