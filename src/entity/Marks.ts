/**
 * Represents student marks for a subject.
 * Stores id, student id, subject, and marks.
 * Includes a Many-to-One relationship with the Student entity.
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Student } from "./Student"

@Entity()
export class Marks {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    studentId: string

    @Column()
    subject: string

    @Column()
    marks: number

    @ManyToOne(() => Student, (student) => student.marks, {
        onDelete: 'CASCADE'
    })
    student: Student

}
