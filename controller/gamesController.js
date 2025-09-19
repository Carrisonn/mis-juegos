import { Op } from 'sequelize'
import GameModel from '../model/GameModel.js'

async function getGames (req, res) {
  try {
    const games = await GameModel.findAll()
    res.status(200).json({ games })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error interno del servidor' })
  }
}

async function searchGame (req, res) {
  try {
    const { game } = req.params
    if (!game) return res.status(400).json({ msg: 'No hay juego que buscar' })
    const games = await GameModel.findAll({ where: { game: { [Op.like]: `%${game}%` } } })
    if (!games.length) return res.status(404).json({ msg: `El juego ${game} no existe` })
    res.status(200).json({ games })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error interno del servidor' })
  }
}

async function createGame (req, res) {
  try {
    const { game, state } = req.body
    if (!game || !state) return res.status(400).json({ msg: 'Faltan datos en el formulario' })
    const gameExist = await GameModel.findOne({ where: { game } })
    if (gameExist) return res.status(409).json({ msg: `El juego ${game} ya esta en la lista` })
    await GameModel.create({ game, state })
    const games = await GameModel.findAll()
    res.status(200).json({ games, msg: `${game} agregado a la lista 🎉` })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error interno del servidor' })
  }
}

async function deleteGame (req, res) {
  try {
    const { id } = req.params
    if (!id) return res.status(400).json({ msg: 'No hay juego que borrar' })
    await GameModel.destroy({ where: { id } })
    const games = await GameModel.findAll()
    res.status(200).json({ games, msg: 'Juego borrado de la lista' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error interno del servidor' })
  }
}

async function editGame (req, res) {
  try {
    const { id, game, state } = req.body
    if (!id || !game || !state) return res.status(400).json({ msg: 'Falta información' })
    const [updatedGame] = await GameModel.update({ game, state }, { where: { id } })
    if (!updatedGame) return res.status(404).json({ msg: 'El juego no se ha podido actualizar' })
    const games = await GameModel.findAll()
    res.status(200).json({ games, msg: 'Juego actualizado 🎉' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error interno del servidor' })
  }
}

export {
  getGames,
  searchGame,
  createGame,
  deleteGame,
  editGame
}
