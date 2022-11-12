import { loginSchema } from "../schemas/schemas.js";
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import {Request, Response} from "express";
import { Login } from "../protocols/Login";
import {stripHtml} from "string-strip-html";
import httpStatus from "http-status";
import * as signInRepository from "../repositories/signIn-repository.js";
import { QueryResult } from "pg";

async function signIn(req: Request, res: Response){
    const loginData = req.body as Login;
    const email: string = stripHtml(loginData.email).result.trim();
     const password: string = stripHtml(loginData.password).result.trim();

    try {
        const validation = loginSchema.validate({email, password}, {abortEarly: false});

        if(validation.error){
            const errors = validation.error.details.map(detail => detail.message);
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errors);
        }

        const userExist = await signInRepository.hasUser(email);

        if(userExist.rows.length === 0){
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }

        const userPassword = await signInRepository.hasPassword(email);

        const isValid = bcrypt.compareSync(password, userPassword);

        if(!isValid){
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }

        const token = uuidv4();

        await signInRepository.postUser(email, token);
        
        return res.status(httpStatus.OK).send({token});
        
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export {signIn};