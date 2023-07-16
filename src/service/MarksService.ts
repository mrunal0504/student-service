/**
 * Service layer for the Marks entity that handles all the database operations using TypeORM.
 */
import { AppDataSource } from "../data-source";
import { Marks } from "../entity/Marks";
import { Repository } from "typeorm";
import logger from "../utils/logger"

export class MarksService {
    private marksRepository: Repository<Marks>;

    constructor() {
        this.marksRepository = AppDataSource.getRepository(Marks);
    }

    async createMarks(marksData: any): Promise<Marks> {
        try {
            logger.info("The request received in the marks service for fetching the students")
            const studentMarks = Object.assign(new Marks(), marksData);
            return await this.marksRepository.save(studentMarks);
        } catch (error) {
            throw new Error("An error occurred while inserting the marks into the database");
        }
    }
}
