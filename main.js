console.log(window.location.href)

const devUrl = "localhost"
const prodURL = ""

const currentUrl = window.location.hostname

var urlText = "prod"

if (currentUrl == devUrl){
    urlText = "Dev"
}

document.getElementById("url").innerHTML= urlText
