var turnedCard = "a" 

const cardsIds = [
    "playerAActiveCard"
    ,"playerBActiveCard"
    ,"playerAHandCard1"
    ,"playerAHandCard2"
    ,"playerAHandCard3"
    ,"playerAHandCard4"
    ,"playerAHandCard5"
    ,"playerBHandCard1"
    ,"playerBHandCard2"
    ,"playerBHandCard3"
    ,"playerBHandCard4"
    ,"playerBHandCard5"    
]

function setEnvironment(){
    const devUrl = "localhost"

    var apiHost = "https://opac-9ey2.onrender.com"
    var envText = "prod"

    const currentUrl = window.location.hostname

    if (currentUrl == devUrl || currentUrl == "127.0.0.1"){
        envText = "Dev"
        apiHost = "http://localhost:3333"
    }

    return apiHost
}

function checkRoundResult(power){
    const cards = JSON.parse(document.getElementById("playerBCardsBuffer").innerHTML)
    const randomCard = Math.floor(Math.random() * cards.length)

    const playerBActiveCard = document.getElementById("playerBActiveCard")

    playerBActiveCard.className = "faceCard"
    playerBActiveCard.innerHTML = 
    `<div>${cards[randomCard].name}</div>
    <div class="cardImg"><img class="charImg" src=${cards[randomCard].img}></div>
    <div id="playerBActiveCardPower">${cards[randomCard].power}</div>
    `
    
    let hp, winner
    if(cards[randomCard].power === 5000 && power ===1000){
        hp = parseInt(document.getElementById("playerBHPValue").innerHTML) - 1
        document.getElementById("playerBHPValue").innerHTML = hp
        document.getElementById("playerBHPValue").style.color = "red"
        document.getElementById("playerAHPValue").style.color = "black"
        document.getElementById('playerARoundResult').innerHTML = "Winner"
        document.getElementById('playerARoundResult').style.color = "lime"
        document.getElementById('playerBRoundResult').innerHTML = "Loser"
        document.getElementById('playerBRoundResult').style.color = "red"
        winner = "Player A"
    }else{
    if ((cards[randomCard].power >= power) ||(cards[randomCard].power === 1000 && power ===5000)){
        hp = parseInt(document.getElementById("playerAHPValue").innerHTML) - 1
        document.getElementById("playerAHPValue").innerHTML = hp
        document.getElementById("playerAHPValue").style.color = "red"
        document.getElementById("playerBHPValue").style.color = "black"
        document.getElementById('playerBRoundResult').innerHTML = "Winner"
        document.getElementById('playerBRoundResult').style.color = "lime"
        document.getElementById('playerARoundResult').innerHTML = "Loser"
        document.getElementById('playerARoundResult').style.color = "red"
        winner = "Player B"
    }else{
        hp = parseInt(document.getElementById("playerBHPValue").innerHTML) - 1
        document.getElementById("playerBHPValue").innerHTML = hp
        document.getElementById("playerBHPValue").style.color = "red"
        document.getElementById("playerAHPValue").style.color = "black"
        document.getElementById('playerARoundResult').innerHTML = "Winner"
        document.getElementById('playerARoundResult').style.color = "lime"
        document.getElementById('playerBRoundResult').innerHTML = "Loser"
        document.getElementById('playerBRoundResult').style.color = "red"
        winner = "Player A"
    }}

    if (hp === 0){
        alert (winner + ' won!')
        btOPG.style.display = "block"
        btJKG.style.display = "block"
        window.location.reload()
    }
    
    
        cards.splice(randomCard,1)
        document.getElementById("playerBCardsBuffer").innerHTML = JSON.stringify(cards)
}

function buildHand(gameData){
    const playerHandCards = [
        "playerAHandCard1"
        ,"playerAHandCard2"
        ,"playerAHandCard3"
        ,"playerAHandCard4"
        ,"playerAHandCard5"
    ]

    document.getElementById("playerBCardsBuffer").innerHTML = JSON.stringify(gameData.deck.cards)

    for (let i=0;i<playerHandCards.length;i++){

        
        const card = document.getElementById(playerHandCards[i]) 
        card.className = "faceCard"
        card.innerHTML = 
        `<div>${gameData.deck.cards[i].name}</div>
        <div class="cardImg"><img class="charImg" src=${gameData.deck.cards[i].img}></div>
        <div id="playerAActiveCardPower">${gameData.deck.cards[i].power}</div>
        `
        
        card.onclick = function () {
            document.getElementById("playerAActiveCard").className = "faceCard"
            document.getElementById("playerAActiveCard").innerHTML = document.getElementById(playerHandCards[i]).innerHTML
            
            document.getElementById(playerHandCards[i]).className = "playerCard"
            document.getElementById(playerHandCards[i]).innerHTML = turnedCard
            
            const cardPower = parseInt(document.getElementById("playerAActiveCardPower").innerHTML)

            checkRoundResult(cardPower)

            card.onclick = ""
        } 
    }
}

async function getGameData(gameName){
    const apiHost = setEnvironment()
    var url=""

    if (gameName === "JKG"){
        url = apiHost + "/jujutsuKaisenGame"
    }else{
        url = apiHost + "/onePieceGame"
    }
    const request = await fetch(url,{method:"GET"})
    
    const gameInfo = await request.json()
    turnedCard = `<img class="turnedCardImg" src=${gameInfo.cardback}>`

    for (let i=0;i<cardsIds.length;i++){
        document.getElementById(cardsIds[i]).innerHTML = turnedCard    
    }

    return gameInfo
}

const btOPG = document.getElementById("btOPG")
const btJKG = document.getElementById("btJKG")

btOPG.onclick = async function () {
    const gameData = await getGameData("OPG")
    buildHand(gameData)
    btOPG.style.display = "none"
    btJKG.style.display = "none"
}

btJKG.onclick = async function () {
    const gameData = await getGameData("JKG")
    buildHand(gameData)
    btOPG.style.display = "none"
    btJKG.style.display = "none"
}