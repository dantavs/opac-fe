const turnedCard = 
`<img class="turnedCardImg" src="https://1757140519.rsc.cdn77.org/blog/wp-content/uploads/2022/07/One-Piece-Symbol.png">`

document.getElementById("playerAActiveCard").innerHTML = turnedCard
document.getElementById("playerBActiveCard").innerHTML = turnedCard

document.getElementById("playerAHandCard1").innerHTML = turnedCard
document.getElementById("playerAHandCard2").innerHTML = turnedCard
document.getElementById("playerAHandCard3").innerHTML = turnedCard
document.getElementById("playerAHandCard4").innerHTML = turnedCard
document.getElementById("playerAHandCard5").innerHTML = turnedCard

document.getElementById("playerBHandCard1").innerHTML = turnedCard
document.getElementById("playerBHandCard2").innerHTML = turnedCard
document.getElementById("playerBHandCard3").innerHTML = turnedCard
document.getElementById("playerBHandCard4").innerHTML = turnedCard
document.getElementById("playerBHandCard5").innerHTML = turnedCard

function cardClick(){
    alert('Card')
}

function buildHand(){
    const card = document.getElementById("playerAHandCard1") 
    card.className = "faceCard"
    card.innerHTML = 
    `<div>CardName</div>
     <div class="cardImg">CardImg</div>
     <div>CardPower</div>
    `

    card.onclick = function () {
        alert('clickCard')
        document.getElementById("playerAHandCard1").className = "playerCard"
    }
}

buildHand()