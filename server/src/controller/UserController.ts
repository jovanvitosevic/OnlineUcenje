import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {



    public async login(request: Request, response: Response) {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({
            where: {
                username: request.body.username,
                password: request.body.password
            }
        });
        if (!user) {
            response.status(400).json({
                error: 'No such user'
            });
            return;
        }
        (request.session as any).user = user;
        request.session.save(e => {
            if (e) {
                console.log(e);
            }
        });
        response.json(user);
    }
    public async register(request: Request, response: Response) {
        const userRepository = getRepository(User);
        let user = await userRepository.findOne({
            where: {
                username: request.body.username
            }
        });
        if (user) {
            response.status(400).json({
                error: 'User already exists'
            });
            return;
        }
        const insertResult = await userRepository.insert({
            ...request.body,
            category: 'user'
        });
        const id = insertResult.identifiers[0].id;
        user = await userRepository.findOne(id);
        (request.session as any).user = user;
        request.session.save(e => {
            if (e) {
                console.log(e);
            }
        });
        response.json(user);
    }

    public async logout(request: Request, response: Response) {
        (request.session as any).user = undefined;
        request.session.destroy(e => {
            if (e) {
                console.log(e);
            }
        });
        response.sendStatus(204);
    }

    public async check(request: Request, response: Response) {
        const user = (request.session as any).user;
        response.json(user)
    }
}