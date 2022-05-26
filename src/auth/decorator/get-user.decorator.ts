import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser= createParamDecorator(
    ( ctx:ExecutionContext,data) => {

        const request = ctx.switchToHttp().getRequest();
        console.log(request);
        if(data ==='id'){
         return request.user.id;   
        }
        return request.user;
    }
);