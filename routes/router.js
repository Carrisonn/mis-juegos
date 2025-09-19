import express from 'express'
import { getGames, searchGame, createGame, deleteGame, editGame } from '../controller/gamesController.js'

const router = express.Router()

router.get('/api/games', getGames)
router.get('/api/search/:game', searchGame)
router.post('/api/create', createGame)
router.delete('/api/delete/:id', deleteGame)
router.put('/api/edit', editGame)

export default router
