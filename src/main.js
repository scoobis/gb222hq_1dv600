
console.log('\x1b[35m', 'Welcome to the hangman project')
console.log('');
let words = ['what', 'should', 'mouse']
let userWord = []
let life = 7
let wrongLetters = ''
let userName = 'Guest123'

gameMenu()


/**
 * The menu, satart or quit the application
 *
 */
function gameMenu() {


    let word = setup()
    userWord = []
    life = 7
    wrongLetters = ''

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })
    console.log('\x1b[33m', 'Main menu')
    readline.question(`${'\x1b[36m'}Type: Play, Quit or Name: `, (option) => {
      // If player want to start game
      if (option == 'Play') {
        readline.close()
        play(word)
      } else if (option == 'Name') {
        readline.close()
        setUserName()
      } else if (option == 'Quit') {
        // Quiting the application
        readline.close()
        quit()
      } else {
        // misspelling
        readline.close()
        console.log('\x1b[31m', 'Make sure you spell it as described!')
        gameMenu()
      }
    })
  }

  /**
   * Quiting the application if the user wants to
   *
   */
  function quit() {

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })
    readline.question(`${'\x1b[36m'}Type ${'\x1b[31m'}Yes${'\x1b[36m'} or ${'\x1b[31m'} no ${'\x1b[36m'}`, (option) => {
      // Quits the application
      if (option == 'yes') {
        readline.close()
        // returns to main menu
      } else if (option == 'no') {
        readline.close()
        gameMenu()
        // misspelling
      } else {
        readline.close()
        console.log('\x1b[31m', 'Make sure you spell as described')
        quit()
      }
    })
  }

  /**
   * The main application. This is where evrything happens
   *
   * @param {String} word - The word to be guessed
   */
  function play(word) {

    //new random word
    if (userWord.length == 0) {
    createuserWord(word)
    }

    //has the player won or lost?
    if (checkState()) {
      return
    }
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })

    console.log('\x1b[36m' + 'Your word is: ' + userWord)
    console.log('life: ' + life + '/7')
    console.log('Your wrong letters: ' + wrongLetters)
    console.log('')
    console.log('\x1b[35m', 'Type Menu to get back to menu')
    readline.question(`${'\x1b[36m'}Type a lowercase letter: `, (letter) => {
      if (letter == 'Menu') {
        readline.close()
        gameMenu()
        // Checking for misspelling
      } else if (letter.length !== 1) {
       readline.close()
       console.log('\x1b[31m', 'Make sure you provide only one letter')
       console.log('')
       play(word)
       // This is the main senario!
       // checkLetter will call this function when it is executed
     } else {
       readline.close()
       checkLetter(letter, word)
     }
    })
  }

  /**
   * Creating the array to give feedback to the user
   *
   * @param {String} word - the word to be guessed
   */
  function createuserWord(word) {
    for (let i = 0; i < word.length; i++) {
      userWord[i] = '_'
    }
  }

  /**
   * See if the letter is matching any of the characters in the word
   *
   * @param {*} letter - Letter that the user guessed
   * @param {*} word - the word to be guessed
   */
  function checkLetter(letter, word) {
    for(let i = 0; i< word.length; i++) {
      if (word.charAt(i) == letter) {
        userWord[i] = letter
        play(word)
        return
      }
    }
    // if the letter is not in the word and adding the letter to a list of wrong letters
    wrongLetters += letter + ' '
    life--
   console.log('\x1b[31m', 'Wrong letter, guess again!')
   play(word)
  }

  /**
   * Checking if the player lost or won
   *
   * @returns - true if the game is over
   */
  function checkState() {
    // if player lost
    if (life == 0) {
      console.log('\x1b[31m', 'You got hanged')
      gameMenu()
      return true
    }
    // checking if the user still got letters to fill
    for (let i = 0; i < userWord.length; i++) {
      if (userWord[i] == '_') {
        return
      }
    }
    // will be executed if prev loop when thru
    console.log('\x1b[32m', 'You won!')
    gameMenu()
    return true
  }

  /**
   * Selecting a random word
   *
   * @returns - the word that the user will guess
   */
  function setup() {
    // picking random nr to be picked from the array of words
let rand = Math.random() * words.length;
rand = Math.floor(rand)
let word = words[rand];
return word
  }

  function highScore() {
    let LocalStorage = require('node-localstorage').LocalStorage
    localStorage = new LocalStorage('./scratch')
    localStorage.setItem('player1', userName)
    console.log(localStorage.getItem('player1'))
  }

  function setUserName() {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })
    
    readline.question(`${'\033[33m'}Type a username, or Menu to get back to main menu: `, (name) => {
      console.log('\033[32m', 'Your new username is ' + name)
      userName = name
      setTimeout(() => {
        gameMenu()
      }, 1000);
      readline.close()
    })
  }

