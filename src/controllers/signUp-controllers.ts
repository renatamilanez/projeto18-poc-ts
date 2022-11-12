import { stripHtml } from "string-strip-html";
import {userSchema} from "../schemas/schemas.js";
import bcrypt from 'bcrypt';
import * as signUpRepository from "../repositories/signUp-repository.js";
import { SignUp } from "../protocols/SignUp.js";
import {Request, Response} from "express";
import httpStatus from "http-status";

async function signUp(req: Request, res: Response){
    const signUpData = req.body as SignUp;
    const name: string = stripHtml(signUpData.name).result.trim();
    const email: string = stripHtml(signUpData.email).result.trim();
    const password: string = stripHtml(signUpData.password).result.trim();
    const confirmPassword: string = signUpData.confirmPassword;

    const hashPassword: string = bcrypt.hashSync(password, 10);

    try {
        const validation = userSchema.validate({name, email, password, confirmPassword}, {abortEarly: false});

        if(validation.error){
            const errors = validation.error.details.map(detail => detail.message);
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errors);
        }

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