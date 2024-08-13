import { initializePlayers, playerOne, computer } from './initializePlayers'
import './style.css'

console.log ('hello')

initializePlayers()

console.log(playerOne)
console.log(computer)

const randomizeBtn = document.querySelector('.random')
    randomizeBtn.addEventListener('click', () => {
        location.reload()
    })

const start = document.querySelector('.start')
    start.addEventListener('click', () => {
        playerOne.gameboard.removePreGameFeatures()
        startGame()
    })


function startGame() {
       waitPlayerAttack()
}


function waitPlayerAttack() {
    console.log('waiting for player one attack')
    addComputerBoardListener()
}

function waitComputerAttack() {
    const randomCoordinate = makeRandomCoordinate()
    console.log(`pc attacked ${randomCoordinate}`)

    const playerBoard = document.querySelector(`.${playerOne.gameboard.player}`)
    const playerCell = playerBoard.querySelector(`[id="${randomCoordinate[0]}${randomCoordinate[1]}"]`)
    playerOne.gameboard.recieveAttack(randomCoordinate, playerOne.board)
    playerOne.gameboard.hasAllSunk()
    playerCell.classList.add('hit')
    console.log(playerCell)
    
    if (computer.gameboard.gameOver !== true) {
        waitPlayerAttack()
    } else if (computer.gameboard.gameOver === true) {
        console.log('Computer Wins')
        removeComputerBoardListener()
    }
}


function addComputerBoardListener() {
    const computerBoard = document.querySelector('.computer')
    const cells = computerBoard.querySelectorAll('.cell')

    cells.forEach((cell) => {
        cell.addEventListener('click', handlePlayerOneClick)
    })

}

function removeComputerBoardListener() {
    const computerBoard = document.querySelector('.computer')
    const cells = computerBoard.querySelectorAll('.cell')

    cells.forEach((cell) => {
        cell.removeEventListener('click', handlePlayerOneClick)
    })
}

function handlePlayerOneClick(event) {
    const id = event.target.id
    computer.gameboard.recieveAttack([id[0], id[1]], computer.board)
    computer.gameboard.hasAllSunk()
    const computerBoard = document.querySelector(`.${computer.gameboard.player}`)
    const computerCell = computerBoard.querySelector(`[id="${id[0]}${id[1]}"]`)
    computerCell.classList.add('hit')
    removeComputerBoardListener()

    if (computer.gameboard.gameOver !== true) {
        waitComputerAttack()
    } else if (computer.gameboard.gameOver === true) {
        console.log('Player One Wins')
    }
}

function makeRandomCoordinate() {
    const randomCoordinate = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
    const isUnique = playerOne.gameboard.missedAttacks.every((attack) => {
        return !(attack[0] === randomCoordinate[0] && attack[1] === randomCoordinate[1])
    })
    if (isUnique) {
        return randomCoordinate;
    } else {
        return makeRandomCoordinate()
    }
}
