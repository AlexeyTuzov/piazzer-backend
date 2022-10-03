import { IsEnum } from 'class-validator'
import { UserRolesEnum } from '../../domain/enums/userRoles.enum'

export default class ChangeRoleDto {
	@IsEnum(UserRolesEnum)
	role: UserRolesEnum
}
