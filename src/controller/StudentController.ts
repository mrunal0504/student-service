/**
 * Controller layer for the Student entity.
 */

import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';
import { StudentService } from "../service/StudentService";
import { Student } from "../entity/Student";
import { validationFailedResponse } from "../utils/validate";
import logger from "../utils/logger"
import _ from "lodash"

const marksRelation = {
    relations: {
        marks: true,
    },
}

export class StudentController {
    private studentService = new StudentService();

    //Function to retrieve all students from the student table
    async getStudents(request: Request, response: Response, next: NextFunction) {
        try {
            const students = await this.studentService.getAllStudents(marksRelation);
            logger.info("Fetched student data from the database successfully")
            response.send(students);
        } catch (error) {
            logger.error("An error encountered while fetching the students data from the database" + error)
            response.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Function to retrieve a specific student from the student table
    async getStudentById(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        try {
            const student = await this.studentService.getStudentById(id, marksRelation);
            logger.debug("Fetched the student from the database with id :" + id)
            if (!student) {
                return response.send("Student with this id does not exist");
            }
            response.send(student);
        } catch (error) {
            logger.error("An error encountered while fetching the student from the database" + error)
            response.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Function to create a student in the student table
    async createStudent(request: Request, response: Response, next: NextFunction) {
        const errors: any = validationResult(request);
        if (!_.isEmpty(errors.errors)) {
            return validationFailedResponse(errors, response);
        }
        const { name } = request.body;
        const student = new Student();
        student.name = name;
        try {
            const result = await this.studentService.createStudent(student);
            logger.info("Inserted student data into the database successfully" + JSON.stringify(result))
            response.status(201).json(result);
        } catch (error) {
            logger.error("An error occurred while attempting to insert the student data into the database for student" + error)
            response.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Function to update a student in the student table
    async updateStudentById(request: Request, response: Response, next: NextFunction) {
        const errors: any = validationResult(request);
        if (!_.isEmpty(errors.errors)) {
            return validationFailedResponse(errors, response);
        }
        const id = request.params.id;
        const { name } = request.body;

        try {
            const existingStudent = await this.studentService.getStudentById(id, marksRelation);
            if (!existingStudent || existingStudent === null) {
                return response.send("The student does not exist");
            }
            await this.studentService.updateStudent(id, name);
            logger.info("Updated student data in the database successfully");
            response.status(200).json({ id, name });
        } catch (error) {
            logger.error("An error occurred while attempting to update the student data in the database: " + error);
            response.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Function to delete a student in the student table
    async deleteStudentById(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;

        try {
            const existingStudent = await this.studentService.getStudentById(id, marksRelation);
            if (!existingStudent) {
                return response.send("The student does not exist");
            }
            await this.studentService.deleteStudent(id);
            logger.debug("The student with id : " + id + " has been removed successfully from the table")
            response.status(204).json({ message: 'The record has been deleted' });

        } catch (error) {
            logger.error("An error occurred while attempting to delete the student data from the database")
            response.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Function to get the ranklist of the students
    async getRankList(request: Request, response: Response, next: NextFunction) {
        try {
            const students = await this.studentService.getRank(marksRelation);
            response.send(students);
        }
        catch (error) {
            logger.error("An error occurred while attempting to fetch the data for student ranks ")
            response.status(500).json({ message: 'Internal Server Error' });
        }

    }
}
