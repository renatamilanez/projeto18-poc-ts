import express from "express";
import {getMovies, getMovieById, getMoviesByPlataform, postMovie, getWishlist, addMovieToWishlist, deleteMovie, changeStatus} from "../controllers/movie-controllers.js";

const router = express.Router();

router.get('/movies', getMovies);
router.get('/movies/:movieId', getMovieById);
router.get('/movies/plataform/:plataformId', getMoviesByPlataform);
router.post('/movies', postMovie);
router.get('/wishlist', getWishlist)
router.post('/wishlist/:movieId', addMovieToWishlist);
router.put('/movies/:movieId', changeStatus);
router.delete('/movies/:movieId', deleteMovie);

export default router;