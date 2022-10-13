import {
	ForbiddenException,
	forwardRef,
	Inject,
	Injectable,
} from '@nestjs/common'
import { UsersService } from 'src/modules/users/application/services/users.service'
import { User } from 'src/modules/users/domain/entities/users.entity'
import { UserRolesEnum } from 'src/modules/users/domain/enums/userRoles.enum'
import ScopesEnum from '../enums/scopes.enum'
import IAccessControl from '../interfaces/access-control.interface'
import roleScopesInterface from '../interfaces/roleScopes.interface'

@Injectable()
export class AccessControlService implements IAccessControl {
	constructor(
		@Inject(forwardRef(() => UsersService))
		private readonly usersService: UsersService,
	) {}

	getAvailableScopes(
		roleScopes: roleScopesInterface[],
		user?: User,
	): ScopesEnum[] {
		try {
			if (!user) {
				const anonymousScope = roleScopes.find(
					(roleScope) => roleScope.role === UserRolesEnum.ANONYMOUS,
				)
				return anonymousScope.scopes
			}
			const calculatedRole = roleScopes.find(
				(roleScope) => roleScope.role === user.role,
			)

			return calculatedRole.scopes
		} catch (err) {
			throw new ForbiddenException()
		}
	}

	async getScopesIfPossiblyUnauthorized(
		userId?: string,
	): Promise<ScopesEnum[]> {
		let user: any
		if (userId) {
			user = await this.usersService.findOneOrFail(userId)
		}
		return this.getAvailableScopes(
			[
				{ role: UserRolesEnum.ADMIN, scopes: [ScopesEnum.ALL] },
				{ role: UserRolesEnum.USER, scopes: [ScopesEnum.AVAILABLE] },
				{ role: UserRolesEnum.ANONYMOUS, scopes: [ScopesEnum.AVAILABLE] },
			],
			user,
		)
	}

	checkOwnership(authUser: User, requestId: string): void {
		const scopes = this.getAvailableScopes(
			[
				{ role: UserRolesEnum.ADMIN, scopes: [ScopesEnum.ALL] },
				{ role: UserRolesEnum.USER, scopes: [ScopesEnum.OWNED] },
				{ role: UserRolesEnum.ANONYMOUS, scopes: [] },
			],
			authUser,
		)

		if (scopes.includes(ScopesEnum.OWNED) && authUser.id != requestId) {
			throw new ForbiddenException()
		}
	}

	checkAdminRights(authUser: User): void {
		if (authUser.role != UserRolesEnum.ADMIN) {
			throw new ForbiddenException()
		}
	}

	checkNotSelf(authUser: User, requestId: string): void {
		if (authUser.id === requestId) {
			throw new ForbiddenException()
		}
	}
}
