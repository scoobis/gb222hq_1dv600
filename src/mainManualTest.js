console.log('\x1b[35m', 'Welcome to the hangman project')
console.log('');
let word1 = ['mouse']
let word2 = ['spying']
let word3 = ['algorithms']
let userWord = []
let life = 8
let wrongLetters = ''
let userName = 'Guest123'
let difficulity = 1

let LocalStorage = require('node-localstorage').LocalStorage
    localStorage = new LocalStorage('./scratch')

    // setting value to undefined values
    checkIfUndefined()

gameMenu()


/**
 * The menu, satart or quit the application
 *
 */
function gameMenu() {


    let word = setup(difficulity)
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
    console.log('------','\033[32m','"highscore"', '\033[33m', 'to see hihscore', '\033[37m', '')
    console.log('------','\033[32m','"difficulty"', '\033[33m', 'to set difficulty', '\033[37m', '')
    console.log('--------------------------------------')
    console.log('----------', '\x1b[35m', 'HANGMAN MENU', '\033[37m', '------------')
    console.log('--------------------------------------')
    readline.question(`${'\033[36m'}Input: ${'\033[37m'}`, (option) => {
      // If player want to start game
      if (option === 'play') {
        readline.close()
        play(word)
      } else if (option === 'name') {
        readline.close()
        setUserName()
      } else if (option === 'quit') {
        // Quiting the application
        readline.close()
        quit()
      } else if (option === 'highscore') {
        readline.close()
        getHighscore()
      } else if (option === 'difficulty') {
        readline.close()
        setDifficulty()
      } else  {
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
    userWord = createuserWord(word)
    }

    //has the player won or lost?
    if (checkState(life, userWord)) {
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
    return userWord
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
   return 'Wrong letter, guess again!';
  }

  /**
   * Checking if the player lost or won
   *
   * @returns - true if the game is over
   */
  function checkState(life, userWord) {
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
        return false
      }
    }
    // will be executed if prev loop when thru
    console.log('')
    console.log('\x1b[32m', 'You won!')
    highScore()
    gameMenu()
    return true
  }

  /**
   * Selecting a random word
   *
   * @returns - the word that the user will guess
   */
  function setup(difficulty) {
    // picking random nr to be picked from the array of words
let rand = Math.random() * word1.length;
rand = Math.floor(rand)
let word = ''
if (difficulty === 1) {
  word = word1[rand];
} else if (difficulty === 2) {
    word = word2[rand]
} else if (difficulty === 3) {
    word = word3[rand]
}
return word
  }

  /**
   * Will put value into the highscore list if the new score is in range
   */
  function highScore() {

    if (localStorage.getItem('p1Life') < life) {
      localStorage.setItem('p5Life', localStorage.getItem('p4Life'))
      localStorage.setItem('p5Name', localStorage.getItem('p4Name'))
      localStorage.setItem('p4Life', localStorage.getItem('p3Life'))
      localStorage.setItem('p4Name', localStorage.getItem('p3Name'))
      localStorage.setItem('p3Life', localStorage.getItem('p2Life'))
      localStorage.setItem('p3Name', localStorage.getItem('p2Name'))
      localStorage.setItem('p2Life', localStorage.getItem('p1Life'))
      localStorage.setItem('p2Life', localStorage.getItem('p1Name'))
    localStorage.setItem('p1Life', life)
    localStorage.setItem('p1Name', userName)
    } else if (localStorage.getItem('p2Life') < life) {
      localStorage.setItem('p5Life', localStorage.getItem('p4Life'))
      localStorage.setItem('p5Name', localStorage.getItem('p4Name'))
      localStorage.setItem('p4Life', localStorage.getItem('p3Life'))
      localStorage.setItem('p4Name', localStorage.getItem('p3Name'))
      localStorage.setItem('p3Life', localStorage.getItem('p2Life'))
      localStorage.setItem('p3Name', localStorage.getItem('p2Name'))
      localStorage.setItem('p2Life', life)
      localStorage.setItem('p2Name', userName)
    } else if (localStorage.getItem('p3Life') < life) {
      localStorage.setItem('p5Life', localStorage.getItem('p4Life'))
      localStorage.setItem('p5Name', localStorage.getItem('p4Name'))
      localStorage.setItem('p4Life', localStorage.getItem('p3Life'))
      localStorage.setItem('p4Name', localStorage.getItem('p3Name'))
      localStorage.setItem('p3Life', life)
      localStorage.setItem('p3Name', userName)
    } else if (localStorage.getItem('p4Life') < life) {
      localStorage.setItem('p5Life', localStorage.getItem('p4Life'))
      localStorage.setItem('p5Name', localStorage.getItem('p4Name'))
      localStorage.setItem('p4Life', life)
      localStorage.setItem('p4Name', userName)
    } else if (localStorage.getItem('p5Life') < life) {
      localStorage.setItem('p5Life', life)
      localStorage.setItem('p5Name', userName)
    }
  }

  /**
   * Creating a list of highscores
   * @returns - An orderd array with highscores
   */
  function getHighscore() {
    let arr = []
    arr[0] = localStorage.getItem('p1Name') + ' ' + localStorage.getItem('p1Life')
    arr[1] = localStorage.getItem('p2Name') + ' ' + localStorage.getItem('p2Life')
    arr[2] = localStorage.getItem('p3Name') + ' ' + localStorage.getItem('p3Life')
    arr[3] = localStorage.getItem('p4Name') + ' ' + localStorage.getItem('p4Life')
    arr[4] = localStorage.getItem('p5Name') + ' ' + localStorage.getItem('p5Life')
    console.log('Highscorelist:')
    for (let i = 0; i < 5; i++) {
      console.log('pts.' + (i + 1) + ' ' + arr[i])
    }
    gameMenu()
    return arr
  }

  /**
   * Setting a username that the user can use.
   */
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

  /**
   * This function will test if the values for highscores is null. If they are it will give the score 0.
   * This function will only be used the first time this application is run.
   */
  function checkIfUndefined() {
    if (localStorage.getItem('p1Name') === null) {
      localStorage.setItem('p1Name', 'none!')
      localStorage.setItem('p1Life', 0)
    }
    if (localStorage.getItem('p2Name') === null) {
      localStorage.setItem('p2Name', 'none!')
      localStorage.setItem('p2Life', 0)
  }
  if (localStorage.getItem('p3Name') === null) {
    localStorage.setItem('p3Name', 'none!')
    localStorage.setItem('p3Life', 0)
  }
  if (localStorage.getItem('p4Name') === null) {
    localStorage.setItem('p4Name', 'none!')
    localStorage.setItem('p4Life', 0)
  }
  if (localStorage.getItem('p5Name') === null) {
    localStorage.setItem('p5Name', 'none!')
    localStorage.setItem('p5Life', 0)
  }
}

function setDifficulty() {
  console.log('--------------------------------------')
  console.log('', '\033[32m', '"1", "2" or "3"', '\033[33m', 'to set difficulty', '\033[37m', '')
  console.log('---------', '\033[32m', '"1"', '\033[33m', 'is default', '\033[37m', '----------')
  console.log('--------------------------------------')

  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  readline.question(`${'\x1b[36m'}input: `, (option) => {
    if (option === '1') {
      difficulity = 1
    } else if (option === '2') {
      difficulity = 2
    } else if (option === '3') {
      difficulity = 3
    } else {
      console.log('\x1b[31m', 'Make sure you spell it as described!')
      setDifficulty()
    }
    readline.close()
    gameMenu()
  })
}