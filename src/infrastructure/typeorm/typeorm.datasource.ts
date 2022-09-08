import { DataSource } from "typeorm";

const TypeOrmDataSource = new DataSource({
    type: 'postgres'
});

export default TypeOrmDataSource;