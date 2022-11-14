import httpStatus from "http-status";
import {Request, Response} from "express";
import {Movie} from "../protocols/Movie";
import {Review} from "../protocols/Review";
import {movieSchema, reviewSchema} from "../schemas/schemas.js";

async function newMovieMiddleware(req: Request, res: Response, newMovie: Movie){
    const name = newMovie.name;
    const plataform = newMovie.plataform;
    const genre = newMovie.genre;

    const validation = movieSchema.validate({name, plataform, genre}, {abortEarly: false});

    if(validation.error){
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errors);
    }
}

async function changeStatusMiddleware(
    req: Request, 
    res: Response,
    review: Review, 
    status: string){

    const validation = reviewSchema.validate({comments: review.comments, rating: review.rating, status}, {abortEarly: false});

    if(validation.error){
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errors);
    }
}

export {newMovieMiddleware, changeStatusMiddleware};