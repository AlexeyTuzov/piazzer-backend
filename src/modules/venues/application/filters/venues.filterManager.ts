import { SpleenFilterManager } from '../../../../infrastructure/spleen-filter/spleen-filter-manager'
import { IFilter } from '../../../../infrastructure/spleen-filter/interfaces/filter.interface'
import { Creator } from '../../../../infrastructure/spleen-filter/creator'

export class VenuesFilterManager extends SpleenFilterManager {
	static filters = new Set<IFilter>([
		Creator.create({
			name: 'UUIDFilter',
			filterName: 'venueId',
			tableAlias: 'venues',
			field: 'id',
		}),
		Creator.create({
			name: 'StringFilter',
			filterName: 'venueTitle',
			tableAlias: 'venues',
			field: 'title',
		}),
		Creator.create({
			name: 'StringFilter',
			filterName: 'venueAddress',
			tableAlias: 'venues',
			field: 'address',
		}),
		Creator.create({
			name: 'UUIDFilter',
			filterName: 'venueCoverId',
			tableAlias: 'venues',
			field: 'coverId',
		}),
		Creator.create({
			name: 'StringFilter',
			filterName: 'venueCity',
			tableAlias: 'venues',
			field: 'city',
		}),
		Creator.create({
			name: 'StringFilter',
			filterName: 'venueShort',
			tableAlias: 'venues',
			field: 'short',
		}),
		Creator.create({
			name: 'DateFilter',
			filterName: 'venueCreatedAt',
			tableAlias: 'venues',
			field: 'createdAt',
		}),
		Creator.create({
			name: 'DateFilter',
			filterName: 'venueUpdatedAt',
			tableAlias: 'venues',
			field: 'updatedAt',
		}),
		Creator.create({
			name: 'StringFilter',
			filterName: 'venueContactPerson',
			tableAlias: 'venues',
			field: 'contactPerson',
		}),
		Creator.create({
			name: 'StringFilter',
			filterName: 'venueDescription',
			tableAlias: 'venues',
			field: 'description',
		}),
		Creator.create({
			name: 'NumberFilter',
			filterName: 'venueCapacity',
			tableAlias: 'venues',
			field: 'capacity',
		}),
		Creator.create({
			name: 'NumberFilter',
			filterName: 'venueCost',
			tableAlias: 'venues',
			field: 'cost',
		}),
		Creator.create({
			name: 'BooleanFilter',
			filterName: 'venueIsBlocked',
			tableAlias: 'venues',
			field: 'isBlocked',
		}),
		Creator.create({
			name: 'BooleanFilter',
			filterName: 'venueIsDraft',
			tableAlias: 'venues',
			field: 'isDraft',
		}),
		Creator.create({
			name: 'UUIDFilter',
			filterName: 'ownerId',
			tableAlias: 'owner',
			field: 'id',
		}),
	])
}
