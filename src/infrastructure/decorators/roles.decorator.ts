import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { UserRolesEnum } from 'src/modules/users/domain/enums/userRoles.enum'
import { RolesGuard } from '../guards/roles.guard'

export function Roles(...roles: UserRolesEnum[]) {
	return applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard))
}
