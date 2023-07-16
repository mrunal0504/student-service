/**
 * Sets up an Express server with defined routes and initializes the application's data source.
 * Configures middleware for parsing JSON bodies.
 * Registers routes and their corresponding controllers and actions.
 * Starts the server on port 3000.
 */

import express from 'express'
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes/routes"
import logger from "./utils/logger"
import { PORT } from '../src/utils/constants';

AppDataSource.initialize().then(async () => {

    // Creating express app 
    const app = express()

    // TODO : Add support for prometheus metrics

    app.use(bodyParser.json())

    // Register express routes from defined application routes 
    Routes.forEach(route => {
        (app as any)[route.method](route.route, route.validation ? route.validation : (req, res, next) => next(), (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
        })
    })

    // Starts the express server
    app.listen(PORT)
    logger.info(`Express server has started on port ${PORT}`)
}).catch(error => logger.error(error))
