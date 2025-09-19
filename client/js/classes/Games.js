import UI from './UI.js'

class Games {
  constructor () {
    this.getGames()
  }

  async getGames () {
    try {
      const url = '/api/games'
      const response = await fetch(url)
      const data = await response.json()
      if (!response.ok) return UI.feedbackMessage(data.msg, 'error')
      UI.renderGames(data.games)
    } catch (error) {
      console.log(error)
    }
  }

  async searchGame (game) {
    try {
      const url = `/api/search/${game}`
      const response = await fetch(url)
      const data = await response.json()
      if (!response.ok) return UI.feedbackMessage(data.msg, 'error')
      UI.renderGames(data.games)
    } catch (error) {
      console.log(error)
    }
  }

  async createGame (game, state) {
    const url = '/api/create'
    const POST_CONFIG = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game, state })
    }
    try {
      const response = await fetch(url, POST_CONFIG)
      const data = await response.json()
      if (!response.ok) return UI.feedbackMessage(data.msg, 'error')
      UI.renderGames(data.games)
      UI.feedbackMessage(data.msg)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteGame (id) {
    try {
      const url = `/api/delete/${id}`
      const response = await fetch(url, { method: 'DELETE' })
      const data = await response.json()
      if (!response.ok) return UI.feedbackMessage(data.msg, 'error')
      UI.renderGames(data.games)
      UI.feedbackMessage(data.msg)
    } catch (error) {
      console.log(error)
    }
  }

  async editGame (id, game, state) {
    const url = '/api/edit'
    const PUT_CONFIG = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, game, state })
    }
    try {
      const response = await fetch(url, PUT_CONFIG)
      const data = await response.json()
      if (!response.ok) return UI.feedbackMessage(data.msg, 'error')
      UI.renderGames(data.games)
      UI.feedbackMessage(data.msg)
    } catch (error) {
      console.log(error)
    }
  }
}

export default Games
