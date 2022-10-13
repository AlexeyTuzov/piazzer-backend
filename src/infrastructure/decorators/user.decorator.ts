import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

const UserID = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	const jwtService = new JwtService()
	try {
		const authHeader = request.headers.authorization
		const bearer = authHeader.split(' ')[0]
		const token = authHeader.split(' ')[1]
		const user = jwtService.decode(token)
		return user.sub
	} catch (err) {
		return null
	}
})

export default UserID
