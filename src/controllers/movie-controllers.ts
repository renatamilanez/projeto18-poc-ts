import httpStatus from "http-status";
import {Request, Response} from "express";
import * as moviesRepository from "../repositories/movies-repository.js";
import {Movie} from "../protocols/Movie";
import {Review} from "../protocols/Review";
import {movieSchema, reviewSchema} from "../schemas/schemas.js";
import { QueryResult } from "pg";

async function getMovies(req: Request, res: Response){
    try {
        const movies: string[] = (await moviesRepository.getAllMovies()).rows;

        return res.status(httpStatus.OK).send(movies);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function getMovieById(req: Request, res: Response){
    const movieId: number = Number(req.params.movieId);

    try {
        const movie = (await moviesRepository.getMovie(movieId)).rows[0];

        return res.status(httpStatus.OK).send(movie);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function getMoviesByPlataform(req: Request, res: Response){
    const plataformId: number = Number(req.params.plataformId);

    try {
        const movies = (await moviesRepository.getMoviesByPlataform(plataformId)).rows;

        return res.status(httpStatus.OK).send(movies);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function postMovie(req: Request, res: Response){
    const newMovie = req.body as Movie;

    try {
        const validation = movieSchema.validate({newMovie}, {abortEarly: false});

        if(validation.error){
            const errors = validation.error.details.map(detail => detail.message);
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errors);
        }

        await moviesRepository.postMovie(newMovie.name, newMovie.genre, newMovie.plataform);

        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function getWishlist(req: Request, res: Response){
    const userId: number = res.locals.userId;

    try {
        const wishlist = (await moviesRepository.getWishlist(userId)).rows;

        return res.status(httpStatus.OK).send(wishlist)
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function addMovieToWishlist(req: Request, res: Response){
    const userId: number = res.locals.userId;
    const movieId: number = Number(req.params.movieId);

    try {
        const isMovieValid = await moviesRepository.isMovieValid(movieId);

        if(isMovieValid.rows.length === 0){
            return res.status(httpStatus.NOT_FOUND).send({
                message: "Movie ID doesn't exist"
            });
        }

        const hasAdded = await moviesRepository.hasAddedToWishlist(userId, movieId);

        if(hasAdded.rows.length > 0){
            return res.status(httpStatus.CONFLICT).send({
                message: "Movie already added to Wishlist"
            });
        }

        await moviesRepository.addMovieToWishlist(userId, movieId);

        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function changeStatus(req: Request, res: Response){
    const userId: number = res.locals.userId;
    const movieId: number = Number(req.params.movieId);
    const review = req.body as Review;
    const status: string = 'Watched';

    try {
        const validation = reviewSchema.validate({comments: review.comments, rating: review.rating, status}, {abortEarly: false});

        if(validation.error){
            const errors = validation.error.details.map(detail => detail.message);
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errors);
        }

        const isMovieValid = await moviesRepository.isMovieValid(movieId);

        if(isMovieValid.rows.length === 0){
            return res.status(httpStatus.NOT_FOUND).send({
                message: "Movie ID doesn't exist"
            });
        }
        
        let watchCount: number = 0;

        const hasAdded = await moviesRepository.hasAddedToWishlist(userId, movieId);

        if(hasAdded.rows.length === 0){
            watchCount += 1;
            await moviesRepository.addMovieWithReview(userId, movieId, status, review.rating, review.comments, watchCount);

            return res.sendStatus(httpStatus.CREATED);
        }

        watchCount = (await moviesRepository.watchedNumber(userId, movieId)).rows[0].watchCount;

        watchCount += 1;

        await moviesRepository.changeStatus(userId, movieId, status, review.rating, review.comments, watchCount);

        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function deleteMovie(req: Request, res: Response){
    const userId = res.locals.userId;
    const movieId: number = Number(req.params.movieId);

    try {
        await moviesRepository.deleteReview(userId, movieId);

        return res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export {
    getMovies,
    getMovieById,
    getMoviesByPlataform,
    postMovie, 
    getWishlist,
    addMovieToWishlist,
    changeStatus, 
    deleteMovie
};