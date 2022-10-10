import { User } from 'src/modules/users/domain/entities/users.entity'
import ScopesEnum from '../enums/scopes.enum'
import IRoleScope from './roleScopes.interface'

export default interface IAccessControl {
	getAvailableScopes(roleScopes: IRoleScope[], user: User): ScopesEnum[]
	checkOwnership(authUser: User, id: string): void
	checkAdminRights(authUser: User): void
	checkNotSelf(authUser: User, requestId: string): void
}
