import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export default class JwtDecoder {

    constructor(private jwtService: JwtService) { }

    decodeUserId(jwt: string) {
        
        const decoded = this.jwtService.decode(jwt);

        if ( decoded && typeof decoded === 'object') {
            return decoded.userId;
        }
    }
}