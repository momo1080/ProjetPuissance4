var ligne6 = document.querySelectorAll(".ligne6 td");
var trous = document.querySelectorAll("td");
var tableau = [];
// var turn = 0;
// console.log(trous);
var player1 = true;
var jetonActif = "jeton-rouge";
var index = 0;
var JetonALaSuite = 0;


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


var ajoutJeton = function (event) {
    // console.log("ajoutJeton");
    //si l'emplacement est déja pris ou le tour en cour est celui de l'ia:
    if (event.target.classList[1] == "jeton-rouge" || event.target.classList[1] == "jeton-jaune"
        || player1 == false) {
        console.log("not free space, go up");
        // arrete la fonction
        return;
    }
    else {
        if (player1 == true) {
            jetonActif = "jeton-rouge";
            //needs to be a .add class so that we can both have .colonne classes and jeton classes
            event.target.classList.add(jetonActif);
            // fonction qui vérifie si il y a des / une suite(s) gagnant pour joueur
            verifWin(event);
            //active fonction qui rendra la case au dessus de celle qui vient d'etre clické clickable
            makeTopClickable(event);
            player1 = false;
        }

        changeJoueurIndicateur();

        //met commence un timer qui fera jouer l'ia dans X millisecondes
        setTimeout(function () {
            var jetonJoué = false;
            var indexAléatoire, num = 0, nbrPlaceLibre = 0;

            var ligne6 = document.querySelectorAll(".ligne6 td");
            var ligne5 = document.querySelectorAll(".ligne5 td");
            var ligne4 = document.querySelectorAll(".ligne4 td");
            var ligne3 = document.querySelectorAll(".ligne3 td");
            var ligne2 = document.querySelectorAll(".ligne2 td");
            var ligne1 = document.querySelectorAll(".ligne1 td");
            var lignesArray = [ligne6, ligne5, ligne4, ligne3, ligne2, ligne1];

            //ia "intelligente" qui verif si player 1 est sur le point de gagner
            jetonJoué = IAVerifVerticale();
            if (jetonJoué !== true) {
                jetonJoué = IAVerifHorizontale();
            }
            console.log("ia jeton joué", jetonJoué);
            //section 'while' pour l'ia basique
            // iaBasiqueLignes(jetonJoué, indexAléatoire, num, nbrPlaceLibre, lignesArray);
            iaBasiqueCol(jetonJoué, indexAléatoire, num, nbrPlaceLibre, lignesArray);
            verifWin(event);
            changeJoueurIndicateur();
        }, 700);
        // tourIA(event);
        // fonction qui vérifie si il y a des / une suite(s) gagnant pour IA
        // verifWin(event);

    }
    console.log(" player1 avant timeout", player1);
    // fonction qui vérifie si il y a des/une suite(s) gagnant
    // verifWin(event);
}

