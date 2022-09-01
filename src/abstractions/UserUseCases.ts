import { UseCases } from "./UseCases";

export default abstract class UserUseCases extends UseCases {

    abstract logIn(dto);

    abstract getOne(dto);
}