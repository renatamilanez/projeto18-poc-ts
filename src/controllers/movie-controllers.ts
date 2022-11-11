import httpStatus from "http-status";
import {Request, Response} from "express";
import { QueryResult } from "pg";
import * as moviesRepository from "../repositories/movies-repository";

async function getMovies(req: Request, res: Response){
    try {
        const movies: string[] = (await moviesRepository.getAllMovies()).rows;

        return res.status(httpStatus.OK).send(movies);
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function getMovieById(req: Request, res: Response){
    const movieId: number = Number(req.params.movieId);

    try {
        const movie = (await moviesRepository.getMovie(movieId)).rows[0];

        return res.status(httpStatus.OK).send(movie);
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function getMoviesByPlataform(req: Request, res: Response){
    const plataformId: number = Number(req.params.plataformId);

    try {
        const movies = (await moviesRepository.getMoviesByPlataform(plataformId)).rows;

        return res.status(httpStatus.OK).send(movies);
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function postMovie(req: Request, res: Response){
    try {
        
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function updateMovie(req: Request, res: Response){
    try {
        
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function deleteMovie(req: Request, res: Response){
    try {
        
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export {
    getMovies,
    getMovieById,
    getMoviesByPlataform,
    postMovie, 
    updateMovie, 
    deleteMovie
};