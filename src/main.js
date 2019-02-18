console.log('\x1b[35m', 'Welcome to the hangman project')
console.log('');
let words = ['what', 'should', 'mouse']
let userWord = []
let life = 7
let wrongLetters = ''
gameMenu()

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
    readline.question(`${'\x1b[36m'}Type: Play or Quit: `, (option) => {
      if (option == 'Play') {
        readline.close()
        play(word)
      } else if (option == 'Quit') {
        readline.close()
        quit()
      } else {
        readline.close()
        console.log('\x1b[31m', 'Make sure you spell it as described!')
        gameMenu()
      }
    })
  }

  function quit() {

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })
    readline.question(`${'\x1b[36m'}Type ${'\x1b[31m'}Yes${'\x1b[36m'} or ${'\x1b[31m'} no ${'\x1b[36m'}`, (option) => {
      if (option == 'yes') {
        readline.close()
      } else if (option == 'no') {
        readline.close()
        gameMenu()
      } else {
        readline.close()
        console.log('\x1b[31m', 'Make sure you spell as described')
        quit()
      }
    })
  }

  function play(word) {

    if (userWord.length == 0) {
    createuserWord(word)
    }

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
      } else if (letter.length !== 1) {
       readline.close()
       console.log('\x1b[31m', 'Make sure you provide only one letter')
       console.log('')
       play(word)
     } else {
       readline.close()
       checkLetter(letter, word)
     }
    })
  }

  function createuserWord(word) {
    for (let i = 0; i < word.length; i++) {
      userWord[i] = '_'
    }
  }

  function checkLetter(letter, word) {
    for(let i = 0; i< word.length; i++) {
      if (word.charAt(i) == letter) {
        userWord[i] = letter
        play(word)
        return
      }
    }
    wrongLetters += letter + ' '
    life--
   console.log('\x1b[31m', 'Wrong letter, guess again!')
   play(word)
  }

  function checkState() {
    if (life == 0) {
      console.log('\x1b[31m', 'You got hanged')
      gameMenu()
      return true
    }
    for (let i = 0; i < userWord.length; i++) {
      if (userWord[i] == '_') {
        return
      }
    }
    console.log('\x1b[32m', 'You won!')
    gameMenu()
    return true
  }

  function setup() {
let rand = Math.random() * words.length;
rand = Math.floor(rand)
let word = words[rand];
return word
  }

  function readCharacter() {

  }

  function highScore() {

  }

  function hangman() {
      
  }

