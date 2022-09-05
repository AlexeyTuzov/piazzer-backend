import { HttpException, HttpStatus } from '@nestjs/common';

export default class NoContentResponse extends HttpException {

    private messages;

    constructor(response) {
        super(response, HttpStatus.NO_CONTENT);
        this.messages = response;
    }
}
