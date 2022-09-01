import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import createUserDto from 'src/Users/DTO/create-user.dto';
import logInUserDto from 'src/Users/DTO/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/Users/users.service';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService,
        private userService: UsersService) {
    }

    async signIn(dto: logInUserDto) {

        const foundUser = await this.userService.getOne(dto);
        if (!foundUser) {
            throw new HttpException('No user with this email found! Try to sign up first!', HttpStatus.BAD_REQUEST);
        }

        const passwordMatch: boolean = await bcrypt.compare(dto.password, foundUser.password);
        if (!passwordMatch) {
            throw new HttpException('Password mismatch!', HttpStatus.BAD_REQUEST);
        }
        const payload = { email: dto.email };
        const token: string = this.jwtService.sign(payload);
        return token;
    }

    signUp(dto: createUserDto) {

    }
}
