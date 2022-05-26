import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser= createParamDecorator(
    ( data:string | undefined ,ctx:ExecutionContext) => {

        const request = ctx.switchToHttp().getRequest();
        console.log(request);
        if(data !== undefined){
         return request.user[data];   
        }
        return request.user;
    }
);