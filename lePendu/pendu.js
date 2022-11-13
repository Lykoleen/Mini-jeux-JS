/*
TODO :
    - Générer un mot aléatoire  ==> Ok
    - Afficher le mot en masqué _ _ _ _ _  ==> Ok
    - Pouvoir proposer des lettres
    - Afficher les lettres trouvées
    - Gérer un nombre d'erreurs max
    - Afficher des lettres visibles (En fonction de la diffulté choisie)
*/ 



const allWords = ['fleur', 'montagne', 'ministre', 'congolais', 'constitution', 'corompue', 'petrole', 'dictateur', 'sapeur', 'prisonnier', 'chômage'];
const buttonPlay = document.getElementById("beginGame");
const wordToFindDiv = document.getElementById("wordToFindDiv");
const keyBoardDiv = document.getElementById("keyBoard");
let getWord;

buttonPlay.addEventListener("click", function() {
    beginGame();
})

function beginGame() {
    //Delete le mot trouvé à chaque début de partie
    wordToFindDiv.innerHTML = '';
    //Générer un mot au hasard de la liste allWords ..
    let getWordPosition = Math.floor(Math.random()*allWords.length);
    getWord = allWords[getWordPosition];
    let wordTofindArray = Array.from(getWord);
    
    let table = document.createElement("table");
    let line = document.createElement("tr");
    wordTofindArray.forEach(letter => {
        //Créer un TD (casse du tableau) par lettre
        let td = document.createElement("td");
        td.dataset.letter = letter;
        td.innerHTML = "_";
        line.appendChild(td);
    });

    table.appendChild(line);
    wordToFindDiv.appendChild(table);
    generateKeyBoard();
}

function generateKeyBoard () {
    keyBoardDiv.innerHTML = "";
    let Alphabet = generateAlphabet(true);
    Alphabet.forEach(letter => {
        let lettreDiv = document.createElement("div");
        lettreDiv.innerHTML = letter;
        lettreDiv.classList.add("letterKeyBoard");
        keyBoardDiv.appendChild(lettreDiv);
    })
}

function generateAlphabet (capital = false) {
    //return [...Array(26)].map((_, i) => String.fromCharCode(i + (capital ? 65 : 97)));
    //Ligne du haut traduite en plus simple
    let tab = [];
    for(i=0; i<26; i++) {
        if(capital)
        {
            tab.push(String.fromCharCode(i + 65));
        }
        else
        {
            tab.push(String.fromCharCode(i + 97));
        }
    }
    return tab;
};


