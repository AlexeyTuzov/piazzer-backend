import { AutoMap } from "@automapper/classes";

export default class CreateScheduleItemDto {

    @AutoMap()
    date: string;

    @AutoMap()
    startTime: string;

    @AutoMap()
    endTime: string;

    @AutoMap()
    eventId: string;

    @AutoMap()
    declinedAt: string;

    @AutoMap()
    approvedAt: string;

    @AutoMap()
    confirmedAt: string;

    @AutoMap()
    canceledAt: string;
}