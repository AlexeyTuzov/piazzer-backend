import { IsDateString, IsOptional, IsString } from 'class-validator'

export default class CreateScheduleItemDto {
	@IsDateString()
	dateStart: Date

	@IsDateString()
	dateEnd: Date

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
