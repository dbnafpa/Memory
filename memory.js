    var tCartes = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg'];
    
    const NB_DOUBLONS = tCartes.length;

    var tDoublons = [];
    var tCartesTestees = [];
    var idCartes = document.getElementById("idCartes");
    var btn = document.getElementById("idBtn");
    var nbCartesTestees = 0;
    var nbDoublons = 0;
  
    // Abonner les éléments HTML
    btn.addEventListener("click", init);

    // ---- MES FONCTIONS ------------------

    /**
     * ETAPE 2
     * Initialise le tableau de doublons, le mélange
     * Et prépare les autres variables globales
     */
    function init() {
        // Ajoute le double des cartes dans le tableau
        tDoublons = tCartes.concat(tCartes);
        // Trie le tableau de cartes de façon aléatoire
        tDoublons.sort(function() { return 0.5 - Math.random(); });
        tCartesTestees = [];
        nbCartesTestees = 0;
        nbDoublons = 0;
        btn.value = "Démarrer une partie";
        
        console.log(tDoublons.join()); // Test ETAPE 2 - Affiche le tableau rangé alétoirement
        afficherCartes(tDoublons);
    }

    /**
     * ETAPE 3
     * Crée les balises <img> pour chaque carte et les ajoute au plateau de jeu
     * @param {Array<String>} tab 
     */
    function afficherCartes(tab) {
        idCartes.innerHTML = ""; // Vide la <div>

        for (i in tab) {
            //idCartes.innerHTML += "<img src='images/" + tab[i] + ".jpg' alt='carte' />";
            // Crée une balise <img>
            var image = document.createElement("img");
            //image.setAttribute("src", "images/" + tab[i]); // ETAPE 3
            image.setAttribute("src", "images/dos.jpg"); // ETAPE 4
            image.setAttribute("alt", tab[i]);
            
            // Ajoute la balise <img> dans la <div>
            idCartes.appendChild(image);

            // ETAPE 4 - Abonne chaque image au "click"
            image.addEventListener("click", retourneCarte);
        }
    }

    /**
     * ETAPE 4
     * Retourne l'image origine de l'évènement
     * @param {event} e 
     */
    function retourneCarte(e) {
        console.log("retourneCarte");

        var image = e.target;  // e.srcElement est déprécié
   
        if (image.src.includes("dos.jpg")) { // Si la carte est en phase "cachée"
            if (nbCartesTestees < 2) {
                // Retourne la carte
                image.src = "images/" + image.alt;
                // image.setAttribute("src", "images/" + image.getAttribute("alt"));
                nbCartesTestees++;
                tCartesTestees.push(image);

                // ETAPE 5 - Tester si 2ème image retournée pour lancer le Timer
                if (nbCartesTestees == 2) {
                    testDoublon();
                } 
            }
        }
    }

    /**
     * ETAPE 5 
     * Tester si 2ème image retournée pour lancer le Timer
     */
    function testDoublon() {
        console.log("testDoublon");
        // Tester si les cartes sont identiques
        if (tCartesTestees[0].alt === tCartesTestees[1].alt) {
            // ETAPE 6 : Sauvegarde des doublons valides
            tCartesTestees[0].removeEventListener("click", retourneCarte);
            tCartesTestees[1].removeEventListener("click", retourneCarte);
            nbDoublons++;
            tCartesTestees = [];
            nbCartesTestees = 0;
            
            // ETAPE 7 - Test fin de partie
            testFinPartie(); 
        } else {
            setTimeout(cacheCarte, 2000); // Lancer le timer
        }
    }

    /**
     * ETAPE 6
     * Cache les cartes retournées non valides
     */ 
    function cacheCarte() {
        console.log("cacheCarte");
        
        // ETAPE 5 - Retourne les cartes        
        tCartesTestees[0].src = "images/dos.jpg";
        tCartesTestees[1].src = "images/dos.jpg";
        tCartesTestees = [];
        nbCartesTestees = 0;
    }

    /**
     * ETAPE 7
     * Test fin de partie
     */
    function testFinPartie() {
        console.log("Fin de partie");
        if (nbDoublons === NB_DOUBLONS) {
            console.log("Bravo, vous avez gagné");
            btn.value = "Redémarrer une partie";
        }
    }