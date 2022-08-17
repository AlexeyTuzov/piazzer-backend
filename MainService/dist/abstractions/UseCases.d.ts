export declare abstract class UseCases {
    abstract create(dto: any): any;
    abstract update(dto: any): any;
    abstract getById(id: any): any;
    abstract getAll(): any;
    abstract delete(id: any): any;
}
