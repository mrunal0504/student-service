/**
 * Models the response of the /ranklist endpoint
 */
export class Rank {
    constructor(public studentName: string, public totalMarks: number, public rank: number) {
    }
}


