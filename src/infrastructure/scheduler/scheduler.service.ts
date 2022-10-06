import { Injectable } from '@nestjs/common'
import { VenueScheduleItemStatusesEnum } from 'src/modules/venues/domain/enums/venueScheduleItemStatuses.enum'
import { IScheduler } from './scheduler.interface'
import ApprovedSourceStates from './states/approved'
import CancelledSourceStates from './states/cancelled'
import ConfirmedSourceStates from './states/confirmed'
import DeclinedSourceStates from './states/declined'

@Injectable()
export default class SchedulerService implements IScheduler {
	checkStatusChange(
		previousStatus: VenueScheduleItemStatusesEnum,
		targetStatus: VenueScheduleItemStatusesEnum,
	): boolean {
		switch (targetStatus) {
			case VenueScheduleItemStatusesEnum.DECLINED:
				return !!Object.values(DeclinedSourceStates).find(
					(state) => state === previousStatus,
				)

			case VenueScheduleItemStatusesEnum.APPROVED:
				return !!Object.values(ApprovedSourceStates).find(
					(state) => state === previousStatus,
				)

			case VenueScheduleItemStatusesEnum.CONFIRMED:
				return !!Object.values(ConfirmedSourceStates).find(
					(state) => state === previousStatus,
				)

			case VenueScheduleItemStatusesEnum.CANCELED:
				return !!Object.values(CancelledSourceStates).find(
					(state) => state === previousStatus,
				)

			default:
				return false
		}
	}
}
