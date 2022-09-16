import { EntityManager } from 'typeorm';

export const onCommit = <T>(callback: () => T, entityManager: EntityManager): void => {
  const oldCommit = entityManager.queryRunner.commitTransaction.bind(entityManager.queryRunner);
  entityManager.queryRunner.commitTransaction = async () => {
    const result = await oldCommit();
    callback();
    return result;
  };
};
