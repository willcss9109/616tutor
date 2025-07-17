import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import * as jwksClient from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';
import {ConfigService} from "@nestjs/config";
import {JwtPayload} from "jsonwebtoken";

@Injectable()
export class JwksService {

    private client: jwksClient.JwksClient;

    constructor(
        private configService: ConfigService
    ) {
        const jwtDiscoveryUrl = this.configService.get<string>('SUPABASE_JWT_DISCOVERY_URL');

        if(!jwtDiscoveryUrl) {
            throw new BadRequestException('JWT Discovery URL is not configured');
        }

        this.client = jwksClient({
            jwksUri: jwtDiscoveryUrl,
            requestHeaders: {}, // Optional
            timeout: 30000 // Defaults to 30s
        });
    }

    async getSigningKey(kid: string) {
        try {
            const key = await this.client.getSigningKey(kid);
            return key.getPublicKey();
        } catch (error) {
            if (error instanceof jwksClient.JwksError) {
                throw new UnauthorizedException('Failed to retrieve signing key');
            }
            throw new ConflictException('An error occurred while retrieving the signing key');
        }
    }

    async verify(request: any): Promise<JwtPayload> {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('No authorization header provided');
        }

        const token = authHeader.replace('Bearer ', '');

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        //divide the token by '.' to get the parts
        const decoded = jwt.decode(token, { complete: true })
        if(!decoded || typeof decoded !== 'object' || !decoded.header) {
            throw new UnauthorizedException('Invalid token format');
        }
        const header = decoded.header;
        if (!header.kid) {
            throw new UnauthorizedException('Token header does not contain kid');
        }
        const signingKey = await this.getSigningKey(header.kid);

        try {
            return jwt.verify(token, signingKey) as JwtPayload;
        } catch (error) {
            if (error instanceof jwksClient.JwksError) {
                throw new UnauthorizedException('Invalid token');
            }
            throw new ConflictException('Token verification failed');
        }
    }

}