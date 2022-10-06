import { VenueScheduleItemStatusesEnum } from 'src/modules/venues/domain/enums/venueScheduleItemStatuses.enum'

export interface IScheduler {
	checkStatusChange(
		previousStatus: VenueScheduleItemStatusesEnum,
		targetStatus: VenueScheduleItemStatusesEnum,
	): boolean
}
