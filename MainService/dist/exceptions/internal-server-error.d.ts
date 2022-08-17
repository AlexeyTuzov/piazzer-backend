import { HttpException } from '@nestjs/common';
export default class InternalServerError extends HttpException {
    private messages;
    constructor(response: any);
}
