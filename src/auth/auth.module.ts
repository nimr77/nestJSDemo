import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./startegy/jwt.strategy";

@Module({
    controllers:[AuthController],
    providers: [AuthService,JwtStrategy,PrismaClient],
    imports: [
        JwtModule.register({
            
        })
    ],
})
export class AuthModule {
    // constructor(parameters) {
        
    // }
}

