import { DataTypes } from 'sequelize'
import DB from '../config/db.js'

const ChatModel = DB.define('games', {
  game: { type: DataTypes.STRING },
  state: { type: DataTypes.STRING }
})

export default ChatModel
