import { IsDateString, IsOptional, IsString, Matches } from 'class-validator'

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

	@IsOptional()
	@IsDateString()
	declinedAt: string

	@IsOptional()
	@IsDateString()
	approvedAt: string

	@IsOptional()
	@IsDateString()
	confirmedAt: string

	@IsOptional()
	@IsDateString()
	canceledAt: string
}
