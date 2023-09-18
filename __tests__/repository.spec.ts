import { QueryBuilderAPI } from "../src/core/query-builders/api-query-language";
import { Repository } from "../src/core/data-access-layer/entity-repository";
import { DataAccessLayer } from "../src/core/data-access-layer/data-access-layer";
import { DatabaseConnection } from "../src/core/database/database-connection";
import { UserEntity } from "./user.entity"
import { LilORM } from "../src/api"

describe('Repository', () => {
    let repository: Repository<UserEntity>;
    let qbMock: QueryBuilderAPI;
    let lilOrm: LilORM;

    beforeEach(async () => {
        const connectionString = 'postgresql://username:password@localhost:5432/mydb';
        qbMock = new QueryBuilderAPI();
        lilOrm = new LilORM(connectionString);
        await lilOrm.createTable(UserEntity);
        repository = lilOrm.getRepository(UserEntity);
    });

    afterEach(async () => {
        await repository.delete(qb => qb.where('id').equals('4048a348-ad49-487f-80fe-9cd1c0e81df7'))
    })

    it('should insert a UserEntity', async () => {
        await repository.delete(qb => qb.where('id').equals('4048a348-ad49-487f-80fe-9cd1c0e81df7'))
        const userEntity = new UserEntity();
        userEntity.id = '4048a348-ad49-487f-80fe-9cd1c0e81df7';
        userEntity.name = 'test';
        userEntity.email = 'test@example.com';
        userEntity.isActive = false;
        userEntity.age = 42;
        userEntity.config = null;
        userEntity.createdAt = new Date((new Date()).setMilliseconds(0));

        await repository.insert(userEntity);
        const users = await repository.retrieve(qb => qb.where('id').equals('4048a348-ad49-487f-80fe-9cd1c0e81df7'));
        const user: UserEntity = {...users[0], createdAt: new Date(users[0].createdAt)}
        expect(user).toEqual(userEntity);
    });

    it('should update a UserEntity', async () => {
        const userEntity = new UserEntity();
        userEntity.id = '4048a348-ad49-487f-80fe-9cd1c0e81df7';
        userEntity.name = 'test';
        userEntity.email = 'test@example.com';

        await repository.insert(userEntity);
        userEntity.name = 'updated';
        await repository.update(userEntity, qb => qb.where('id').equals('4048a348-ad49-487f-80fe-9cd1c0e81df7'));
        const users = await repository.retrieve(qb => qb.where('id').equals('4048a348-ad49-487f-80fe-9cd1c0e81df7'));
        expect(users[0].name).toEqual('updated');
    });

    it('should delete a UserEntity', async () => {
        const userEntity = new UserEntity();
        userEntity.name = 'test';
        userEntity.email = 'test@example.com';

        await repository.insert(userEntity);
        await repository.delete(qb => qb.where('id').equals('4048a348-ad49-487f-80fe-9cd1c0e81df7'));
        const users = await repository.retrieve(qb => qb.where('id').equals('4048a348-ad49-487f-80fe-9cd1c0e81df7'));
        expect(users.length).toEqual(0);
    });

    it('should retrive a JSON object from UserEntity', async () => {
        const userEntity = new UserEntity();
        userEntity.id = '4048a348-ad49-487f-80fe-9cd1c0e81df7';
        userEntity.name = 'test';
        userEntity.email = 'test@example.com';
        userEntity.config = { test: true };
        userEntity.isActive = true;

        await repository.insert(userEntity);
        
        const users = await repository.retrieve(qb => qb.where('id').equals('4048a348-ad49-487f-80fe-9cd1c0e81df7'));
        expect(users[0].config).toEqual({ test: true });
        expect(users[0].isActive).toEqual(true);
    });

    it('should retrive a Date greater then from UserEntity', async () => {
        const userEntity = new UserEntity();
        userEntity.id = '4048a348-ad49-487f-80fe-9cd1c0e81df7';
        userEntity.name = 'test';
        userEntity.email = 'test@example.com';
        userEntity.config = { test: true };
        userEntity.isActive = true;

        await repository.insert(userEntity);
        
        const users = await repository.retrieve(qb => qb.where('id').equals('4048a348-ad49-487f-80fe-9cd1c0e81df7'));
        expect(users[0].config).toEqual({ test: true });
        expect(users[0].isActive).toEqual(true);
    });
});