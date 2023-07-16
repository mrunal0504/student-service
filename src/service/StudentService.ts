/**
 * Service layer for the Student entity that handles all the database operations using TypeORM.
 */
import { AppDataSource } from "../data-source"
import { Student } from "../entity/Student"
import { Rank } from "../utils/Rank"
import { Marks } from "../entity/Marks"
import logger from "../utils/logger"

export class StudentService {
    private studentRepository = AppDataSource.getRepository(Student)

    async getAllStudents(marksRelation) {
        try {
            logger.info("The request received in the student service for fetching the students")
            return await this.studentRepository.find({ ...marksRelation })
        } catch (error) {
            logger.error(error)
            throw new Error("An error occurred while fetching the students from the database")
        }
    }

    async getStudentById(id: string, marksRelation) {
        try {
            logger.info("The request received in the student service for fetching a specific student")
            return await this.studentRepository.findOne({ where: { id }, ...marksRelation })
        } catch (error) {
            logger.error(error)
            throw new Error("An error occurred while fetching the student from the database")
        }
    }

    async createStudent(student: Student) {
        try {
            logger.info("The request received in the student service for creating a student")
            return await this.studentRepository.save(student)
        } catch (error) {
            logger.error(error)
            throw new Error("An error occurred while creating the student in the database")
        }
    }

    async updateStudent(id: string, name: string) {
        try {
            logger.info("The request received in the student service for updating the student data")
            await this.studentRepository.update({ id }, { name })
        } catch (error) {
            logger.error(error)
            throw new Error("An error occurred while updating the student in the database")
        }
    }

    async deleteStudent(id: string) {
        try {
            logger.info("The request received in the student service for deleting the student data")
            return await this.studentRepository.delete({ id })
        } catch (error) {
            logger.error(error)
            throw new Error("An error occurred while deleting the student from the database")
        }
    }

    async getRank(marksRelation) {
        try {
            // Fetch students and calculate ranks
            const students = await this.studentRepository.find({ ...marksRelation })
            logger.info("The request received in the student service for fetching the students to get the rank")
            students.sort((a, b) => calculateTotalMarks(b.marks) - calculateTotalMarks(a.marks))
            const myArray: Rank[] = []
            students.forEach((student, index) => {
                logger.debug(
                    `Rank: ${index + 1}, Name: ${student.name}, Total Marks: ${calculateTotalMarks(student.marks)}`
                )
                const rank = new Rank(student.name, calculateTotalMarks(student.marks), index + 1)
                myArray.push(rank)
            })

            //Function to calculate total marks of student
            function calculateTotalMarks(marks: Marks[]): number {
                return marks.reduce((total, mark) => total + mark.marks, 0)
            }
            return myArray
        } catch (error) {
            logger.error("An error encountered while getting the rank list from the database ")
        }
    }

}
