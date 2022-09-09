import { HttpException, HttpStatus } from '@nestjs/common';

export default class NotFoundError extends HttpException {

    private messages;

    constructor(response) {
        super(response, HttpStatus.INTERNAL_SERVER_ERROR);
        this.messages = response;
    }
}