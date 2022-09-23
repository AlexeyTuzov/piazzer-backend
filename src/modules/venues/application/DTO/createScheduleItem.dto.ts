import { IsDateString, IsString } from "class-validator";

export default class CreateScheduleItemDto {

    @IsDateString()
    date: string;

    @IsString()
    startTime: string;

    @IsString()
    endTime: string;

    @IsString()
    eventId: string;

    @IsDateString()
    declinedAt: string;

    @IsDateString()
    approvedAt: string;

    @IsDateString()
    confirmedAt: string;

    @IsDateString()
    canceledAt: string;
}