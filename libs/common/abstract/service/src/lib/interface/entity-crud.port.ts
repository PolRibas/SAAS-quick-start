import { FindByCriteriaRequest, FindByCriteriaResponse } from "../criteria";

export interface IAbstractCrud<T> {
  create(entity: T): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  update(id: string, entity: T): Promise<T>;
  delete(id: string): Promise<void>;
  findByCriteria?(request: FindByCriteriaRequest): Promise<FindByCriteriaResponse<T>>;
}
