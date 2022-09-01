import CommTypes from "../Enums/comm-types";

export default class createCommDto {
    
    readonly type: CommTypes;

    readonly value: string;
}