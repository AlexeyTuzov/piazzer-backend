import { UserRolesEnum } from 'src/modules/users/domain/enums/userRoles.enum'
import ScopesEnum from '../enums/scopes.enum'

export default interface IRoleScope {
	role: UserRolesEnum
	scopes: ScopesEnum[]
}
