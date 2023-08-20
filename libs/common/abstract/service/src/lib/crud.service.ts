import { Injectable } from '@nestjs/common';
import { IAbstractCrud } from './interface';
import { Model } from 'mongoose';
import { FindByCriteriaRequest, MongooseSearchCriteria } from './criteria';
import { IAbstractMongooseFactory } from '@saas-quick-start/common/abstract/factory';

@Injectable()
export abstract class AbstractCrudService<T, Y> implements IAbstractCrud<T> {
  public readonly factory: IAbstractMongooseFactory<T, Y>;
  public readonly populates?: string[];

  constructor(
    private readonly model: Model<Y>,
    factory: IAbstractMongooseFactory<T, Y>,
    populates?: string[],
  ) {
    this.factory = factory;
    this.populates = populates;
  }

  async create(entity: T): Promise<T> {
    const mongooseEntity: Y = this.factory.domainToMongoose(entity);
    const createdEntity = new this.model(mongooseEntity);
    await createdEntity.save();
    return this.factory.mongooseToDomain(createdEntity);
  }

  async findAll(): Promise<T[]> {
    const results: Y[] = await this.model.find();
    return results.map((mongooseEntity) =>
      this.factory.mongooseToDomain(mongooseEntity),
    );
  }

  async findOne(id: string): Promise<T> {
    const queryChain = this.model.findById(id)
    if (this.populates) {
      this.populates.forEach((populate: string) => {
        queryChain.populate(populate)
      })
    }
    const result: Y = await queryChain.exec();
    return result ? this.factory.mongooseToDomain(result) : null;
  }

  async update(id: string, entity: T): Promise<T> {
    const mongooseEntity = this.factory.domainToMongoose(entity);
    const result: Y = await this.model.findByIdAndUpdate(id, mongooseEntity, {
      new: true,
    });
    return result ? this.factory.mongooseToDomain(result) : null;
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndRemove(id).exec();
  }

  async deleteAll(): Promise<void> {
    await this.model.deleteMany({}).exec();
  }

  async findByCriteria(request: FindByCriteriaRequest): Promise<{
    items: T[],
    total: number,
    page?: number;
    limit?: number;
  }> {
    const criteria = new MongooseSearchCriteria(request);
    const mongooseQuery = criteria.toMongooseQuery();
    const { skip, limit } = criteria.getPagination();
    const queryChain = this.model.find(mongooseQuery.filter);

    if (mongooseQuery.options && mongooseQuery.options.sort) {
      queryChain.sort(mongooseQuery.options.sort);
    }

    if (this.populates) {
      this.populates.forEach((populate: string) => {
        queryChain.populate(populate)
      })
    }

    const results = await queryChain
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.model.countDocuments(mongooseQuery.filter).exec();

    const items = results.map(mongooseEntity => this.factory.mongooseToDomain(mongooseEntity));

    return {
      items,
      total,
      page: request.page || 0,
      limit: request.limit || criteria.defaultLimit,
    }
  }
}
