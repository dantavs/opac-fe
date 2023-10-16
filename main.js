console.log(window.location.href)

const devUrl = "localhost"
const prodURL = ""

var apiHost = "https://opac-9ey2.onrender.com"

const currentUrl = window.location.hostname

var urlText = "prod"

if (currentUrl == devUrl){
    urlText = "Dev"
    apiHost = "http://localhost:3333"
}

document.getElementById("url").innerHTML= urlText

async function getGameInfo(){
    const url = apiHost + "/getGameInfo"
    const request = await fetch(url,{method:"GET"})

    const gameInfo = await request.json()

    return gameInfo
}

async function startGame() {
    const apiReturn = await getGameInfo()

    document.getElementById("gameState").innerHTML = apiReturn.message
}

startGame()

async function getGameData(){
    const url = apiHost + "/onePieceGame"
    const request = await fetch(url,{method:"GET"})

    const gameInfo = await request.json()

    return gameInfo
}

const gameButton = document.getElementById("gameButton")

gameButton.onclick = async function () {
    const gameData = await getGameData()
    
    document.getElementById("gameData").innerHTML = gameData.playerA.name

    document.getElementById("playerAName").innerHTML = gameData.playerA.name
    document.getElementById("playerAHP").innerHTML = gameData.playerA.hp
    document.getElementById("playerACardName").innerHTML = gameData.playerACard.name
    document.getElementById("playerACardPower").innerHTML = gameData.playerACard.power
    document.getElementById("playerACardImg").innerHTML = gameData.playerACard.img

    document.getElementById("playerBName").innerHTML = gameData.playerB.name
    document.getElementById("playerBHP").innerHTML = gameData.playerB.hp
    document.getElementById("playerBCardName").innerHTML = gameData.playerBCard.name
    document.getElementById("playerBCardPower").innerHTML = gameData.playerBCard.power
    document.getElementById("playerBCardImg").innerHTML = gameData.playerBCard.img

    const winnerPlayer = gameData.winner == "playerA" ? gameData.playerACard.name + " (" + gameData.playerA.name +")" : gameData.playerBCard.name + " (" + gameData.playerB.name +")"  
    const winnerText = "Winner: " + winnerPlayer
    document.getElementById("winner").innerHTML = winnerPlayer

}