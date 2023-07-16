/* Defines the liveness and readiness endpoints */

import { Request, Response } from 'express'
import { AppDataSource } from "../data-source"
import { Student } from "../entity/Student"
import logger from '../utils/logger'

export class HealthController {

    //liveliness endpoint
    async healthCheck(_req: Request, res: Response) {
        res.sendStatus(200);
    }

    //readiness endpoint
    async readinessCheck(_req: Request, res: Response) {
        try {
            const repository = AppDataSource.getRepository(Student)
            await repository.query('SELECT 1')
            logger.info("Readiness check successful")
            res.sendStatus(200)
        } catch (error) {
            logger.info("Readiness check failed")
            logger.error("Failed while connecting to the database :" + error)
            res.sendStatus(500)
        }
    }
}
