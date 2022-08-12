import { HttpException, HttpStatus } from "@nestjs/common";

export function exceptionHandling(message: string,  error: any = [], status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR){

    if (process.env.ENV === 'Development') {
        throw new HttpException({
            status,
            error,
            message
        }, status);
    } 
    
    if (process.env.ENV === 'Production') {
        throw new HttpException({
            status,
            message
        }, status);
    }

}