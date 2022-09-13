import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export default class RefreshTokenGenerator {

    constructor(private jwtService: JwtService) { }

    generate(userId: string): string {
        return this.jwtService.sign(userId, {
            secret: process.env.JWT_REFRESH_KEY,
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
        });
    }
}