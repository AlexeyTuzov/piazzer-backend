export abstract class UseCases {

    abstract create(dto);

    abstract update(dto);

    abstract getOne(id);

    abstract getAll();

    abstract delete(id);
}
