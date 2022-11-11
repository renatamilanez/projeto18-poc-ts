import { QueryResult } from "pg";
import {connection} from "../database/db.js";

//rota get /movies
async function getAllMovies(){
    return connection.query(
        `SELECT movies.name AS name,
        genres.genre AS genre,
        plataforms.name AS plataform,
        FROM movies
        JOIN genres
        ON movies."id" = genres."movieId"
        JOIN "moviePlataform"
        ON movies."id" = "moviePlataform"."movieId"
        JOIN plataforms
        ON "moviePlataform"."id" = plataforms."id";
        `
    );
}

//rota get /movies/:movieId
async function getMovie(movieId: number): Promise<QueryResult<String>> {
    return connection.query(
        `SELECT movies.name AS name,
        genres.genre AS genre,
        plataforms.name AS plataform,
        FROM movies
        JOIN genres
        ON movies."id" = genres."movieId"
        JOIN "moviePlataform"
        ON movies."id" = "moviePlataform"."movieId"
        JOIN plataforms
        ON "moviePlataform"."id" = plataforms."id"
        WHERE movie.id = $1;`,
        [movieId]
    );
}

//rota get /movies/:plataformId
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

//rota post /movies recebendo name, genre e plataform pelo body
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

export {
    getAllMovies, 
    getMovie, 
    getMoviesByPlataform,
    postMovie,
};