import { EntityManager, getManager } from 'typeorm';

//TODO: revert to 0.2.45 v. of TypeORM or use new DataSource.manager syntax
const transact = async <T>(
    callback: (entityManager: EntityManager) => Promise<T>,
    entityManager?: EntityManager): Promise<T> => {
    if (!entityManager) {
        return getManager().transaction( entityManager => callback(entityManager));
    } else {
        return callback(entityManager);
    }
}

export default transact;
