import { Request, Response } from "express";
import httpStatus from "http-status";
import {SignUp} from "../protocols/SignUp.js";
import {stripHtml} from "string-strip-html";
import {userSchema} from "../schemas/schemas.js";
import bcrypt from 'bcrypt';

async function signUpMiddleware(req: Request, res: Response, signUpData: SignUp){
    if(!signUpData.name || !signUpData.email ||  !signUpData.password || !signUpData.confirmPassword){
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const name: string = stripHtml(signUpData.name).result.trim();
    const email: string = stripHtml(signUpData.email).result.trim();
    const password: string = stripHtml(signUpData.password).result.trim();
    const confirmPassword: string = signUpData.confirmPassword;

    const validation = userSchema.validate({name, email, password, confirmPassword}, {abortEarly: false});

    if(validation.error){
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errors);
    }

    const hashPassword: string = bcrypt.hashSync(password, 10);

    res.locals.name = name;
    res.locals.email = email;
    res.locals.hashPassword = hashPassword;
}

export {
    signUpMiddleware,
}