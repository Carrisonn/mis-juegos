import Games from './classes/Games.js'
import UI from './classes/UI.js'
import { $searchform, $searchInput, $createForm, $createInput, $createSelect, $gameResults } from './DOMelements.js'

window.addEventListener('load', () => {
  $searchform.reset()
  $createForm.reset()
})

const games = new Games()
let isEditing = false
let isEditingID = null

function handleSearch (event) {
  event.preventDefault()
  const game = $searchInput.value.trim()
  const isValidInfo = game !== ''
  if (isValidInfo) games.searchGame(game)
  $searchform.reset()
}

function handleSubmit (event) {
  event.preventDefault()
  const game = $createInput.value.replace(/^\w/, char => char.toUpperCase()).trim()
  const state = $createSelect.value
  const isValidInfo = game !== '' && state !== ''
  if (isEditing && isValidInfo) games.editGame(isEditingID, game, state)
  if (isValidInfo && !isEditing) games.createGame(game, state)
  isEditing = false
  isEditingID = null
  $createForm.reset()
}

function handleButtonsListeners (event) {
  const id = event.target.dataset.id
  if (!id) return
  const isDeleteButton = event.target.classList.contains('delete')
  const isEditButton = event.target.classList.contains('edit')
  if (isDeleteButton) {
    games.deleteGame(id)
    return handleScroll()
  }
  if (isEditButton) {
    isEditingID = id
    isEditing = true
    const gameWrapper = $gameResults.querySelector(`.game-${id}`)
    const gameValues = {
      game: gameWrapper.children[0].textContent,
      state: gameWrapper.children[1].textContent
    }
    UI.isEditing(gameValues)
    handleScroll()
  }
}

function handleScroll () {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

$searchform.addEventListener('submit', handleSearch)
$createForm.addEventListener('submit', handleSubmit)
$gameResults.addEventListener('click', handleButtonsListeners)
