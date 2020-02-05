var ligne6 = document.querySelectorAll(".ligne6 td");
var trous = document.querySelectorAll("td");
var tableau = [];
// var turn = 0;
// console.log(trous);
var player1 = true;
var jetonActif = "jeton-rouge";
var index = 0;
var JetonALaSuite = 0;
//test

//fonction qui change couleur de l'indicateur du joueur actif
function changeJoueurIndicateur(){
    
    var indicateurJ1 = document.querySelector("#indicateur-j1");
    var indicateurJ2 = document.querySelector("#indicateur-j2");
    // console.log("début indication ",indicateur);
    if (player1 == false){
        indicateurJ1.classList = "d-none";
        indicateurJ2.classList = "d-block";
        console.log("c'est le tour de J2");
    }
    else if (player1 == true){
        indicateurJ2.classList = "d-none";
        indicateurJ1.classList = "d-block";
        console.log("c'est le tour de J1");
    }
};



//fonction qui change couleur de l'indicateur du joueur actif
function indicateurWinner(winner){
    
    var indicateur = document.querySelector("#indicateur-winner");
    var boutonReset = document.querySelector("#bouton-reset");
    
    // console.log("début indication ",indicateur);
    if (winner == "j1"){
        indicateur.innerText = "Joueur 1 Wins";
        indicateur.classList.remove("d-none");
        indicateur.classList.add("d-block");
        boutonReset.classList.remove("d-none");
        boutonReset.classList.add("d-block");
        console.log("j1 wins");
    }
    else if (winner == "j2"){
        indicateur.innerText = "Joueur 2 Wins";
        indicateur.classList.remove("d-none");
        indicateur.classList.add("d-block");
        boutonReset.classList.remove("d-none");
        boutonReset.classList.add("d-block");
        console.log("j2 wins");
    }
    else if (winner == "cache moi"){
        indicateur.classList.remove("d-block");
        indicateur.classList.add("d-none");
        boutonReset.classList.remove("d-block");
        boutonReset.classList.add("d-none");
        console.log("cache moi wins");
    }

    boutonReset.addEventListener("click", reset);
};

var ajoutJeton = function (event) {
    // console.log("ajoutJeton");
    
    //si l'emplacement est déja pris :
    if (event.target.classList[1] == "jeton-rouge" || event.target.classList[1] == "jeton-jaune") {
        console.log("not free space, go up");
        // arrete la fonction
        return;
    }
    else {
        if (player1 == true) {
            jetonActif = "jeton-rouge";
            player1 = false;
        }
        else if (player1 == false) {
            jetonActif = "jeton-jaune";
            player1 = true;
        }

        // ajout un jeton (la class jeton de la couleur du joueur en cours)
        // event.target.classList = jetonActif;
        //needs to be a .add class so that we can both have .colonne classes and jeton classes
        event.target.classList.add(jetonActif);
        //active fonction qui rendra la case au dessus de celle qui vient d'etre clické clickable
        makeTopClickable(event);
    }
    console.log(" player1 ", player1);
    // fonction qui vérifie si il y a des/une suite(s) gagnant
    verifWin(event);

    //fonction qui permet de montrer/changer la couleur du joueur actif
    //penser a changer le queryselecteur de l'element a changer
    changeJoueurIndicateur();
}

//initialise la première ligne/la rend clickable
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
for (var i = 0; i < ligne6.length; i++) {
    console.log("ajoutJeton");
    ligne6[i].addEventListener("click", ajoutJeton);
}



//verif suite horizontale
function verifHorizontale(event) {

    var ligne6 = document.querySelectorAll(".ligne6 td");
    var ligne5 = document.querySelectorAll(".ligne5 td");
    var ligne4 = document.querySelectorAll(".ligne4 td");
    var ligne3 = document.querySelectorAll(".ligne3 td");
    var ligne2 = document.querySelectorAll(".ligne2 td");
    var ligne1 = document.querySelectorAll(".ligne1 td");
    var lignesArray = [ligne6, ligne5, ligne4, ligne3, ligne2, ligne1];


    // première boucle qui nous permet de sélectionner chaques ligne contenu dans 'lignesArray'
    for (var i = 0; i < 6; i++) {

        var currentRow = lignesArray[i];
        // console.log("current row ", currentRow);

        // deuxieme boucle qui selectionne chaque case de la liste précédement selectionné
        for (var j = 0; j < 4; j++) {
            if (currentRow[j].classList[1] == "jeton-rouge" && currentRow[j + 1].classList[1] == "jeton-rouge"
                && currentRow[j + 2].classList[1] == "jeton-rouge" && currentRow[j + 3].classList[1] == "jeton-rouge") {

                // alert("winner is red");
                indicateurWinner("j1");
                // window.location = "http://www.mozilla.org";
                // reset();

            }
            else if (currentRow[j].classList[1] == "jeton-jaune" && currentRow[j + 1].classList[1] == "jeton-jaune"
                && currentRow[j + 2].classList[1] == "jeton-jaune" && currentRow[j + 3].classList[1] == "jeton-jaune") {

                // alert("winner is yellow");
                indicateurWinner("j2");
                // window.location = "http://www.mozilla.org";
                // reset();

            }
        }
    }

}


