import {CanActivate, ExecutionContext, Injectable, Logger} from '@nestjs/common';
import {JwksService} from './jwks.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {

    private readonly logger: Logger = new Logger(JwtAuthGuard.name);

    constructor(private jwksService: JwksService){}

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            request.user = await this.jwksService.verify(request);
            return true;
        } catch (error) {
            return false;
        }
    }
}