import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

@Injectable()
export default class CryptoService {

    constructor(private salt: number) {
        this.salt = 7;
    }

    async encrypt(password: string): Promise<string> {
        return await bcrypt.hash(password, this.salt);
    }

    async compare(takenPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(takenPassword, hashedPassword);
    }
}