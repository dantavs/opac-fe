console.log(window.location.href)

const devUrl = "localhost"
const prodURL = ""

const apiHost = "https://opac-9ey2.onrender.com"

const currentUrl = window.location.hostname

var urlText = "prod"

if (currentUrl == devUrl){
    urlText = "Dev"
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

    document.getElementById("gameInfo").innerHTML = apiReturn.message
}