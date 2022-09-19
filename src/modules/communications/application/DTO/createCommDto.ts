import { AutoMap } from "@automapper/classes";
import CommunicationsTypes from "../../domain/enums/comm-types";
import { User } from '../../../users/domain/entities/users.entity';
import { Venue } from '../../../venues/domain/entities/venues.entity';

export default class CreateCommDto {

    @AutoMap()
    readonly type: CommunicationsTypes;

    @AutoMap()
    readonly value: string;

    @AutoMap()
    readonly description?: string;

    @AutoMap(() => User)
    readonly user?: User;

    @AutoMap(() => Venue)
    readonly venue?: Venue;
}
