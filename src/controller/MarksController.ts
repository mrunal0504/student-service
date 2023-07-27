/**
 * Controller layer for the Marks entity.
 */

import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';
import { MarksService } from "../service/MarksService";
import { validationFailedResponse } from "../utils/validate";
import logger from "../utils/logger";

export class MarksController {
  private marksService: MarksService;

  constructor() {
    this.marksService = new MarksService();
  }

  // Function to create marks in the marks table
  async createMarks(request: Request, response: Response, next: NextFunction) {
    const errors: any = validationResult(request);
    if (!errors.isEmpty()) {
      return validationFailedResponse(errors, response);
    }

    const { id, studentId, subject, marks } = request.body;
    logger.debug("The request received inside Marks Controller")
    const marksData = {
      id,
      studentId,
      subject,
      marks
    };
    try {
      const result = await this.marksService.createMarks(marksData);
      logger.info("Inserted marks of the student into the database successfully" + JSON.stringify(result))
      response.status(201).json(result);
    } catch (error) {
      logger.error("An error encountered while inserting the data into the database for marks : " + error);
      response.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
