import { ICreatorConfig } from './interfaces/creatorConfig.interface'
import { IFilter } from './interfaces/filter.interface'
import {
	UUIDFilter,
	StringFilter,
	NumberFilter,
	BooleanFilter,
	DateFilter,
} from './filters'

export class Creator {
	static create(config: ICreatorConfig): IFilter {
		switch (config.name) {
			case 'UUIDFilter':
				return new UUIDFilter(config.filterName, config.tableAlias, config.field)
			case 'StringFilter':
				return new StringFilter(config.filterName, config.tableAlias, config.field)
			case 'NumberFilter':
				return new NumberFilter(config.filterName, config.tableAlias, config.field)
			case 'BooleanFilter':
				return new BooleanFilter(config.filterName, config.tableAlias, config.field)
			case 'DateFilter':
				return new DateFilter(config.filterName, config.tableAlias, config.field)
		}
	}
}
