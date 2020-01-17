'use strict'

// THE GAME
class Hangman {
  constructor(word) {
    this.word = word.toLowerCase().split('')
    // Create a better algo for number of guesses, maybe based on amount of unique characters the word contains
    this.remainingGuesses = Math.floor(this.word.length * 0.8)
    this.guessedLetters = []
    this.status = 'playing'
  }
  get statusMessage() {
    if (this.status === 'failed') {

      this.getStatusColor('.status', '--status-orange')
      return this.word.join('')

    } else if (this.status === 'playing') {

      if (this.remainingGuesses === 1) {
        this.getStatusColor('.status', '--alert-red')
        return `${this.remainingGuesses} guess left`
      } else {
        this.getStatusColor('.status', '--status-orange')
        return `${this.remainingGuesses} guesses left`
      }

    } else {
      this.getStatusColor('.status', '--status-green')
      return `Good job!`
    }
  }
  calculateStatus() {
    const finnished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')

    if (this.remainingGuesses === 0) {
      this.status = 'failed'
    } else if (finnished) {
      this.status = 'finnished'
    } else {
      this.status = 'playing'
    }
  }
  get puzzle() {
    let puzzle = ''

    this.word.forEach((letter) => {
      if (this.guessedLetters.includes(letter) || letter === ' ') {
        puzzle += letter
      } else {
        puzzle += '_'
      }
    })

    return puzzle
  }
  getGuess(guess) {
    if (this.remainingGuesses > 0) {
      guess = guess.toLowerCase()
      const isUnique = !this.guessedLetters.includes(guess)
      const isBadGuess = !this.word.includes(guess)

      if (isUnique) {
        this.guessedLetters.push(guess)
      }

      if (isUnique && isBadGuess) {
        this.remainingGuesses--
      }
    } else {
      return
    }

    this.calculateStatus()
  }
  getStatusColor(namedId, color) {
    document.querySelector(`${namedId}`).style.color = getComputedStyle(document.documentElement).getPropertyValue(color)
  }
} // THE GAME END



