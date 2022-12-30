import { Utils } from "../lib/utils.js";

let NumberToFind = 0;
const resultDiv = document.getElementById("resultDiv");
const reboursDiv = document.getElementById("compteARebours");
const contentBeginGame = document.getElementById("beginGame");
let tempRestant = 0;
let compteurInterval = null;

//Récupérer un chiffre aléatoire
//Lancer la partie
document.getElementById("beginGame").addEventListener("click", function (){
    NumberToFind = Utils.getRandomInt(1000);
    console.log(NumberToFind);
    tempRestant = 30;
    contentBeginGame.innerText = "Zééébartyyy.."
    document.getElementById("userPropalInput").value = "";
    resultDiv.innerText = "";

    if(compteurInterval != null) {
        clearInterval(compteurInterval);
        document.getElementById('checkPropalButton').disabled = false; 
    }
        compteurInterval = setInterval(() => {
        reboursDiv.innerText = tempRestant + ' seconde(s)';
        tempRestant--;
        if(tempRestant < 0) {
            clearInterval(compteurInterval);
            reboursDiv.innerText = " C'est ZERO ça !!"
            document.getElementById('checkPropalButton').disabled = true;
            resultDiv.innerText = '';
            contentBeginGame.innerText = "Recommencer ?"
        }    
     }, 1000);
     
});

document.getElementById("checkPropalButton").addEventListener("click", function() {
    checkPropal();
});
    
document.getElementById("userPropalInput").addEventListener("keyup", function(event) {
    if(event.key == 'Enter' && tempRestant > 0){
        checkPropal();
        document.getElementById("userPropalInput").value = ""; 
    }
    
});

function checkPropal() {
    let numberPropal = document.getElementById("userPropalInput").value;
    if(NumberToFind > numberPropal) {
        resultDiv.innerText = "C'est plus ! ";
    }
    else if(NumberToFind < numberPropal) {
        resultDiv.innerText = "C'est moins ! ";
    }
    else if(NumberToFind == numberPropal) {
        resultDiv.innerText = "C'est gagné ! ";
        reboursDiv.innerText = 'Félicitations !';
        clearInterval(compteurInterval);
        contentBeginGame.innerText = "Recommencer ?"
    }
};