//initialise la première ligne/la rend clickable
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
for (var i = 0; i < ligne6.length; i++) {
    // console.log("ajoutJeton");
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

                // alert("winner is joueur 1");
                window.location = "win.html";
                // reset();

            }
            else if (currentRow[j].classList[1] == "jeton-jaune" && currentRow[j + 1].classList[1] == "jeton-jaune"
                && currentRow[j + 2].classList[1] == "jeton-jaune" && currentRow[j + 3].classList[1] == "jeton-jaune") {

                // alert("winner is joueur 2");
                window.location = "lose.html";
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


    // première boucle qui nous permet de sélectionner chaques ligne contenu dans 'colonnesArray'
    for (var i = 0; i < colonnesArray.length; i++) {

        var currentCol = colonnesArray[i];
        // console.log("current col ", currentCol);

        // deuxieme boucle qui selectionne chaque case de la liste précédement selectionné
        for (var j = 0; j < 3; j++) {
            if (currentCol[j].classList[1] == "jeton-rouge" && currentCol[j + 1].classList[1] == "jeton-rouge"
                && currentCol[j + 2].classList[1] == "jeton-rouge" && currentCol[j + 3].classList[1] == "jeton-rouge") {

                // alert("winner is joueur 1");
                window.location = "win.html";
                // reset();

            }
            else if (currentCol[j].classList[1] == "jeton-jaune" && currentCol[j + 1].classList[1] == "jeton-jaune"
                && currentCol[j + 2].classList[1] == "jeton-jaune" && currentCol[j + 3].classList[1] == "jeton-jaune") {

                // alert("winner is joueur 2");
                window.location = "lose.html";
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

                if (currentRow[j + 1].classList[1] == "jeton-rouge") {
                    // console.log("currentRow 2: ", currentRow);
                    currentRow = lignesArray[i + 2];

                    if (currentRow[j + 2].classList[1] == "jeton-rouge") {
                        // console.log("currentRow 3: ", currentRow);
                        currentRow = lignesArray[i + 3];

                        if (currentRow[j + 3].classList[1] == "jeton-rouge") {
                            // console.log("currentRow 4: ", currentRow);
                            // alert("winner is joueur 1");
                            window.location = "win.html";
                            // reset();
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
                            // alert("winner is joueur 2");
                            window.location = "lose.html";
                            // reset();
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
                // console.log("currentRow 1: ", currentRow);
                currentRow = lignesArray[i + 1];

                if (currentRow[j - 1].classList[1] == "jeton-rouge") {
                    // console.log("currentRow 2: ", currentRow);
                    currentRow = lignesArray[i + 2];

                    if (currentRow[j - 2].classList[1] == "jeton-rouge") {
                        // console.log("currentRow 3: ", currentRow);
                        currentRow = lignesArray[i + 3];

                        if (currentRow[j - 3].classList[1] == "jeton-rouge") {
                            // console.log("currentRow 4: ", currentRow);
                            // alert("winner is joueur 1");
                            window.location = "win.html";
                            // reset();
                        }

                    }
                }
                //remet current row a sa position initial de la boucle
                //ils étaient modif par les 'if' précédents
                currentRow = lignesArray[i];
            }
            else if (currentRow[j].classList[1] == "jeton-jaune") {
                // console.log("currentRow 1: ", currentRow);
                currentRow = lignesArray[i + 1];

                if (currentRow[j - 1].classList[1] == "jeton-jaune") {
                    // console.log("currentRow 2: ", currentRow);
                    currentRow = lignesArray[i + 2];

                    if (currentRow[j - 2].classList[1] == "jeton-jaune") {
                        // console.log("currentRow 3: ", currentRow);
                        currentRow = lignesArray[i + 3];

                        if (currentRow[j - 3].classList[1] == "jeton-jaune") {
                            // console.log("currentRow 4: ", currentRow);
                            // alert("winner is joueur 2");
                            window.location = "lose.html";
                            // reset();
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
        // console.log(event.target.parentElement);
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


//IA SECTION BELOW---------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------


function tourIA(event) {
    var jetonJoué = false;
    var indexAléatoire, num = 0, nbrPlaceLibre = 0;

    var ligne6 = document.querySelectorAll(".ligne6 td");
    var ligne5 = document.querySelectorAll(".ligne5 td");
    var ligne4 = document.querySelectorAll(".ligne4 td");
    var ligne3 = document.querySelectorAll(".ligne3 td");
    var ligne2 = document.querySelectorAll(".ligne2 td");
    var ligne1 = document.querySelectorAll(".ligne1 td");
    var lignesArray = [ligne6, ligne5, ligne4, ligne3, ligne2, ligne1];

    //ia "intelligente" qui verif si player 1 est sur le point de gagner
    jetonJoué = IAVerifVerticale();
    if (jetonJoué !== true) {
        jetonJoué = IAVerifHorizontale();
    }
    console.log("ia jeton joué", jetonJoué);
    //section 'while' pour l'ia basique
    // iaBasiqueLignes(jetonJoué, indexAléatoire, num, nbrPlaceLibre, lignesArray);
    iaBasiqueCol(jetonJoué, indexAléatoire, num, nbrPlaceLibre, lignesArray);
    // while (jetonJoué !== true) {
    //     indexAléatoire = Math.floor(Math.random() * 7);
    //     console.log("indexrandom : ", indexAléatoire);

    //     currentRow = lignesArray[num];

    //     //boucle qui verif si il reste de la place sur une ligne
    //     for (var i = 0; i < currentRow.length; i++) {
    //         if (currentRow[i].classList[1] !== "jeton-rouge" && currentRow[i].classList[1] !== "jeton-jaune") {
    //             nbrPlaceLibre++;
    //         }
    //     }
    //     //si il y a plus de place, changer de ligne (si on est pas sur la derniere)
    //     if (nbrPlaceLibre == 0 && currentRow.classList == "ligne1") {
    //         console.log("gameover, il y a plus de place");
    //     }
    //     else if (nbrPlaceLibre == 0 && currentRow.classList !== "ligne1") {
    //         console.log("plus de place sur cette ligne : ", currentRow);
    //         num++;
    //         currentRow = lignesArray[num];
    //         console.log("IA go sur cette ligne : ", currentRow);
    //     }
    //     else {
    //         //verif si l'indexAleatoire est bien un emplacement vide (sans classe jeton)
    //         console.log("verif si l'indexAleatoire est bien un emplacement vide : ", currentRow[indexAléatoire].classList[1]
    //             , " class length ", currentRow[indexAléatoire].classList.length);
    //         if (currentRow[indexAléatoire].classList.length == 1) {
    //             //si oui, place le jeton
    //             currentRow[indexAléatoire].classList.add("jeton-jaune");
    //             //rend la case du dessus clickable
    //             lignesArray[num + 1][indexAléatoire].addEventListener("click", ajoutJeton);
    //             //transmet l'info que le jeton vient d'etre placé pour qu'il arrete de chercher (arrete le while loop)
    //             jetonJoué = true;
    //             console.log("jeton placé IA bipboop");
    //             //reset les variables pour ... ou pas?
    //             //redonne la main au player1
    //             player1 = true;
    //         }
    //     }



    // }
}


//verif suite horizontale pour IA
function IAVerifHorizontale(event) {

    var ligne6 = document.querySelectorAll(".ligne6 td");
    var ligne5 = document.querySelectorAll(".ligne5 td");
    var ligne4 = document.querySelectorAll(".ligne4 td");
    var ligne3 = document.querySelectorAll(".ligne3 td");
    var ligne2 = document.querySelectorAll(".ligne2 td");
    var ligne1 = document.querySelectorAll(".ligne1 td");
    var lignesArray = [ligne6, ligne5, ligne4, ligne3, ligne2, ligne1];


    var currentRow = lignesArray[0];
    //boucle  qui nous permet de sélectionner chaques cases contenu dans 'ligne6'
    for (var j = 0; j < 4; j++) {
        if (currentRow[j].classList[1] == "jeton-jaune" && currentRow[j + 1].classList[1] == "jeton-jaune"
            && currentRow[j + 2].classList[1] == "jeton-jaune" && currentRow[j + 3].classList.length == 1) {

            currentRow[j + 3].classList.add("jeton-jaune");
            //transmet l'info que le jeton vient d'etre placé pour qu'il arrete de chercher (arrete le while loop)
            jetonJoué = true;
            console.log("jeton placé IA bipboop");
            //reset les variables pour ... ou pas?
            //redonne la main au player1
            player1 = true;
            console.log("hAhA, I win");
            return jetonJoué;

        }
        else if (currentRow[j].classList[1] == "jeton-rouge" && currentRow[j + 1].classList[1] == "jeton-rouge"
            && currentRow[j + 2].classList[1] == "jeton-rouge" && currentRow[j + 3].classList.length == 1) {

            // console.log("ALMOST blocked you red");
            currentRow[j + 3].classList.add("jeton-jaune");
            //rend la case du dessus clickable si il y a de la place
            // console.log("query colonnesArray[i].parentElement : ", document.querySelector(".ligne"+j),j);
            if (document.querySelector(".ligne5").classList.value != "ligne1") {
                console.log("il reste de la place en haut, addeventlistener");
                lignesArray[1][j + 3].addEventListener("click", ajoutJeton);
            }
            //transmet l'info que le jeton vient d'etre placé pour qu'il arrete de chercher (arrete le while loop)
            jetonJoué = true;
            console.log("jeton placé IA bipboop");
            //reset les variables pour ... ou pas?
            //redonne la main au player1
            player1 = true;
            console.log("blocked you red");
            return jetonJoué;
        }
    }

    // boucle qui nous permet de sélectionner chaques ligne contenu dans 'lignesArray'
    for (var i = 1; i < lignesArray.length; i++) {

        currentRow = lignesArray[i];
        // console.log("current row ", currentRow);
        // console.log("lignesArray[i] ", lignesArray[i]);

        // boucle qui selectionne chaque case de : ligne5, ligne4, ligne3, ligne2, ligne1
        for (var j = 0; j < 4; j++) {
            // console.log(currentRow[j]);
            //si il detect plusieus jeton rouge avec un jeton dans la row en dessous
            if (currentRow[j].classList[1] == "jeton-jaune" && lignesArray[i - 1][j].classList.length == 2
                && currentRow[j + 1].classList[1] == "jeton-jaune" && lignesArray[i - 1][j + 1].classList.length == 2
                && currentRow[j + 2].classList[1] == "jeton-jaune" && lignesArray[i - 1][j + 2].classList.length == 2
                && currentRow[j + 3].classList.length == 1 && lignesArray[i - 1][j + 3].classList.length == 2) {

                currentRow[j + 3].classList.add("jeton-jaune");
                //transmet l'info que le jeton vient d'etre placé pour qu'il arrete de chercher (arrete le while loop)
                jetonJoué = true;
                console.log("jeton placé IA bipboop");
                //reset les variables pour ... ou pas?
                //redonne la main au player1
                player1 = true;
                console.log("hAhA, I win");
                return jetonJoué;

            }
            else if (currentRow[j].classList[1] == "jeton-rouge" && lignesArray[i - 1][j].classList.length == 2
                && currentRow[j + 1].classList[1] == "jeton-rouge" && lignesArray[i - 1][j + 1].classList.length == 2
                && currentRow[j + 2].classList[1] == "jeton-rouge" && lignesArray[i - 1][j + 2].classList.length == 2
                && currentRow[j + 3].classList.length == 1 && lignesArray[i - 1][j + 3].classList.length == 2) {

                console.log("ALMOST blocked you red");
                currentRow[j + 3].classList.add("jeton-jaune");
                //rend la case du dessus clickable si il y a de la place
                // console.log("query colonnesArray[i].parentElement : ", document.querySelector(".ligne"+j),j);
                if (document.querySelector(".ligne" + (i + 1)).classList.value != "ligne1") {
                    console.log("il reste de la place en haut, addeventlistener");
                    lignesArray[i + 1][j + 3].addEventListener("click", ajoutJeton);
                }
                //transmet l'info que le jeton vient d'etre placé pour qu'il arrete de chercher (arrete le while loop)
                jetonJoué = true;
                console.log("jeton placé IA bipboop");
                //reset les variables pour ... ou pas?
                //redonne la main au player1
                player1 = true;
                console.log("blocked you red");
                return jetonJoué;
            }
        }
    }

}

//verif suite verticale pour IA
function IAVerifVerticale(event) {

    var colonne7 = document.querySelectorAll(".colonne7");
    var colonne6 = document.querySelectorAll(".colonne6");
    var colonne5 = document.querySelectorAll(".colonne5");
    var colonne4 = document.querySelectorAll(".colonne4");
    var colonne3 = document.querySelectorAll(".colonne3");
    var colonne2 = document.querySelectorAll(".colonne2");
    var colonne1 = document.querySelectorAll(".colonne1");
    var colonnesArray = [colonne7, colonne6, colonne5, colonne4, colonne3, colonne2, colonne1];



    // première boucle qui nous permet de sélectionner chaques ligne contenu dans 'lignesArray'
    for (var i = 0; i < colonnesArray.length; i++) {

        var currentCol = colonnesArray[i];
        // console.log("current col ", currentCol);

        // deuxieme boucle qui selectionne chaque case de la liste précédement selectionné
        for (var j = 0; j < 3; j++) {

            if (currentCol[j].classList.length == 1 && currentCol[j + 1].classList[1] == "jeton-jaune"
                && currentCol[j + 2].classList[1] == "jeton-jaune" && currentCol[j + 3].classList[1] == "jeton-jaune") {

                currentCol[j].classList.add("jeton-jaune");
                //transmet l'info que le jeton vient d'etre placé pour qu'il arrete de chercher (arrete le while loop)
                jetonJoué = true;
                console.log("jeton placé IA bipboop");
                //reset les variables pour ... ou pas?
                //redonne la main au player1
                player1 = true;
                console.log("hAhA, I win");
                return jetonJoué;

            }
            else if (currentCol[j].classList.length == 1 && currentCol[j + 1].classList[1] == "jeton-rouge"
                && currentCol[j + 2].classList[1] == "jeton-rouge" && currentCol[j + 3].classList[1] == "jeton-rouge") {

                currentCol[j].classList.add("jeton-jaune");
                //rend la case du dessus clickable si il y a de la place
                // console.log("query colonnesArray[i].parentElement : ", document.querySelector(".ligne"+j),j);
                if (document.querySelector(".ligne" + (j + 1)).classList.value != "ligne1") {
                    console.log("il reste de la place en haut, addeventlistener");
                    colonnesArray[i][j - 1].addEventListener("click", ajoutJeton);
                }
                //transmet l'info que le jeton vient d'etre placé pour qu'il arrete de chercher (arrete le while loop)
                jetonJoué = true;
                console.log("jeton placé IA bipboop");
                //reset les variables pour ... ou pas?
                //redonne la main au player1
                player1 = true;
                console.log("blocked you red");
                return jetonJoué;
            }
        }
    }

}


//ia placement random par colonne
function iaBasiqueCol(jetonJoué, indexAléatoire, num, nbrPlaceLibre, lignesArray) {
    while (jetonJoué !== true) {
        indexAléatoire = Math.floor(Math.random() * 7);
        console.log("indexrandom : ", indexAléatoire);


        console.log("num : ", num);
        currentRow = lignesArray[num];
        console.log("currentRow : ", currentRow);

        console.log("currentRow[indexAléatoire] ", currentRow[indexAléatoire])
        //si la position aleatoire se trouve sur un emplacement rouge
        while (currentRow[indexAléatoire].classList.length == 2) {
            console.log("INNER currentRow[indexAléatoire] ", currentRow[indexAléatoire])
            //si la position aleatoire se trouve sur la dernière ligne en haut
            if (num == 5) {
                // boucle qui verif si il reste de la place sur la ligne
                for (var i = 0; i < currentRow.length; i++) {
                    if (currentRow[i].classList[1] !== "jeton-rouge" && currentRow[i].classList[1] !== "jeton-jaune") {
                        nbrPlaceLibre++;
                    }
                }
                if (nbrPlaceLibre == 0) {
                    alert("gameover man, no space left");
                    break;
                }
                else {
                    //si le jeux n'est pas bloqué, alors il reste forcément une place ailleur (donc re fait random)
                    indexAléatoire = Math.floor(Math.random() * 7);
                    console.log("reroll indexrandom : ", indexAléatoire);
                    num = 0;
                    console.log("reroll num : ", num);
                    currentRow = lignesArray[num];
                    console.log("currentRow after ++", currentRow);
                }

            }
            else {
                //augement position de currentRow a la row du dessus
                num++;
                console.log("num++ ", num);
                currentRow = lignesArray[num];
                console.log("currentRow after ++", currentRow);
            }
        }



        //verif si l'indexAleatoire est bien un emplacement vide (sans classe jeton)
        console.log("verif si l'indexAleatoire est bien un emplacement vide : ", currentRow[indexAléatoire].classList[1]
            , " class length ", currentRow[indexAléatoire].classList.length);
        if (currentRow[indexAléatoire].classList.length == 1) {
            //si oui, place le jeton
            currentRow[indexAléatoire].classList.add("jeton-jaune");
            //rend la case du dessus clickable
            // console.log("lignesArray[",num ,"+ 1][",indexAléatoire,"]", lignesArray[num + 1][indexAléatoire])
            //verifie si la nouvelle emplacement clickable au dessus ne dépasse pas du tableau
            if (num + 1 <= 5) {
                console.log("lignesArray[num] : ", lignesArray[num]);
                console.log(" lignesArray[num + 1][indexAléatoire] ", lignesArray[num + 1][indexAléatoire]);
                lignesArray[num + 1][indexAléatoire].addEventListener("click", ajoutJeton);
            }
            //transmet l'info que le jeton vient d'etre placé pour qu'il arrete de chercher (arrete le while loop)
            jetonJoué = true;
            console.log("jeton placé IA basique col bipboop");
            //reset les variables pour ... ou pas?
            //redonne la main au player1
            player1 = true;
        }



    }
}


//ia placement random par colonne
function iaBasiqueLignes(jetonJoué, indexAléatoire, num, nbrPlaceLibre, lignesArray) {
    while (jetonJoué !== true) {
        indexAléatoire = Math.floor(Math.random() * 7);
        console.log("indexrandom : ", indexAléatoire);

        currentRow = lignesArray[num];

        //boucle qui verif si il reste de la place sur une ligne
        for (var i = 0; i < currentRow.length; i++) {
            if (currentRow[i].classList[1] !== "jeton-rouge" && currentRow[i].classList[1] !== "jeton-jaune") {
                nbrPlaceLibre++;
            }
        }
        //si il y a plus de place, changer de ligne (si on est pas sur la derniere)
        if (nbrPlaceLibre == 0 && currentRow.classList == "ligne1") {
            console.log("gameover, il y a plus de place");
        }
        else if (nbrPlaceLibre == 0 && currentRow.classList !== "ligne1") {
            console.log("plus de place sur cette ligne : ", currentRow);
            num++;
            currentRow = lignesArray[num];
            console.log("IA go sur cette ligne : ", currentRow);
        }
        else {
            //verif si l'indexAleatoire est bien un emplacement vide (sans classe jeton)
            console.log("verif si l'indexAleatoire est bien un emplacement vide : ", currentRow[indexAléatoire].classList[1]
                , " class length ", currentRow[indexAléatoire].classList.length);
            if (currentRow[indexAléatoire].classList.length == 1) {
                //si oui, place le jeton
                currentRow[indexAléatoire].classList.add("jeton-jaune");
                //rend la case du dessus clickable
                lignesArray[num + 1][indexAléatoire].addEventListener("click", ajoutJeton);
                //transmet l'info que le jeton vient d'etre placé pour qu'il arrete de chercher (arrete le while loop)
                jetonJoué = true;
                console.log("jeton placé IA bipboop");
                //reset les variables pour ... ou pas?
                //redonne la main au player1
                player1 = true;
            }
        }



    }
}