import { FilterQuery, ProjectionType, QueryOptions } from "mongoose";

/**
 * Enumeration for supported operations in the find criteria.
 */
export enum FindByCriteriaOperationEnum {
  /** Equals operation. */
  EQ = "$eq",
  /** Contains operation. */
  CN = "$cn",
  /** Not equals operation. */
  NE = "$ne",
  /** Greater than operation. */
  GT = "$gt",
  /** Greater than or equal operation. */
  GTE = "$gte",
  /** Less than operation. */
  LT = "$lt",
  /** Less than or equal operation. */
  LTE = "$lte",
  /** In operation (for arrays). */
  IN = "$in",
  /** Not in operation (for arrays). */
  NIN = "$nin",
  /** Field existence check. */
  EXISTS = "$exists",
  /** Type check operation. */
  TYPE = "$type",
  /** Modulo operation. */
  MOD = "$mod",
  /** Matches any of the values specified in an array. */
  ALL = "$all",
  /** Matches array size. */
  SIZE = "$size",
}

/**
 * Enumeration for join operations in the find criteria.
 */
export enum FindByCriteriaJoinEnum {
  /** Logical AND operation. */
  AND = "$and",
  /** Logical OR operation. */
  OR = "$or",
}


export interface FindByCriteriaFilterCondition {
  key: string;
  operation: FindByCriteriaOperationEnum;
  value: unknown;
}

export interface FindByCriteriaRequest {
  conditions?: FindByCriteriaFilterCondition[];
  join?: FindByCriteriaJoinEnum;
  sortKey?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
}

export interface FindCriteriaMongoose<TRawDocType> {
  filter: FilterQuery<TRawDocType>,
  projection?: ProjectionType<TRawDocType> | null | undefined,
  options?: QueryOptions<TRawDocType> | null | undefined
}

export interface FindByCriteriaResponse<T> {
  items: T[],
  total: number,
  page?: number;
  limit?: number;
}

export interface MongooseSearchCriteriaPort<TRawDocType> {
  toMongooseQuery(): FindCriteriaMongoose<TRawDocType>;
  getPagination(): { skip: number, limit: number };
}
