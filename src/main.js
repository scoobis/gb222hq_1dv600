console.log('Welcome to the hangman project')

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  readline.question(`Input username: `, (name) => {
    console.log(`Your username is ${name}`)
    let userName = name
    readline.close()
  })
