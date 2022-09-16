import { EntityManager, getManager } from 'typeorm';

export const transacting = async <T>(
  callback: (entityManager: EntityManager) => Promise<T>,
  entityManager?: EntityManager,
): Promise<T> => {
  if (!entityManager) {
    return getManager().transaction((entityManager) => callback(entityManager));
  }

  return callback(entityManager);
};

