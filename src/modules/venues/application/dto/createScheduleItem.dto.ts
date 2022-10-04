import { IsDateString, IsString, Matches } from 'class-validator'

const regTime = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/

export default class CreateScheduleItemDto {
	@IsDateString()
	date: string

	@Matches(regTime)
	startTime: string

	@Matches(regTime)
	endTime: string

	@IsString()
	eventId: string

	@IsDateString()
	declinedAt: string

	@IsDateString()
	approvedAt: string

	@IsDateString()
	confirmedAt: string

	@IsDateString()
	canceledAt: string
}
