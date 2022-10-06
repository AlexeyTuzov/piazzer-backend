import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { User } from 'src/modules/users/domain/entities/users.entity'
import { UserRolesEnum } from 'src/modules/users/domain/enums/userRoles.enum'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const roles = this.reflector.get<UserRolesEnum[]>(
			'roles',
			context.getHandler(),
		)
		const request = context.switchToHttp().getRequest()
		const user = request.user as User
		return roles.includes(user.role)
	}
}
