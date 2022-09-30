import { HttpException, HttpStatus } from '@nestjs/common'

export default class NotFoundError extends HttpException {
	private messages

	constructor(response) {
		super(response, HttpStatus.NOT_FOUND)
		this.messages = response
	}
}
