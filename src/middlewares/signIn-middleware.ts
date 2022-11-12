import { loginSchema } from "../schemas/schemas.js";
import {NextFunction, Request, Response} from "express";
import { Login } from "../protocols/Login";
import {stripHtml} from "string-strip-html";
import httpStatus from "http-status";


async function signInMiddleware(req: Request, res: Response, loginData: Login) {
    const email: string = stripHtml(loginData.email).result.trim();
    const password: string = stripHtml(loginData.password).result.trim();

    const validation = loginSchema.validate({email, password}, {abortEarly: false});

    if(validation.error){
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errors);
    }
    res.locals.email = email;
    res.locals.password = password;
}

export {
    signInMiddleware
}