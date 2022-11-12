import httpStatus from "http-status";
import {NextFunction, Request, Response} from "express";
import {Movie} from "../protocols/Movie";
import {Review} from "../protocols/Review";
import {movieSchema, reviewSchema} from "../schemas/schemas.js";

async function newMovieMiddleware(req: Request, res: Response, next: NextFunction, newMovie: Movie){
    const validation = movieSchema.validate({newMovie}, {abortEarly: false});

    if(validation.error){
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errors);
    }
    
    next();
}

async function changeStatusMiddleware(
    req: Request, 
    res: Response, 
    next: NextFunction, 
    review: Review, 
    status: string){

    const validation = reviewSchema.validate({comments: review.comments, rating: review.rating, status}, {abortEarly: false});

    if(validation.error){
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errors);
    }

    next();
}

export {newMovieMiddleware, changeStatusMiddleware};