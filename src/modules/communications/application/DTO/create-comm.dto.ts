import CommTypes from "../../domain/enums/comm-types";

export default class CreateCommDto {

    readonly type: CommTypes;

    readonly value: string;
}