//verif suite verticale
function verifVerticale(event) {

    var colonne7 = document.querySelectorAll(".colonne7");
    var colonne6 = document.querySelectorAll(".colonne6");
    var colonne5 = document.querySelectorAll(".colonne5");
    var colonne4 = document.querySelectorAll(".colonne4");
    var colonne3 = document.querySelectorAll(".colonne3");
    var colonne2 = document.querySelectorAll(".colonne2");
    var colonne1 = document.querySelectorAll(".colonne1");
    var colonnesArray = [colonne7, colonne6, colonne5, colonne4, colonne3, colonne2, colonne1];
    // console.log("col ", colonne7);


    // première boucle qui nous permet de sélectionner chaques ligne contenu dans 'lignesArray'
    for (var i = 0; i < colonnesArray.length; i++) {

        var currentCol = colonnesArray[i];
        // console.log("current col ", currentCol);

        // deuxieme boucle qui selectionne chaque case de la liste précédement selectionné
        for (var j = 0; j < 3; j++) {
            if (currentCol[j].classList[1] == "jeton-rouge" && currentCol[j + 1].classList[1] == "jeton-rouge"
                && currentCol[j + 2].classList[1] == "jeton-rouge" && currentCol[j + 3].classList[1] == "jeton-rouge") {

                // alert("winner is red");
                indicateurWinner("j1");
                // window.location = "http://www.mozilla.org";
                // reset();

            }
            else if (currentCol[j].classList[1] == "jeton-jaune" && currentCol[j + 1].classList[1] == "jeton-jaune"
                && currentCol[j + 2].classList[1] == "jeton-jaune" && currentCol[j + 3].classList[1] == "jeton-jaune") {

                // alert("winner is yellow");
                indicateurWinner("j2");
                // window.location = "http://www.mozilla.org";
                // reset();

            }
        }
    }

}


//verif suite diagonale "//" (gauche à droite)
function verifDiagonaleGaucheDroite(event) {

    var ligne6 = document.querySelectorAll(".ligne6 td");
    var ligne5 = document.querySelectorAll(".ligne5 td");
    var ligne4 = document.querySelectorAll(".ligne4 td");
    var ligne3 = document.querySelectorAll(".ligne3 td");
    var ligne2 = document.querySelectorAll(".ligne2 td");
    var ligne1 = document.querySelectorAll(".ligne1 td");
    var lignesArray = [ligne6, ligne5, ligne4, ligne3, ligne2, ligne1];


    // première boucle qui nous permet de sélectionner chaques ligne contenu dans 'lignesArray'
    for (var i = 0; i < 3; i++) {

        var currentRow = lignesArray[i];
        // console.log("current row ", currentRow);

        // deuxieme boucle qui selectionne chaque case de la liste précédement selectionné
        for (var j = 0; j < 4; j++) {
            if (currentRow[j].classList[1] == "jeton-rouge") {
                // console.log("currentRow 1: ", currentRow);
                currentRow = lignesArray[i + 1];
                //currentRow = lignesArray[i + j];

                if (currentRow[j + 1].classList[1] == "jeton-rouge") {
                    // console.log("currentRow 2: ", currentRow);
                    currentRow = lignesArray[i + 2];

                    if (currentRow[j + 2].classList[1] == "jeton-rouge") {
                        // console.log("currentRow 3: ", currentRow);
                        currentRow = lignesArray[i + 3];

                        if (currentRow[j + 3].classList[1] == "jeton-rouge") {
                            // console.log("currentRow 4: ", currentRow);
                            // alert("winner is rouge");
                            // window.location = "http://www.mozilla.org";
                            // reset();
                            indicateurWinner("j1");
                        }

                    }
                }
                //remet current row a sa position initial de la boucle
                //ils étaient modif par les if précédents
                currentRow = lignesArray[i];
            }
            else if (currentRow[j].classList[1] == "jeton-jaune") {
                // console.log("currentRow 1: ", currentRow);
                currentRow = lignesArray[i + 1];

                if (currentRow[j + 1].classList[1] == "jeton-jaune") {
                    // console.log("currentRow 2: ", currentRow);
                    currentRow = lignesArray[i + 2];

                    if (currentRow[j + 2].classList[1] == "jeton-jaune") {
                        // console.log("currentRow 3: ", currentRow);
                        currentRow = lignesArray[i + 3];

                        if (currentRow[j + 3].classList[1] == "jeton-jaune") {
                            // console.log("currentRow 4: ", currentRow);
                            // alert("winner is jaune");
                            // window.location = "http://www.mozilla.org";
                            // reset();
                            indicateurWinner("j2");
                        }

                    }
                }
                //remet current row a sa position initial de la boucle
                //ils étaient modif par les if précédents
                currentRow = lignesArray[i];
            }
        }
    }
}


