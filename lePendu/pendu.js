/*
TODO :
    - Générer un mot aléatoire  ==> Ok
    - Afficher le mot en masqué _ _ _ _ _  ==> Ok
    - Pouvoir proposer des lettres  ==> Ok
    - Afficher les lettres trouvées ==> Ok
    - Gérer un nombre d'erreurs max ==> Ok
    - Gérer la victoire ==> Ok
*/ 



const allWords = ['fleur', 'montagne', 'ministre', 'congolais', 'constitution', 'corompue', 'petrole', 'dictateur', 'sapeur', 'prisonnier', 'chomage'];
const buttonPlay = document.getElementById("beginGame");
const wordToFindDiv = document.getElementById("wordToFindDiv");
const keyBoardDiv = document.getElementById("keyBoard");
const cptErreurDiv = document.getElementById('cptErreur');
let getWord;
let wordTofindArray;
let cptErreur;
let cptLettreTrouvee;

buttonPlay.addEventListener("click", function() {
    beginGame();
})

function beginGame() {
    cptErreur = 0;
    cptLettreTrouvee = 0;
    cptErreurDiv.innerHTML = "";
    //Delete le mot trouvé à chaque début de partie
    wordToFindDiv.innerHTML = '';
    //Générer un mot au hasard de la liste allWords ..
    let getWordPosition = Math.floor(Math.random()*allWords.length);
    getWord = allWords[getWordPosition];
    wordTofindArray = Array.from(getWord.toUpperCase());
    
    let table = document.createElement("table");
    let line = document.createElement("tr");
    line.id='LineOfWord';
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
    keyBoardDiv.style.visibility = "visible";
    let Alphabet = generateAlphabet(true);
    Alphabet.forEach(letter => {
        let lettreDiv = document.createElement("div");
        lettreDiv.innerHTML = letter;
        lettreDiv.classList.add("letterKeyBoard");
        keyBoardDiv.appendChild(lettreDiv);

        lettreDiv.addEventListener("click", () => {
            if(checkLetterInWord(letter)){
                //Afficher la lettre dans le mot masqué
                let lineWord = document.getElementById("LineOfWord");
                let allTdOfWord = lineWord.children;

                Array.from(allTdOfWord).forEach(td => {
                    if(td.dataset.letter == letter) {
                        td.innerHTML = letter
                        cptLettreTrouvee++
                    }
                })

                if(cptLettreTrouvee == wordTofindArray.length) {
                    keyBoardDiv.innerHTML = '';
                    cptErreurDiv.innerHTML = 'Gagné, en ' + cptErreur + ' coups !';
                }

            }
            else{
                //Incrémenter le compteur d'erreurs
                cptErreur ++;
                cptErreurDiv.innerHTML = "Nombre d'erreurs: " + cptErreur;
                if(cptErreur >= 7) {
                    cptErreurDiv.innerHTML = "Perdu, vous avez fait " + cptErreur + " erreurs !";
                    let lineWord = document.getElementById("LineOfWord");
                    let allTdOfWord = lineWord.children;
                    Array.from(allTdOfWord).forEach(td => {
                    td.innerHTML = td.dataset.letter;
                    });
                    keyBoardDiv.style.visibility = "hidden";
                }
            }

            lettreDiv.style.visibility = 'hidden';
        })
    });
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

//Si la lettre est trouvée, la fonction retourne true.
//Si la lettre n'est pas trouvée, la fonction retourne false.
function checkLetterInWord(letter) {
    console.log(letter)
    let findLetter = false;
    wordTofindArray.forEach(letterOfWord => {
        if(letter == letterOfWord) {
            findLetter = true;
        }
    });
    return findLetter;
}
