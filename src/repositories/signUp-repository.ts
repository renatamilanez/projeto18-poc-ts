import {connection} from "../database/db.js";

async function hasUser(email: string){
    return connection.query(
        'SELECT email FROM users WHERE email = $1;',
        [email]
    );
}

async function postUser(name: string, email: string, hashPassword: string){
    return connection.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);',
        [name, email, hashPassword]
    );
}

export {hasUser, postUser};