/**
 * Test cases for the Marks creation service
 */
import { expect } from 'chai';
import sinon from 'sinon';
import { MarksService } from '../service/MarksService';
import { Repository } from 'typeorm';
import { Marks } from '../entity/Marks';

describe('MarksService', () => {
  let marksService: MarksService;
  let marksRepositoryMock: sinon.SinonStubbedInstance<Repository<Marks>>;

  beforeEach(() => {
    marksRepositoryMock = sinon.createStubInstance(Repository);
    marksService = new MarksService();
    marksService['marksRepository'] = marksRepositoryMock;
  });

  describe('createMarks', () => {
    it('should create marks and return the result', async () => {
      
      const mockMarks = new Marks();
      mockMarks.studentId = "1"
      mockMarks.subject = "English"
      mockMarks.marks = 89
      marksRepositoryMock.save.resolves(mockMarks);

      const result = await marksService.createMarks(mockMarks);

      sinon.assert.calledOnce(marksRepositoryMock.save);
      sinon.assert.calledWithExactly(marksRepositoryMock.save, mockMarks);
      expect(result).to.equal(mockMarks);
    });

    it('should handle errors during marks creation', async () => {
      const mockMarks = new Marks();
      mockMarks.studentId = "1"
      mockMarks.subject = "English"
      mockMarks.marks = 89
      const errorMessage = 'Database error';

      marksRepositoryMock.save.rejects(new Error(errorMessage));

      try {
        await marksService.createMarks(mockMarks);
        // The above line should throw an error, so this assertion should not be reached
        expect.fail('An error should have been thrown');
      } catch (error) {
        expect(error).to.be.an('error'); // Assert that an error was thrown
        expect(error.message).to.equal('An error occurred while inserting the marks into the database'); // Assert the error message
      }
    });
  });
});
