const prompt = require("prompt-sync")();

let livres = [];
let abonne = [];
let emprunts = [];

// Function Menu

function menu() {
    console.log('\n === Gestion d’une Bibliothèque ==');
    console.log('1. Introduire un livre');
    console.log('2. Ajouter plusieurs livres');
    console.log('3. Opérations sur les livres');
    console.log('4. Gestion des abonnés');
    console.log('5. Gestion des emprunts');
    console.log('6. Quitter');
}

// 1. Introduire un livre

function Ajouter1() {
  console.log("///++ Introduire un livre ++////");
  let id_livre = prompt("ID du livre: ");
  let titre = prompt("titre: ");
  let auteur = prompt("Auteur: ");
  let annee = prompt("Année de publication : ");

  let obj_Livre = {
    id_livre,
    titre,
    auteur,
    annee,
    disponible: true
  }

  livres.push(obj_Livre);
  console.log(`livre ${titre} succès!`);
}


// 2. Ajouter plusieurs livres

function plusieurs() {
    console.log("///++ Ajouter plusieurs livres ++////");
    let x = Number(prompt("Combien de livres voulez-vous ajouter?: "));

    for(let i = 0; i<x; i++) {
      console.log(`livre[${i+1}]:`);
      Ajouter1()
    }
}

// 3. Opérations sur les livres

function MenuOperations() {
  console.log("///++ Opérations sur les livres ++////");
  console.log('1. Afficher tous les livres');
  console.log('2. Trier par titre (A-Z)');
  console.log('3. Trier par titre (Z-A)');
  console.log('4. Afficher livres disponibles');
  console.log('5. Rechercher par ID');
  console.log('6. Retour au menu principal');
}

//**** */

function Affichertous() {
  console.log("///++ Afficher tous les livres ++////");
  if(livres.length === 0) {
    console.log("aucune livre ...!")
    return;
  }

  livres.forEach(el => {
    const dispo = el.disponible == true ? "Disponible": "Pas disponible"
    console.log(`[${el.id_livre}] "${el.titre}" - ${el.auteur} (${el.annee}) -> ${dispo}`);
  })
}


/** */

function TrierParTitre(order = "ascendant") {
  console.log("///++ Trier par titre ++////");
  let liveres_title = livres.sort((a,b) => {
    if(order === "ascendant") {
      return a.titre.localeCompare(b.titre);
    } else {
      return b.titre.localeCompare(a.titre);
    }
  })

  console.log(`//++  Trier par titre ${order} ++//`)
    liveres_title.forEach(el=> {
    console.log(`"${el.titre}" - ${el.auteur}` )
  })
}

/** */

function livresdisponibles() {
  console.log("///++ Afficher livres disponibles ++////");
  let dispoTrue = livres.filter(val => val.disponible)

  if(dispoTrue.length === 0) {
    console.lo("Aucun livre disponible.")
    return;
  }

  dispoTrue.forEach(el=> {
      console.log(`"${el.titre}" - ${el.auteur} (${el.annee})`);
  })
}

function RechercherParID() {
  console.log("///++ Rechercher par ID ++////");
  let id = prompt("Entree ID de livre: ");
  let find = livres.find(fin => fin.id_livre === id)
  if(find) {
  
      console.log(`"${livres.titre}" - ${livres.auteur} (${livres.annee})`);
      console.log(`statue: ${livres.disponible ? 'Disponible' : 'pas Disponible'}`)
    
  } else {
    console.log("Aucun livre trouvé avec cet ID.")
  }
}


// 4. Gestion des abonnés

function Ajouteabonnes() {
  console.log("///++ Rechercher par ID ++////");
  let id = 1;
  let nom = prompt('Nome: ');
  let prenom = prompt('prenom: ');
  let email = prompt("Email: ");

  abonne.push({id,nom,prenom,email});
  console.log(`Abonee ${prenom} ${nom} ajouté avec succès!`)
}



// ************** Operation sur Les Livres ************//

function MinuOperationLivers() {
  while(true){
    MenuOperations();
    let chose = prompt('Choisissez une option: ');
  
    switch(chose) {
    case '1': Affichertous();
    break;
        case '2': TrierParTitre('ascendant');
    break;
        case '3': TrierParTitre('descendant');
    break;
        case '4': livresdisponibles();
    break;
        case '5': RechercherParID();
    break;
        case '6': return;
    break;
        default : console.log("votre choix invalid!");
    break;
    }
      
    prompt("Appuyez sur Entrée pour continuer...")

  }
  
}






//**************  Menu Prancipale ************* */

function MenuPranc() {
  while(true) {
    menu()
    let chose = prompt('Choisissez une option: ');
  
    switch(chose) {
    case '1': Ajouter1();
    break;
        case '2': plusieurs();
    break;
        case '3': MinuOperationLivers();
    break;
        case '4': livresdisponibles();// Fix
    break;
        case '5': RechercherParID();// Fix
    break;
        case '6': return;
    break;
        default : console.log("votre choix invalid!");
    break;
    }
  }
}

MenuPranc()