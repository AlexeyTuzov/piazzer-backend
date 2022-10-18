import { SpleenFilterManager } from '../../../../infrastructure/spleen-filter/spleen-filter-manager'
import { IFilter } from '../../../../infrastructure/spleen-filter/interfaces/filter.interface'
import { Creator } from '../../../../infrastructure/spleen-filter/creator'

export class EventsFilterManager extends SpleenFilterManager {
	static filters = new Set<IFilter>([
		Creator.create({
			name: 'BooleanFilter',
			filterName: 'eventIsDraft',
			tableAlias: 'events',
			field: 'isDraft',
		}),
		Creator.create({
			name: 'UUIDFilter',
			filterName: 'organizerId',
			tableAlias: 'organizer',
			field: 'id',
		}),
		Creator.create({
			name: 'StringFilter',
			filterName: 'city',
			tableAlias: 'venue',
			field: 'city',
		}),
		Creator.create({
			name: 'DateFilter',
			filterName: 'eventDateStart',
			tableAlias: 'schedules',
			field: 'dateStart',
		}),
		Creator.create({
			name: 'DateFilter',
			filterName: 'eventDateEnd',
			tableAlias: 'schedules',
			field: 'dateEnd',
		}),
	])
}
