const devUrl = "localhost"
const prodURL = ""

var apiHost = "https://opac-9ey2.onrender.com"
var envText = "prod"

const currentUrl = window.location.hostname

if (currentUrl == devUrl){
    envText = "Dev"
    apiHost = "http://localhost:3333"
}

document.getElementById("url").innerHTML= envText

async function getGameInfo(){
    const url = apiHost + "/getGameInfo"
    const request = await fetch(url,{method:"GET"})

    const gameInfo = await request.json()

    return gameInfo
}

async function startGame() {
    const apiReturn = await getGameInfo()

    document.getElementById("gameState").innerHTML = apiReturn.message
    document.getElementById("playersInfo").style.display = "none"
    document.getElementById("roundInfo").style.display = "none"
}

startGame()

async function getGameData(){
    const url = apiHost + "/onePieceGame"
    const request = await fetch(url,{method:"GET"})

    const gameInfo = await request.json()

    return gameInfo
}


async function nextRound(gameData){
    const url = apiHost + "/OPGNextRound"
    const game = JSON.parse(gameData)

    alert('vai chamar: ' + gameData)
    const request = await fetch(url,{
        method: "POST"
        ,body: gameData
    })

    const updatedGameData = await request.json()

    alert('status code: ', JSON.stringify(updatedGameData))

    return updateGameData
}

function updatePlayersData(gameData){
    document.getElementById("playerAName").innerHTML = gameData.playerA.name
    document.getElementById("playerAHP").innerHTML = gameData.playerA.hp

    document.getElementById("playerBName").innerHTML = gameData.playerB.name
    document.getElementById("playerBHP").innerHTML = gameData.playerB.hp

    document.getElementById("playersInfo").style.display = "block"

    return true
}

function updateGameData(game){
    updatePlayersData(game)

        document.getElementById("playerACardName").innerHTML = gameData.playerACard.name
        document.getElementById("playerACardPower").innerHTML = gameData.playerACard.power
        document.getElementById("playerACardImg").innerHTML = gameData.playerACard.img
        
        document.getElementById("playerBCardName").innerHTML = gameData.playerBCard.name
        document.getElementById("playerBCardPower").innerHTML = gameData.playerBCard.power
        document.getElementById("playerBCardImg").innerHTML = gameData.playerBCard.img
        
        const winnerPlayer = gameData.winner == "playerA" ? gameData.playerACard.name + " (" + gameData.playerA.name +")" : gameData.playerBCard.name + " (" + gameData.playerB.name +")"  
        const winnerText = "Winner: " + winnerPlayer
        document.getElementById("winner").innerHTML = winnerPlayer
        
        document.getElementById("roundInfo").style.display = "block"
        
        

        return true
}

const gameButton = document.getElementById("btAction")

gameButton.onclick = async function () {
    const gameState = document.getElementById('gameState').innerHTML

    if (gameState === "inProgress"){
        const gameData = document.getElementById("gameData").innerHTML
        const game = await nextRound(gameData)
        const updatedGameData = updateGameData(game)
        document.getElementById("gameData").innerHTML = updatedGameData
    }else{   
        const gameData = await getGameData()
        updatePlayersData(gameData)
        document.getElementById("gameData").innerHTML=JSON.stringify(gameData)
        document.getElementById("gameState").innerHTML = "inProgress"
        document.getElementById("btAction").innerHTML="Next round"
    }

    return true
}