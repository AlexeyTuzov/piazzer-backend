export abstract class UseCases {

    abstract create(dto);

    abstract update(dto);

    abstract getById(id);

    abstract getAll(dto);

    abstract delete(id);
}
