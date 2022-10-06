import { Filter } from './filter'

export class NumberFilter extends Filter {
	tableAlias: string
	field: string
	constructor(filterName: string, tableAlias: string, field: string) {
		super()
		this.name = 'NumberFilter'
		this.filterName = filterName
		this.availableOperators = [
			'eq',
			'neq',
			'gt',
			'gte',
			'lt',
			'lte',
			'in',
			'nin',
			'between',
			'nbetween',
		]
		this.tableAlias = tableAlias
		this.field = field
	}
}
