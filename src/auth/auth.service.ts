import { Injectable } from "@nestjs/common";
import * as argon from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto/auth.dto";
@Injectable({})
export class AuthService {
    constructor(private prisma:PrismaService){
        
    }

   async signup(dto:AuthDto){
                       // generate hashed password
                       const hash =await argon.hash(dto.password);
                       // save user to database
                       const user = this.prisma.user.create({
                           data:{
                               email:dto.email,
                               password:hash,
                               name:dto.name,
                           }
                       })
                       // return user
                       return user;
   }
    
   async signin(){

    }
}