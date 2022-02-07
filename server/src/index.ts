import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as cors from 'cors'
import * as session from 'express-session'
import { UserController } from "./controller/UserController";
import { AdminRoutes, Routes } from "./routes";
createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(express.json());
    app.use(cors({
        origin: 'http://localhost:3000'
    }))
    app.use(session({
        secret: 'adsfdghsgeartehetrt',
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: 'none',
            maxAge: 1000 * 60 * 10,
            httpOnly: true,
        }
    }))
    const userController = new UserController();
    app.post('/login', userController.login);
    app.post('/register', userController.register);

    app.use((request, response, next) => {
        const user = (request.session as any).user;
        if (!user) {
            response.sendStatus(401);
            return;
        }
        next();
    });

    app.post('/logout', userController.logout);
    for (let route of Routes) {
        app[route.method](route.url, route.handler);
    }

    app.use((request, response, next) => {
        const user = (request.session as any).user;
        if (user.category !== 'admin') {
            response.sendStatus(403);
            return;
        }
        next();
    });
    for (let route of AdminRoutes) {
        app[route.method](route.url, route.handler);
    }
    app.listen(8000, () => {
        console.log('Server is listening')
    })

}).catch(error => console.log(error));
