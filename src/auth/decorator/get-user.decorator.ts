import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser= createParamDecorator(
    (data, ctx:ExecutionContext) => {
        
        const request = ctx.switchToHttp().getRequest();
        console.log(request);
        return request.user;
    }
);