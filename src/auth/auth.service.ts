import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto/auth.dto";
@Injectable({})
export class AuthService {
    constructor(private prisma:PrismaService){
        
    }

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

                       return user;
       } catch (error) {
        if(error instanceof PrismaClientKnownRequestError){


            if(error.code === 'P2002'){
                throw new ForbiddenException('Email already exists');
            }        
            throw error;
        }}

       

   }
    
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
        return user;
    }
}