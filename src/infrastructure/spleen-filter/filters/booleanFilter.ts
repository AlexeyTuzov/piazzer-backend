import { Filter } from './filter'

export class BooleanFilter extends Filter {
	tableAlias: string
	field: string
	constructor(filterName: string, tableAlias: string, field: string) {
		super()
		this.name = 'BooleanFilter'
		this.filterName = filterName
		this.availableOperators = ['eq', 'neq']
		this.tableAlias = tableAlias
		this.field = field
	}
}
