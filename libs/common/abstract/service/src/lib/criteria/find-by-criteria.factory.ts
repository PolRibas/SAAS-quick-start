import {
  FindByCriteriaJoinEnum,
  FindByCriteriaOperationEnum,
  FindByCriteriaRequest,
  FindCriteriaMongoose,
  MongooseSearchCriteriaPort
} from "./find-by-criteria.interface";

export class MongooseSearchCriteria<TRawDocType>
  implements MongooseSearchCriteriaPort<TRawDocType> {
  private readonly criteria: FindByCriteriaRequest;
  public defaultLimit = 10;

  constructor(request: FindByCriteriaRequest) {
    this.criteria = request;
  }

  /* TODO
    ([
      {
        $lookup: {
          from: "users", // nombre de la colección de usuarios en MongoDB (generalmente en plural)
          localField: "author",
          foreignField: "_id",
          as: "author_info"
        }
      },
      {
        $match: { "author_info.email": "example@example.com" }
      }
    ])
  */

  toMongooseQuery(): FindCriteriaMongoose<TRawDocType> {
    let filter: FindCriteriaMongoose<TRawDocType>['filter'] = undefined;
    const filters = this.criteria.conditions || [];

    if (filters.length > 0) {
      const conditions = [];
      filters.forEach((condition) => {
        const operationObj = {};
        if (condition.operation === FindByCriteriaOperationEnum.CN) {
          operationObj['$regex'] = new RegExp(condition.value as string, 'i');
        } else {
          operationObj[condition.operation] = condition.value;
        }

        const conditionObj = {};
        conditionObj[condition.key] = operationObj;

        conditions.push(conditionObj);
      });

      // We use the first join to combine conditions. By default, if no join is specified, we use AND.
      const join = this.criteria.join || FindByCriteriaJoinEnum.AND;

      // Update the filter based on the join
      if (join === FindByCriteriaJoinEnum.AND) {
        filter = { $and: conditions };
      } else if (join === FindByCriteriaJoinEnum.OR) {
        filter = { $or: conditions };
      }
    }

    let options: FindCriteriaMongoose<TRawDocType>['options'] = undefined;
    // Handling the sorting criteria
    if (this.criteria.sortKey) {
      options = {
        sort: {
          [this.criteria.sortKey]: this.criteria.sortOrder === 'asc' ? 1 : -1
        }
      };
    }

    const query: FindCriteriaMongoose<TRawDocType> = {
      filter,
      projection: undefined,
      options
    };

    return query;
  }


  getPagination(): { skip: number, limit: number } {
    const limit = this.criteria.limit || this.defaultLimit;
    const skip = (this.criteria.page || 0) * limit;
    return { skip, limit };
  }
}
