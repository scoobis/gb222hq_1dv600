
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
    console.log('\033[37m')
    console.log('--------------------------------------')
    console.log('------','\033[32m', '"play"','\033[33m', 'to start game','\033[37m','-------')
    console.log('------','\033[32m','"quit"','\033[33m','to to quit', '\033[37m', '----------')
    console.log('------','\033[32m','"name"', '\033[33m', 'to set username', '\033[37m', '-----')
    console.log('--------------------------------------')
    console.log('----------', '\x1b[35m', 'HANGMAN MENU', '\033[37m', '------------')
    console.log('--------------------------------------')
    readline.question(`${'\033[36m'}Input: ${'\033[37m'}`, (option) => {
      // If player want to start game
      if (option == 'play') {
        readline.close()
        play(word)
      } else if (option == 'name') {
        readline.close()
        setUserName()
      } else if (option == 'quit') {
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
    console.log('')
    console.log('------------------------------------')
    console.log('--------', '\033[32m', '"yes"', '\033[33m', 'or', '\033[32m', '"no"', '\033[37m', '---------')
    console.log('------------------------------------', '\033[36m')
    readline.question(`input: ${'\033[37m'}`, (option) => {
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

    // extra whitespace
    console.log('')

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })
    console.log('\033[37m')
    console.log('--------------------------------------')
    console.log('-----','\033[33m', 'your username:', '\033[36m', userName, '\033[37m', '-----')
    console.log('-----', '\033[33m', 'life:', '\033[36m', life + '/7', '\033[37m', '-------------------')
    console.log('----', '\033[32m', '"menu"', '\033[33m', 'to get back to menu', '\033[37m', '---')
    console.log('-----', '\033[33m', 'Your wrong letters: ', '\033[36m', wrongLetters, '\033[37m')
    console.log('-----', '\033[33m', 'Your word:', '\033[37m', userWord)
    console.log('--------------------------------------')
    readline.question(`${'\x1b[36m'}input: `, (letter) => {
      if (letter == 'menu') {
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
    console.log('')
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
      console.log('')
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
    console.log('')
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
    console.log('--------------------------------------')
    console.log('--------', '\033[33m', 'current username:', '\033[36m', userName, '\033[37m')
    console.log('----', '\033[33m', 'Type the username you want', '\033[37m', '----')
    console.log('----', '\033[32m', '"menu"', '\033[33m', 'to get back to menu', '\033[37m', '---')
    console.log('--------------------------------------', '\033[36m')
    readline.question(`input: ${'\033[37m'}`, (name) => {
      console.log('\033[33m', 'Your new username is ' + name)
      userName = name
      setTimeout(() => {
        gameMenu()
      }, 1000);
      readline.close()
    })
  }

