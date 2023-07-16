/**
 * Represents the application data source configuration.
 * Configures the connection details and settings for the PostgreSQL database.
 * Defines the entities (Student and Marks) to be used by TypeORM.
 */
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Student } from "./entity/Student"
import { Marks } from "./entity/Marks"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "mysecretpassword",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Student, Marks],
    migrations: [],
    subscribers: [],
})

