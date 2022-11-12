import httpStatus from "http-status";
import {NextFunction, Request, Response} from "express";
import * as moviesRepository from "../repositories/movies-repository.js";
import {Movie} from "../protocols/Movie";
import {Review} from "../protocols/Review";
import {newMovieMiddleware, changeStatusMiddleware} from "../middlewares/movies-middleware.js";

async function getMovies(req: Request, res: Response) {
    try {
        const movies = (await moviesRepository.getAllMovies()).rows;

        return res.status(httpStatus.OK).send(movies);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function getMovieById(req: Request, res: Response){
    const movieId: number = Number(req.params.movieId);

    try {
        const movie: Movie = (await moviesRepository.getMovie(movieId)).rows[0];

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

async function postMovie(req: Request, res: Response, next: NextFunction){
    const newMovie = req.body as Movie;

    newMovieMiddleware(req, res, next, newMovie);

    try {
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

async function changeStatus(req: Request, res: Response, next: NextFunction){
    const userId: number = res.locals.userId;
    const movieId: number = Number(req.params.movieId);
    const review = req.body as Review;
    const status: string = 'Watched';

    changeStatusMiddleware(req, res, next, review, status);

    try {
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
    const userId: number = res.locals.userId;
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