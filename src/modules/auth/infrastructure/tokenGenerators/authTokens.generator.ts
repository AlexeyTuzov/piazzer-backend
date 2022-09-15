import { Injectable } from "@nestjs/common";
import AccessTokenGenerator from "./accessToken.generator";
import RefreshTokenGenerator from "./refreshToken.generator";

@Injectable()
export default class AuthTokensGenerator {

    constructor(
        private accessTokenGenerator: AccessTokenGenerator,
        private refreshTokenGenerator: RefreshTokenGenerator) { }

    generate(userId: string): {accessToken: string, refreshToken: string} {
        const accessToken = this.accessTokenGenerator.generate(userId);
        const refreshToken = this.refreshTokenGenerator.generate(userId);
        return {accessToken, refreshToken};
    }
}