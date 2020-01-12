'use strict'

// Global variable - get rid of? How?
let game

// Dom elements to render
const elDOM = {
  puzzleEl: document.querySelector('#puzzle'),
  guessesEl: document.querySelector('.status')
}

// Render the game and DOM elements
const render = () => {
  elDOM.puzzleEl.textContent = game.puzzle
  elDOM.guessesEl.textContent = game.statusMessage
}

// Get game based on region
const getGame = async () => {
  const region = window.location.hash.substring(1)

  // Make sure the capitals does not contain any special characters
  if (region === 'all') {
    const worldPuzzle = await getWorld()
    game = new Hangman(worldPuzzle.capital
      .replace(/[/.'/]/g, '')
      .replace(/[/áåäö/]/g, 'a')
      .replace('ó', 'o')
      .replace('é', 'e')
      .replace('ñ', 'n')
      .replace('ú', 'u')
      .replace('í', 'i'))
    console.log(game.word)
  } else {
    const regionPuzzle = await getRegion(region)
    game = new Hangman(regionPuzzle.capital
      .replace(/[/.'/]/g, '')
      .replace(/[/áåäö/]/g, 'a')
      .replace('ó', 'o')
      .replace('é', 'e')
      .replace('ñ', 'n')
      .replace('ú', 'u')
      .replace('í', 'i'))
    console.log(game.word)
  }

  render()
}

window.addEventListener('load', getGame)

// DOM keyboard interaction
const lightUpKey = (e) => {
  const letter = document.getElementById(e.key)
  letter.classList.add('add-visibility')
}

const resetLetters = () => {
  // Make guessed letters display(mobile) or hide(desktop)
  document.querySelectorAll('.letter').forEach((letter) => {
    letter.style.color = 'var(--letter-color)'
    letter.classList.remove('add-visibility')
  })
}

const hideOrDisplayByClass = (className, display) => {
  const element = document.querySelector(className)
  element.style.display = display
}

// Desktop keypress guess - if other charachter than a-z or dash('-') - display alert box. 
window.addEventListener('keypress', (e) => {
  // const specialChar = [229, 228, 246]
  if (e.charCode >= 97 && e.charCode <= 122) {
    const guess = String.fromCharCode(e.charCode)
    game.getGuess(guess)
    lightUpKey(e)
    hideOrDisplayByClass('.alert-box', 'none')
  } else if (e.charCode === 13) {
    resetLetters()
    getGame()
  } else {
    hideOrDisplayByClass('.alert-box', 'inline-block')
  }

  render()
})

// Reset button 
document.querySelector('.reset-button').addEventListener('click', () => {
  const wordPuzzle = document.querySelector('#puzzle')

  // Activate animation of puzzle
  if (!wordPuzzle.classList.contains('bounceInDown')) {
    wordPuzzle.classList.add('bounceInDown')
  } else {
    wordPuzzle.classList.remove('bounceInDown')
    setTimeout(() => {
      wordPuzzle.classList.add('bounceInDown')
    }, 30)
  }

  resetLetters()

  // If alertbox is displaying - hide
  hideOrDisplayByClass('.alert-box', 'none')

  // Get new game
  getGame()
})

// Mobile touch guess
document.querySelectorAll('.letter').forEach((letter) => {
  letter.addEventListener('click', (e) => {
    const guess = e.target.id
    game.getGuess(guess)
    hideOrDisplayByClass('.alert-box', 'none')

    // Makes sure gussed letters stay hidden if light swith is used
    if (localStorage.getItem('theme') === 'theme-dark') {
      letter.style.color = 'var(--hide-letter)'
    } else {
      letter.style.color = 'var(--hide-letter)'
    }

    render()
  })
})

