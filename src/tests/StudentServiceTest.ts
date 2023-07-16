/**
 * Test cases for the Student CRUD service
 */

import { expect } from 'chai';
import sinon from 'sinon';
import { StudentService } from '../service/StudentService';
import { Student } from '../entity/Student';
import { Repository, DeleteResult } from 'typeorm';
import { Marks } from '../entity/Marks';
import { Rank } from "../utils/Rank"

let studentService: StudentService;
let studentRepositoryMock: sinon.SinonStubbedInstance<Repository<Student>>;

beforeEach(() => {
    studentRepositoryMock = sinon.createStubInstance(Repository);
    studentService = new StudentService();
    studentService['studentRepository'] = studentRepositoryMock;
});

afterEach(() => {
    sinon.restore(); // Reset sinon mocks after each test case
});

describe('StudentService', () => {

    describe('getAllStudents', () => {

        it('should return an array of students', async () => {
            const student1 = new Student();
            const student2 = new Student();
            student1.name = "XYZ"
            student2.name = "ABC"
            const marksRelation = { relations: { marks: true } };
            const mockStudents = [student1, student2];
            const studentRepositoryMock: any = {
                find: sinon.stub().resolves(mockStudents),
            };
            const studentService = new StudentService();
            studentService['studentRepository'] = studentRepositoryMock;
            const result = await studentService.getAllStudents(marksRelation);
            sinon.assert.calledOnce(studentRepositoryMock.find);
            expect(result).to.be.an('array');
            expect(result.length).to.equal(mockStudents.length); // Compare with the length of mockStudents array
        });

        it('should throw an error when an exception occurs during database retrieval', async () => {
            const marksRelation = { relations: { marks: true } };
            const studentRepositoryMock: any = {
                find: sinon.stub().rejects(new Error('Database error')),
            };

            const studentService = new StudentService();
            studentService['studentRepository'] = studentRepositoryMock;

            try {
                await studentService.getAllStudents(marksRelation);
                // If the code reaches this point, the test should fail
                expect.fail('Expected an error to be thrown');
            } catch (error) {
                sinon.assert.calledOnce(studentRepositoryMock.find);
                expect(error.message).to.equal('An error occurred while fetching the students from the database');
            }
        });


    });

    describe('GetStudentById', () => {
        it('should return a student when the id exists', async () => {
            const id = 'student123';
            const marksRelation = { relations: { marks: true } };
            const student1 = new Student();
            student1.name = "XYZ"
            const mockStudent = { student1 };
            const studentRepositoryMock: any = {
                findOne: sinon.stub().resolves(mockStudent),
            };

            const studentService = new StudentService();
            studentService['studentRepository'] = studentRepositoryMock;

            const result = await studentService.getStudentById(id, marksRelation);

            sinon.assert.calledOnce(studentRepositoryMock.findOne);
            sinon.assert.calledWith(studentRepositoryMock.findOne, { where: { id }, ...marksRelation });
            expect(result).to.deep.equal(mockStudent);
        });

        it('should return null when the id does not exist', async () => {
            const id = 'student123';
            const marksRelation = { relations: { marks: true } };
            const studentRepositoryMock: any = {
                findOne: sinon.stub().resolves(null),
            };

            const studentService = new StudentService();
            studentService['studentRepository'] = studentRepositoryMock;

            const result = await studentService.getStudentById(id, marksRelation);

            sinon.assert.calledOnce(studentRepositoryMock.findOne);
            sinon.assert.calledWith(studentRepositoryMock.findOne, { where: { id }, ...marksRelation });
            expect(result).to.be.null;
        });

        it('should throw an error when an exception occurs during database retrieval', async () => {
            const id = 'student123';
            const marksRelation = { relations: { marks: true } };
            const studentRepositoryMock: any = {
                findOne: sinon.stub().rejects(new Error('Database error')),
            };

            const studentService = new StudentService();
            studentService['studentRepository'] = studentRepositoryMock;

            try {
                await studentService.getStudentById(id, marksRelation);
                // If the code reaches this point, the test should fail
                expect.fail('Expected an error to be thrown');
            } catch (error) {
                sinon.assert.calledOnce(studentRepositoryMock.findOne);
                sinon.assert.calledWith(studentRepositoryMock.findOne, { where: { id }, ...marksRelation });
                expect(error.message).to.equal('An error occurred while fetching the student from the database');
            }
        });

    });

    describe('createStudent', () => {
        it('should create a student and return the result', async () => {
            const student: Student = new Student();
            student.name = 'ABC';
            studentRepositoryMock.save.resolves(student); // Stub the save method to resolve with the student object
            const result = await studentService.createStudent(student);

            sinon.assert.calledOnce(studentRepositoryMock.save); // Assert that the save method was called once
            expect(result).to.equal(student); // Assert that the result matches the student object
        });

        it('should handle errors during student creation', async () => {
            const student: Student = new Student();
            student.name = 'XYZ';
            studentRepositoryMock.save.rejects(new Error('Database error')); // Stub the save method to reject with an error

            try {
                await studentService.createStudent(student);
                // The above line should throw an error, so this assertion should not be reached
                expect.fail('An error should have been thrown');
            } catch (error) {
                expect(error).to.be.an('error'); // Assert that an error was thrown
                expect(error.message).to.equal('An error occurred while creating the student in the database'); // Assert the error message
            }
        });

    });

    describe('updateStudent', () => {
        it('should update the student in the database', async () => {
            const id = 'student123';
            const name = 'XYZ';

            await studentService.updateStudent(id, name);
            sinon.assert.calledOnceWithExactly(studentRepositoryMock.update, { id }, { name });
        });

        it('should handle errors during student update', async () => {
            const id = 'student123';
            const name = 'ABC';
            const errorMessage = 'Database error';
            studentRepositoryMock.update.rejects(new Error(errorMessage));

            try {
                await studentService.updateStudent(id, name);
                // The above line should throw an error, so this assertion should not be reached
                expect.fail('An error should have been thrown');
            } catch (error) {
                expect(error).to.be.an('error'); // Assert that an error was thrown
                expect(error.message).to.equal('An error occurred while updating the student in the database'); // Assert the error message
            }
        });
    });

    describe('deleteStudent', () => {
        it('should delete the student and return the delete result', async () => {
            const id = 'student123';
            const deleteResult: DeleteResult = { affected: 1, raw: {} };

            studentRepositoryMock.delete.resolves(deleteResult); // Stub the delete method to resolve with the delete result

            const result = await studentService.deleteStudent(id);

            sinon.assert.calledOnceWithExactly(studentRepositoryMock.delete, { id }); // Assert that the delete method was called with the correct arguments
            expect(result).to.equal(deleteResult); // Assert that the result matches the delete result object
        });

        it('should handle errors during student deletion', async () => {
            const id = 'student123';

            studentRepositoryMock.delete.rejects(new Error('Database error')); // Stub the delete method to reject with an error

            try {
                await studentService.deleteStudent(id);
                // The above line should throw an error, so this assertion should not be reached
                expect.fail('An error should have been thrown');
            } catch (error) {
                expect(error).to.be.an('error'); // Assert that an error was thrown
                expect(error.message).to.equal('An error occurred while deleting the student from the database'); // Assert the error message
            }
        });
    });

    describe('getRank', () => {
        it('should return rank of all the students', async () => {

            const student1 = new Student();
            const student2 = new Student();
            student1.name = "XYZ"
            student2.name = "ABC"

            const student1_mark1 = new Marks();
            const student2_mark2 = new Marks();

            student1_mark1.subject = "English"
            student1_mark1.marks = 89

            student2_mark2.subject = "English"
            student2_mark2.marks = 99

            student1.marks = [student1_mark1]
            student2.marks = [student2_mark2]

            const rank1 = new Rank("ABC", 99, 1);
            const rank2 = new Rank("XYZ", 89, 2);

            const arrayRank: Rank[] = []
            arrayRank.push(rank1);
            arrayRank.push(rank2);

            const marksRelation = { relations: { marks: true } };
            const mockStudents = [student1, student2];

            const studentRepositoryMock: any = {
                find: sinon.stub().resolves(mockStudents),
            };

            const studentService = new StudentService();
            studentService['studentRepository'] = studentRepositoryMock;
            const result = await studentService.getRank(marksRelation);

            sinon.assert.calledOnce(studentRepositoryMock.find);
            expect(result).to.be.an('array');
            expect(result).to.deep.equal(arrayRank); 
        });
    });


});