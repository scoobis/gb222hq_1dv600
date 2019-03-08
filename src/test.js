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