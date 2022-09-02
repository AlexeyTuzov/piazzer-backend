import { UseCases } from "./UseCases";

export default abstract class UserUseCases extends UseCases {

    abstract logIn(dto);

    abstract getOne(dto);

    abstract createComm(id, dto);

    abstract deleteComm(id, commID);

    abstract confirmComm(id, dto);

    abstract sendCode(id);

    abstract changeRole(id, role);

    abstract block(id);

    abstract unblock(id);
}