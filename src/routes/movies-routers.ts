import express from "express";
import {getMovies, getMovieById, getMoviesByPlataform, postMovie, getWishlist, addMovieToWishlist, deleteMovie, changeStatus} from "../controllers/movie-controllers.js";
import {authMiddleware} from "../middlewares/auth-middleware.js";

const router = express.Router();

router.get('/movies', authMiddleware, getMovies);
router.get('/movies/:movieId', authMiddleware, getMovieById);
router.get('/movies/plataform/:plataformId', authMiddleware, getMoviesByPlataform);
router.post('/movies', authMiddleware, postMovie);
router.get('/wishlist', authMiddleware, getWishlist)
router.post('/wishlist/:movieId', authMiddleware, addMovieToWishlist);
router.put('/wishlist/:movieId', authMiddleware, changeStatus);
router.delete('/wishlist/:movieId', authMiddleware, deleteMovie);

export default router;