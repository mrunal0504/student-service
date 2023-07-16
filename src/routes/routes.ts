/* Defines routes for student operations: */
import { StudentController } from "../controller/StudentController"
import { MarksController } from "../controller/MarksController"
import { HealthController } from "../controller/HealthController"
import { body } from 'express-validator'

export const Routes = [{
    method: "get",
    route: "/studentapp/v1/students",
    controller: StudentController,
    action: "getStudents",
}, {
    method: "get",
    route: "/studentapp/v1/student/:id",
    controller: StudentController,
    action: "getStudentById"
}, {
    method: "post",
    route: "/studentapp/v1/student",
    controller: StudentController,
    action: "createStudent",
    validation: [
        body('name').notEmpty().withMessage('name is required'),
    ],
},
{
    method: "put",
    route: "/studentapp/v1/student/:id",
    controller: StudentController,
    action: "updateStudentById",
    validation: [
        body('name').notEmpty().withMessage('name is required'),
    ],
},
{
    method: "delete",
    route: "/studentapp/v1/student/:id",
    controller: StudentController,
    action: "deleteStudentById"
},
{
    method: "get",
    route: "/studentapp/v1/ranklist",
    controller: StudentController,
    action: "getRankList"
},
{
    method: "post",
    route: "/studentapp/v1/marks",
    controller: MarksController,
    action: "createMarks",
    validation: [
        body('studentId').notEmpty().withMessage('student id field is required'),
        body('subject').notEmpty().withMessage('subject field is required'),
        body('marks')
            .notEmpty().withMessage('marks field is required')
            .custom((value) => value >= 0).withMessage('marks field cannot have negative values')
            .isFloat({ min: 0, max: 100 }).withMessage('marks must be between 0 and 100'),
    ],
},
{
    method: 'get',
    route: '/studentapp/v1/health',
    controller: HealthController,
    action: 'healthCheck',
},
{
    method: 'get',
    route: '/studentapp/v1/ready',
    controller: HealthController,
    action: 'readinessCheck',
}
]