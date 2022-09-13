import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export default class AccessTokenGenerator {

    constructor(private jwtService: JwtService) { }

    generate(userId: string): string {
        return this.jwtService.sign({ userId }, {
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
        });
    }
}