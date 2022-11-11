import { QueryResult } from "pg";
import {connection} from "../database/db.js";

async function getAllMovies(){
    return connection.query(
        `SELECT movies.name AS name, 
            genres.genre AS genre, 
            plataforms.name AS plataform 
            FROM movies 
            JOIN genres 
            ON movies.id = genres."movieId" 
            LEFT JOIN "moviePlataform" 
            ON "moviePlataform"."movieId" = movies.id 
            LEFT JOIN plataforms 
            ON plataforms.id = "moviePlataform"."plataformId";`
    );
}

async function getMovie(movieId: number){
    return connection.query(
        `SELECT movies.name AS name, 
        genres.genre AS genre, 
        plataforms.name AS plataform 
        FROM movies 
        JOIN genres 
        ON movies.id = genres."movieId" 
        LEFT JOIN "moviePlataform" 
        ON "moviePlataform"."movieId" = movies.id 
        LEFT JOIN plataforms 
        ON plataforms.id = "moviePlataform"."plataformId"
        WHERE movies.id = $1;`,
        [movieId]
    );
}

async function getMoviesByPlataform(plataformId: number){
    return connection.query(
        `SELECT movies.name AS name,
        genres.genre AS genre
        FROM plataforms
        JOIN "moviePlataform"
        ON plataforms.id = "moviePlataform"."plataformId"
        JOIN movies
        ON "moviePlataform"."movieId" = movies.id
		JOIN genres 
		ON genres."movieId" = movies.id
        WHERE plataforms.id = $1;`,
        [plataformId]
    );
}

async function postMovie(name: string, genre: string, plataform: string){
    const plataformId: Promise<QueryResult<Number>> = (await connection.query(
        `SELECT id 
        FROM plataforms
        WHERE name = $1;`,
        [plataform]
    )).rows[0].id;

    const movieId: Promise<QueryResult<Number>> = (await connection.query(
        `INSERT INTO movies ("name")
        VALUES ($1)
        RETURNING id;`,
        [name]
    )).rows[0].id;

    await connection.query(
        `INSERT INTO genres ("movieId", "genre")
        VALUES ($1, $2);`,
        [movieId, genre]
    );

    return connection.query(
        `INSERT INTO "moviePlataform" ("movieId", "plataformId")
        VALUES ($1, $2);`,
        [movieId, plataformId]
    );
}

async function getWishlist(userId: number){
    return connection.query(`
        SELECT movies.name AS name, 
        genres.genre AS genre, 
        plataforms.name AS plataform 
        FROM movies 
        JOIN genres 
        ON movies.id = genres."movieId" 
        LEFT JOIN "moviePlataform" 
        ON "moviePlataform"."movieId" = movies.id 
        LEFT JOIN plataforms 
        ON plataforms.id = "moviePlataform"."plataformId"
        LEFT JOIN "movieStatus"
        ON "movieStatus"."movieId" = movies.id
        WHERE "movieStatus"."userId" = $1;`,
        [userId]
    );
}

async function addMovieToWishlist(userId: number, movieId: number){
    return connection.query(`
        INSERT INTO "movieStatus" ("userId", "movieId")
        VALUES ($1, $2);`,
        [userId, movieId]
        );
}

async function watchedNumber(userId: number, movieId: number){
    return connection.query(
        `SELECT "watchCount"
        FROM "movieStatus"
        WHERE "userId" = $1 
        AND "movieId" = $2;`,
        [userId, movieId]
    );
}

async function changeStatus(userId: number, movieId: number, status: string, rating: number, comments: string, watchCount: number){
    return connection.query(`
        UPDATE "movieStatus" SET "comments" = $1, "rating" = $2, status = $3, "watchCount" = $4 WHERE "userId" = $5 AND "movieId" = $6`,
        [comments, rating, status, watchCount, userId, movieId]
        );
}

async function deleteReview(userId: number, movieId: number){
    return connection.query(
        `DELETE FROM "movieStatus"
        WHERE "userId" = $1 AND "movieId" = $2`,
        [userId, movieId]
    );
}

export {
    getAllMovies, 
    getMovie, 
    getMoviesByPlataform,
    postMovie,
    getWishlist,
    addMovieToWishlist,
    changeStatus,
    deleteReview,
    watchedNumber
};