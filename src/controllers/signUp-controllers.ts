import * as signUpRepository from "../repositories/signUp-repository.js";
import { SignUp } from "../protocols/SignUp.js";
import {NextFunction, Request, Response} from "express";
import httpStatus from "http-status";
import {signUpMiddleware} from "../middlewares/signUp-middleware.js";

async function signUp(req: Request, res: Response, next: NextFunction){
    const signUpData = req.body as SignUp;

    await signUpMiddleware(req, res, signUpData);

    const name: string = res.locals.name;
    const email: string = res.locals.email;
    const hashPassword: string = res.locals.hashPassword;

    try {
        const duplicate = await signUpRepository.hasUser(email);
        
        if(duplicate.rows.length > 0){
            return res.sendStatus(httpStatus.CONFLICT);
        }

        await signUpRepository.postUser(name, email, hashPassword);

        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export {signUp};