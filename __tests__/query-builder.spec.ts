import { Column, Entity, PrimaryKey } from "../src/core/decorators";
import { QueryBuilderAPI } from "../src/core/query-builders/api-query-language";
import "reflect-metadata"
import { UserEntity } from "./user.entity";

describe("QueryBuilderAPI", () => {
  let queryBuilder: QueryBuilderAPI;

  beforeEach(() => {
    queryBuilder = new QueryBuilderAPI();
  });

  it("should build a simple select query", () => {
    const query = queryBuilder.forEntity(UserEntity).finalize().build();

    expect(query?.trim()).toBe("SELECT * FROM users");
  });

  it("should build a simple where query", () => {
    const query = queryBuilder.forEntity(UserEntity)
    .where('email').equals('test@email.com').and('id')
    .equals('4048a348-ad49-487f-80fe-9cd1c0e81df7').build();

    expect(query?.trim()).toBe("SELECT * FROM users WHERE users.email = 'test@email.com' AND users.id = '4048a348-ad49-487f-80fe-9cd1c0e81df7'");
  });

  it("should build an insert query", () => {
    const query = queryBuilder
      .insertInto(UserEntity)
      .setObject({ id: '4048a348-ad49-487f-80fe-9cd1c0e81df7', name: "John", email: "john@example.com" })
      .finalize().build();
      
    expect(query.trim()).toBe("INSERT INTO users (id, name, email) VALUES ('4048a348-ad49-487f-80fe-9cd1c0e81df7', 'John', 'john@example.com')");
  });

  it("should build an update query", () => {
    const query = queryBuilder
      .update(UserEntity)
      .setObject({ name: "John Doe", age: 30, isActive: false })
      .where('id').equals('4048a348-ad49-487f-80fe-9cd1c0e81df7')
      .and('isActive').equals(true)
      .build();

    expect(query.trim()).toBe("UPDATE users SET name = 'John Doe', is_active = false, age = 30 WHERE users.id = '4048a348-ad49-487f-80fe-9cd1c0e81df7' AND users.is_active = true");
  });

  it("should build a delete query", () => {
    const query = queryBuilder
      .deleteFrom(UserEntity)
      .where('id').equals('4048a348-ad49-487f-80fe-9cd1c0e81df7')
      .and('isActive').equals(true)
      .build();

    expect(query.trim()).toBe("DELETE FROM users WHERE users.id = '4048a348-ad49-487f-80fe-9cd1c0e81df7' AND users.is_active = true");
  });

  it("should build a complex where query with AND and OR conditions", () => {
    const query = queryBuilder.forEntity(UserEntity)
      .where('email').equals('test@email.com')
      .and('id').equals('4048a348-ad49-487f-80fe-9cd1c0e81df7')
      .or('name').equals('John Doe')
      .build();
  
    expect(query?.trim()).toBe("SELECT * FROM users WHERE users.email = 'test@email.com' AND users.id = '4048a348-ad49-487f-80fe-9cd1c0e81df7' OR users.name = 'John Doe'");
  });

  it("should build a compound where query", () => {
    const query = queryBuilder
      .forEntity(UserEntity)
      .where('email').equals('test@email.com')
      .and('id').equals('4048a348-ad49-487f-80fe-9cd1c0e81df7')
      .or('age').equals(30)
      .and('isActive').equals(true)
      .build();
  
    expect(query.trim()).toBe("SELECT * FROM users WHERE users.email = 'test@email.com' AND users.id = '4048a348-ad49-487f-80fe-9cd1c0e81df7' OR users.age = 30 AND users.is_active = true");
  });

  /*it("should build a query with a complex nested condition", () => {
    const query = queryBuilder.forEntity(UserEntity)
      .where('isActive').equals(true)
      .andNested((nested) => nested
        .where('age').greaterThan(30)
        .or('email').like('%example.com')
      )
      .build();
  
    expect(query?.trim()).toBe("SELECT * FROM users WHERE users.isActive = true AND (users.age > 30 OR users.email LIKE '%example.com')");
  });*/
});
