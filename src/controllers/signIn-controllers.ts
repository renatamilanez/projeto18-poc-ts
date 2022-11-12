import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import {Request, Response} from "express";
import { Login } from "../protocols/Login";
import httpStatus from "http-status";
import * as signInRepository from "../repositories/signIn-repository.js";
import {signInMiddleware} from "../middlewares/signIn-middleware.js";

async function signIn(req: Request, res: Response){
    const loginData = req.body as Login;

    await signInMiddleware(req, res, loginData);

    const email: string = res.locals.email;
    const password: string = res.locals.password;

    try {
        const userExist = await signInRepository.hasUser(email);

        if(userExist.rows.length === 0){
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }

        const userPassword = await signInRepository.hasPassword(email);

        const isValid: boolean = bcrypt.compareSync(password, userPassword);

        if(!isValid){
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }

        const token: string = uuidv4();

        const result = await signInRepository.postUser(email, token);
        
        return res.status(httpStatus.OK).send({token});
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export {signIn};