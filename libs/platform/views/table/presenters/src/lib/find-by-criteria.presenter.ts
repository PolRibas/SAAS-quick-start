/**
 * Enumeration for supported operations in the find criteria.
 */
export enum FindByCriteriaPresenterOperationEnum {
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
export enum FindByCriteriaPresenterJoinEnum {
  /** Logical AND operation. */
  AND = "$and",
  /** Logical OR operation. */
  OR = "$or",
}


export interface FindByCriteriaPresenterFilterCondition {
  key: string;
  operation: FindByCriteriaPresenterOperationEnum;
  value: unknown;
}

export interface FindByCriteriaPresenterRequest {
  conditions?: FindByCriteriaPresenterFilterCondition[];
  join?: FindByCriteriaPresenterJoinEnum;
  sortKey?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
}

export interface FindByCriteriaPresenterResponse<T> {
  items: T[],
  total: number,
  page?: number;
  limit?: number;
}
