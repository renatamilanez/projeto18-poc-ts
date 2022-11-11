import {connection} from "../database/db.js";

async function hasUser(email: string){
    return connection.query(
        'SELECT email FROM users WHERE email = $1',
        [email]
    );
}

async function hasPassword(email: string){
    const userPassword: string = (await connection.query(
        'SELECT password FROM users WHERE email = $1',
        [email]
    )).rows[0].password;

    return userPassword;
}

async function postUser(email: string, token: string){
    const userId: number = (await connection.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
    )).rows[0].id;

    return await connection.query(
        'INSERT INTO sessions ("userId", token) VALUES ($1, $2)',
        [userId, token]
    );
}

export {hasUser, hasPassword, postUser};