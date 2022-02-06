import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {

    private userRepository = getRepository(User);

    public async login(request: Request, response: Response) {
        const user = await this.userRepository.findOne({
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
        response.json(user);
    }
    public async register(request: Request, response: Response) {
        let user = await this.userRepository.findOne({
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
        const insertResult = await this.userRepository.insert(request.body);
        const id = insertResult.identifiers[0].id;
        user = await this.userRepository.findOne(id);
        (request.session as any).user = user;
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
}