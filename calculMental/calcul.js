/*
TODO : 

- Lancer un minuteur de x minutes ( utiliser celui du pendu)
- Générer un calcul (deux chiffres aléatoires, (+ - *) en aléatoire)
- Laisser l'utilisateur faire des propositions.


V2 :
- Paramétrer ma partie
- Le temps du compte à rebours
- Les opérateurs de la partie
- Gérer les divisions
*/

const reboursDiv = document.getElementById("minuteur");
const calculDiv = document.getElementById("calcul");
const propalInput = document.getElementById("resultPropal");
const messengerDiv = document.getElementById("messenger");

const tempsMinuteurBase = 10;
let compteurInterval = null;
let tempsRestant = 0;3121
let calculEnCours = null;

function launchGame() {
    lancerMinuteur(tempsMinuteurBase);
    generateCalcul();
}

function generateCalcul() {
    calculEnCours = new Calcul(20);
    calculDiv.innerText = calculEnCours.showCalcul;
    propalInput.value = "";
}

document.getElementById('validPropal').addEventListener('click', () => {
    if(calculEnCours.result == propalInput.value) {
        let tempsPourGagner = tempsMinuteurBase - tempsRestant; 
        messengerDiv.innerText = "GG ! Vous avez gagner en " + tempsPourGagner + " secondes" ;
        clearInterval(compteurInterval);
        reboursDiv.innerText = "";

    }
    else {
        messengerDiv.innerText = "NOP !";

    }
})

function lancerMinuteur(tempsMinuteurBase) {
    clearInterval(compteurInterval);
    tempsRestant = tempsMinuteurBase;
    reboursDiv.innerText = (tempsRestant);
    compteurInterval = setInterval(() => {
        // Le code ici va s'éxecuter toutes les 1 seconde
    tempsRestant --;
    reboursDiv.innerText = (tempsRestant);
        if(tempsRestant == 0) {
            clearInterval(compteurInterval);
            alert("Fini !")
        }
    }, 1000);
}

class Calcul {
    #operators = ['*', '-', '+'];
    nombre1;
    nombre2;
    operator;

    constructor(maximum) {
        this.nombre1 = this.#getRandomInt(maximum);
        this.nombre2 = this.#getRandomInt(maximum);
        // operator = un nombre aléatoire dans operators
        this.operator = this.#operators[this.#getRandomInt(3)];
    }

    get result() {
        return eval(this.nombre1 + this.operator + this.nombre2);
    }

    get showCalcul(){
        return `${this.nombre1} ${this.operator} ${this.nombre2}`;
    }

    #getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}