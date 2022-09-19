import { AutoMap } from '@automapper/classes';
import { Communication } from '../../../communications/domain/entities/communications.entity';

export default class CreateUserDto {

    @AutoMap()
    readonly email: string;

    @AutoMap()
    readonly password: string;

    @AutoMap()
    readonly name: string;

    @AutoMap(() => Communication)
    readonly communications?: Communication[];
}
