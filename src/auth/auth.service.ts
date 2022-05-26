import { ForbiddenException, HttpCode, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from "argon2";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto, AuthTokenInformation } from "./dto/auth.dto";
@Injectable({})
export class AuthService {
    constructor(private prisma:PrismaService,private jwt:JwtService,private confige:ConfigService   ){}
        
    

   async signup(dto:AuthDto){
       try {
                        // generate hashed password
         const hash =await argon.hash(dto.password);
                       // save user to database
         const user = await this.prisma.user.create({
                    data:{
                               email:dto.email,
                               password:hash,
                               name:dto.name,
                  }
                       })
                       // return user
                       delete user.password;
        return await this.singToken({
            userId:user.id,
            email:user.email 
        });
       } catch (error) {
        if(error instanceof PrismaClientKnownRequestError){


            if(error.code === 'P2002'){
                throw new ForbiddenException('Email already exists');
            }        
            throw error;
        }}



   }
    @HttpCode(200)
   async signin(dto:AuthDto){
        // find the user by email
        const user = await this.prisma.user.findUnique({
            where:{
                email:dto.email
            }
        })
        // compare the password
        if(!user){
            throw new ForbiddenException('Invalid email or password');
        }
        if(!await argon.verify(user.password,dto.password)){
            throw new ForbiddenException('Invalid email or password');
        }
        delete user.password;
        // return the user
        const token = await this.singToken({
            userId:user.id,
            email:user.email 
        });
        return {
            token:token,
        }
    }

  async  singToken(info:AuthTokenInformation){
      const payload = {
          sub:info.userId,
            email:info.email,
      };
        const token = await this.jwt.signAsync(payload,{
            expiresIn:'1h',
            secret: this.confige.get('JWT_SECRET')
        });
        return token;
}
}