import { VenueScheduleItemStatusesEnum } from 'src/modules/venues/domain/enums/venueScheduleItemStatuses.enum'

const CancelledSourceStates = [
	VenueScheduleItemStatusesEnum.CREATED,
	VenueScheduleItemStatusesEnum.DECLINED,
	VenueScheduleItemStatusesEnum.APPROVED,
	VenueScheduleItemStatusesEnum.CONFIRMED,
]

export default CancelledSourceStates
