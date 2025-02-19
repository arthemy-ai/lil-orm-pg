import { MetadataExtractor } from "../metadata/metadata-extractor";
import { OperationType, QueryBuilderAPI } from "./api-query-language";
import { QueryCondition } from "./query-condition";
import { WhereQueryBuilder } from "./where-query-builder";

export class DeleteQueryBuilder<T> {
  private whereConditions: string[];

  constructor(
    private readonly entityClass: new () => T extends object ? T : any,
    private readonly queryBuilder: QueryBuilderAPI
  ) {
    this.whereConditions = [];
    this.queryBuilder.forEntity(this.entityClass, OperationType.DeleteFrom);
  }

  self(): DeleteQueryBuilder<T> {
    return this;
  }

  where<K extends keyof T & string>(
    propertySelector: K
  ): QueryCondition<T, keyof T & string> {
    const whereQueryBuilder = new WhereQueryBuilder<T>(
      this.entityClass,
      this.queryBuilder
    );
    const queryCondition = whereQueryBuilder.where(propertySelector);
    this.whereConditions.push(queryCondition.build());
    return queryCondition;
  }

  finalize(): QueryBuilderAPI {
    return this.queryBuilder;
  }
}
