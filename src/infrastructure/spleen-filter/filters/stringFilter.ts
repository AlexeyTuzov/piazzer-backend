import { Filter } from './filter'

export class StringFilter extends Filter {
	tableAlias: string
	field: string
	constructor(filterName: string, tableAlias: string, field: string) {
		super()
		this.name = 'StringFilter'
		this.filterName = filterName
		this.availableOperators = ['eq', 'neq', 'like', 'nlike']
		this.tableAlias = tableAlias
		this.field = field
	}
}
