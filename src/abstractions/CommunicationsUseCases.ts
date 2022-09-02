import { UseCases } from "./UseCases";

export default abstract class CommunicationsUseCases extends UseCases {

    abstract confirm(id);

    abstract sendCode(id)

}