/**
 * Represents a student.
 * Stores the student's Id and name.
 * Includes a One-to-Many relationship with the Marks entity.
 */

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Marks } from "./Marks"

@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @OneToMany(() => Marks, (marks) => marks.student)
    marks: Marks[]

}
