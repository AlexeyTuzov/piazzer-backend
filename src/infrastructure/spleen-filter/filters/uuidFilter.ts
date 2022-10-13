import { Filter } from './filter'

export class UUIDFilter extends Filter {
	constructor(filterName: string, tableAlias: string, field: string) {
		super()
		this.name = 'UUIDFilter'
		this.filterName = filterName
		this.availableOperators = ['eq', 'neq', 'in', 'nin']
		this.tableAlias = tableAlias
		this.field = field
	}

	validateValue(value: string | string[]): void {
		// if (!isUUID(value)) {
		// 	throw new HttpException(
		// 		{
		// 			filter: this.filterName,
		// 			message: `each value in ${this.filterName} must be a UUID`,
		// 			code: 'VALIDATION_EXCEPTION',
		// 		},
		// 		HttpStatus.UNPROCESSABLE_ENTITY,
		// 	)
		// }
	}
}
