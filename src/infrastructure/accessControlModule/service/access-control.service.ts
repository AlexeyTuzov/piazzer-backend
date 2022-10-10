import { ForbiddenException, Injectable } from '@nestjs/common'
import { User } from 'src/modules/users/domain/entities/users.entity'
import { UserRolesEnum } from 'src/modules/users/domain/enums/userRoles.enum'
import ScopesEnum from '../enums/scopes.enum'
import IAccessControl from '../interfaces/access-control.interface'
import roleScopesInterface from '../interfaces/roleScopes.interface'

@Injectable()
export class AccessControlService implements IAccessControl {
	getAvailableScopes(
		roleScopes: roleScopesInterface[],
		user: User,
	): ScopesEnum[] {
		if (!user) {
			throw new ForbiddenException()
		}

		try {
			const calculatedRole = roleScopes.find(
				(roleScope) => roleScope.role === user.role,
			)

			if (calculatedRole.scopes.length === 0) {
				throw new ForbiddenException()
			}

			return calculatedRole.scopes
		} catch (err) {
			throw new ForbiddenException()
		}
	}

	checkOwnership(authUser: User, requestId: string): void {
		const scopes = this.getAvailableScopes(
			[
				{ role: UserRolesEnum.ADMIN, scopes: [ScopesEnum.ALL] },
				{ role: UserRolesEnum.USER, scopes: [ScopesEnum.OWNED] },
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
