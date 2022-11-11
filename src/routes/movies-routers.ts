import express from "express";
import {getMovies, getMovieById, getMoviesByPlataform, postMovie, updateMovie, deleteMovie} from "../controllers/movie-controllers"

const router = express.Router();

router.get('/movies', getMovies);
router.get('/movies/:movieId', getMovieById);
router.get('/movies/:plataformId', getMoviesByPlataform);
router.post('/movies/:movieId', postMovie);
router.put('/movies', updateMovie);
router.delete('/movies', deleteMovie);

export default router;