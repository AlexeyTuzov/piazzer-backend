import { HttpException, HttpStatus } from '@nestjs/common'

export class UserConflictException extends HttpException {
	constructor() {
		super(
			{
				message: 'User with this email already exists!',
				code: 'CONFLICT_EXCEPTION',
				status: HttpStatus.CONFLICT,
			},
			HttpStatus.CONFLICT,
		)
	}
}
