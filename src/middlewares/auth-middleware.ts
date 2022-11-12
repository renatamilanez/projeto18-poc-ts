import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import {connection} from "../database/db.js";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token: string = req.headers.authorization?.replace("Bearer ", "");

    if(!token){
        return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    try {
        const hasSession = await connection.query(
            'SELECT token FROM sessions WHERE token = $1;',
            [token]
        );

        if(hasSession.rows.length === 0){
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }

        const userId = (await connection.query(
            'SELECT "userId" FROM sessions WHERE token = $1 ;',
            [token]
        )).rows[0].userId;

        const hasUser = await connection.query(
            'SELECT id FROM users WHERE id = $1;',
            [userId]
        );

        if(hasUser.rows.length === 0){
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }

        res.locals.userId = userId;
        res.locals.token = token;

        next();
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export {authMiddleware};