//verif suite digonale "\\"  (droite à gauche)
function verifDiagonaleDroiteGauche(event) {

    var ligne6 = document.querySelectorAll(".ligne6 td");
    var ligne5 = document.querySelectorAll(".ligne5 td");
    var ligne4 = document.querySelectorAll(".ligne4 td");
    var ligne3 = document.querySelectorAll(".ligne3 td");
    var ligne2 = document.querySelectorAll(".ligne2 td");
    var ligne1 = document.querySelectorAll(".ligne1 td");
    var lignesArray = [ligne6, ligne5, ligne4, ligne3, ligne2, ligne1];


    // première boucle qui nous permet de sélectionner chaques ligne contenu dans 'lignesArray'
    for (var i = 0; i < 3; i++) {

        var currentRow = lignesArray[i];
        // console.log("current row ", currentRow);

        // deuxieme boucle qui selectionne chaque case de la liste précédement selectionné
        //commence à la droite de la row et selectionne 4 cases de droite a gauche
        for (var j = currentRow.length - 1; j > 2; j--) {
            if (currentRow[j].classList[1] == "jeton-rouge") {
                console.log("currentRow 1: ", currentRow);
                currentRow = lignesArray[i + 1];

                if (currentRow[j - 1].classList[1] == "jeton-rouge") {
                    console.log("currentRow 2: ", currentRow);
                    currentRow = lignesArray[i + 2];

                    if (currentRow[j - 2].classList[1] == "jeton-rouge") {
                        console.log("currentRow 3: ", currentRow);
                        currentRow = lignesArray[i + 3];

                        if (currentRow[j - 3].classList[1] == "jeton-rouge") {
                            console.log("currentRow 4: ", currentRow);
                            // alert("winner is rouge");
                            // window.location = "http://www.mozilla.org";
                            // reset();
                            indicateurWinner("j1");
                        }

                    }
                }
                //remet current row a sa position initial de la boucle
                //ils étaient modif par les 'if' précédents
                currentRow = lignesArray[i];
            }
            else if (currentRow[j].classList[1] == "jeton-jaune") {
                console.log("currentRow 1: ", currentRow);
                currentRow = lignesArray[i + 1];

                if (currentRow[j - 1].classList[1] == "jeton-jaune") {
                    console.log("currentRow 2: ", currentRow);
                    currentRow = lignesArray[i + 2];

                    if (currentRow[j - 2].classList[1] == "jeton-jaune") {
                        console.log("currentRow 3: ", currentRow);
                        currentRow = lignesArray[i + 3];

                        if (currentRow[j - 3].classList[1] == "jeton-jaune") {
                            console.log("currentRow 4: ", currentRow);
                            // alert("winner is jaune");
                            // window.location = "http://www.mozilla.org";
                            // reset();
                            indicateurWinner("j2");
                        }

                    }
                }
                //remet current row a sa position initial de la boucle
                //ils étaient modif par les 'if' précédents
                currentRow = lignesArray[i];
            }
        }
    }
}



function verifWin(event) {
    verifHorizontale(event);
    verifVerticale(event);
    verifDiagonaleGaucheDroite(event);
    verifDiagonaleDroiteGauche(event);
}



function makeTopClickable(event) {
    if (event.target.parentElement.classList.value != "ligne1") {
        console.log(event);
        var nextPos = event.target.parentElement.previousElementSibling.querySelectorAll("td");
        //trouve l'index position de la case clické
        var cellRowIndex = event.target.cellIndex;

        nextPos[cellRowIndex].addEventListener("click", ajoutJeton);
    }
}




//SECTION RESET----------------------------------------------------------------------
// --------------------------------------------------------------------------------------
var reset = function (event) {
    var x = document.querySelectorAll('td')
    console.log('avant lol', x)

    for (items of x) {
        items.classList.remove('jeton-rouge', 'jeton-jaune');
        items.removeEventListener("click", ajoutJeton);
    }
    console.log('apres lol', x)
    player1 = true;
    for (var i = 0; i < ligne6.length; i++) {
        console.log("ajoutJeton");
        ligne6[i].addEventListener("click", ajoutJeton);
    }
    changeJoueurIndicateur();
    indicateurWinner("cache moi");

}


//addeventlistener pour bouton (pour testes)
/////////////////////////////////////////////////////
// var btnreset = document.querySelector("#reset-btn");

// btnreset.addEventListener("click", reset);



// btnreset.addEventListener("click", () => {

//     var x = document.querySelectorAll('td')
//     console.log('avant lol', x)

//     for (items of x) {
//         items.classList.remove('jeton-rouge', 'jeton-jaune');
//     }
//     console.log('apres lol', x)
//     player1 = true;
// });