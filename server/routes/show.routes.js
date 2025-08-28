import express from "express"
import { Router } from "express"
import { addShow, getNowPlayingMovies, getShow, getShows } from "../controllers/show.controller.js"
import { protectAdmin } from "../middleware/auth.js"

const showRouter = Router()

showRouter.get('/now-playing',protectAdmin, getNowPlayingMovies)
showRouter.post('/add',protectAdmin, addShow)
showRouter.get('/all',getShows)
showRouter.get('/:movieId',getShow)

export default showRouter