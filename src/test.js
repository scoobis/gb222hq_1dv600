const assert = require('chai').assert;
const app = require('./main')
const expect = require('chai').expect

describe('Create visual word (createUserWord)', () => {
    wordArr = app.createuserWord('maybe')
    // testing that the visiual word is an array, later each spot will be filled with one letter
    it('Should be an array', () => {
        assert.typeOf(wordArr, 'array')
    })

    // evry postion is the array should have _ that later will be replace with a letter, test for last position
    it('each spot should have _, test for last pos', () => {
        assert.equal(wordArr[wordArr.length - 1], '_')
    })

    // same as above but with first position
    it('each spot should have _, test for first spot', () => {
        assert.equal(wordArr[0], '_')
    })
})

describe('state test', () => {
    it('no tries left (lost)', () => {
        life = 0
        word = ['_','_','_']
        // testing for out of tries, player lose!
        assert.equal(app.checkState(life, word), true)
    })
    // testing for tries left but not yet a complete word
    it('tries left, not complete word (keep going)', () => {
        life = 3
        assert.equal(app.checkState(life, word), false)
    })

    // Testing for comple word, player won!
    it('tries left, complete word (won)', () => {
        word = ['w','o','w']
        assert.equal(app.checkState(life, word), true)
    })
})

describe('Get highscore', () => {
    it ('should return an array with highscore', () => {
        assert.typeOf(app.getHighscore(), 'array')
    })
    // should return an array with length 5, where every value in the array is information about the score
    it ('should return top 5 scores', () => {
        let lengthofScore = app.getHighscore().length
        assert.equal(lengthofScore, 5)
    })
})

describe('set Difficulity', () => {
    // should change value of difficulty to 1
    it ('Should change difficult value to 1', () => {
        let difficulty = app.readDifficulity('1')
        assert.equal(difficulty, 1)
        
    })
    // should change value of difficulity to 2
    it ('should change difficulty value to 2', () => {
        let difficulty = app.readDifficulity('2')
        assert.equal(difficulty, 2)
    })
    // should change value of difficulty to 3
    it ('should change difficulty value to 3', () => {
        let difficulty = app.readDifficulity('3')
        assert.equal(difficulty, 3)
    })
})

describe('set Difficulity', () => {
     // the length of difficulty 1 should be 4 or 5
    it ('difficulty 1 should have length 4 or 5', () => {
        let word = app.setup(1)
        if (word.length === 4) {
        assert.equal(word.length, 4)
        } else {
            assert.equal(word.length, 5)
        }
        
    })
    // the length of difficulty 2 should be 6 or 7
    it ('difficulty 2 should have length 6 or 7', () => {
        let word = app.setup(2)
        if (word.length === 6) {
            assert.equal(word.length, 6)
        } else {
            assert.equal(word.length, 7)
        }
    })
     // the length of difficulty 3 should be 10
    it ('difficulty 3 should have length 10', () => {
        let word = app.setup(3)
        assert.equal(word.length, 10)
    })
})