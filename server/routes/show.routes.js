import express from "express"
import { Router } from "express"
import { addShow, getNowPlayingMovies } from "../controllers/show.controller.js"

const showRouter = Router()

showRouter.get('/now-playing', getNowPlayingMovies)
showRouter.post('/add', addShow)

export default showRouter