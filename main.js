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
    console.log("Aucun livre disponible.")
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
  console.log("///++ Ajoute un abonne ++////");
  let id = abonne.length + 1 //abonne.length >0 ? Math.max(...abonne.map(a => a.id)) + 1 : 1;
  let nom = prompt('Nome: ');
  let prenom = prompt('prenom: ');
  let email = prompt("Email: ");

  abonne.push({id,nom,prenom,email});
  console.log(`Abonee ${prenom} ${nom} ajouté avec succès!`)
}

function Afficherabonnes() {
  console.log("///++ Afficher les abonnes ++////");
  if(abonne.length === 0) {
    console.log("❌ Aucune abonnee!");
    return;
  }

  abonne.forEach(el =>  {
    console.log(`[${el.id}] ${el.prenom} ${el.nom} - ${el.email}`)
  })
}

// 5. Gestion des emprunts

function enregistrerEmprunt() {
  console.log("///++ Enregistrer un emprunt ++////");
  let id_livre = prompt("ID du Livre: ");
  let id_abonne = Number(prompt('ID d\'abonne:'));
  
  let livre = livres.find(val => val.id_livre === id_livre);
  let abone = abonne.find(val => val.id === id_abonne);

  if(!livre) {
    console.log(" X Livre non trouve");
    return;
  }else if(!livre.disponible) {
    console.log('X Livre n\'est pas disponible');
    return;
  }else if(!abone) {
    console.log('X Abonne non trouve')
  }

  livre.disponible = false;

  emprunts.push({
    id_livre,
    id_abonne,
  });

  console.log(`:> Empruent Enregistre : ${abone.prenom} ${abone.nom} a Emprunté "${livre.titre}"`)

}

function EnregistrerRetour() {
  console.log("///++ Enregistrer un retour ++////");
  let id_livre = prompt('ID du livre à retourner: ');

  let find_livre = emprunts.find(val => val.id_livre === id_livre)
  if(!find_livre) {
    console.log(" X Aucun emprunt actif trouvé pour ce livre .");
    return;
  }

  let livre = livres.find(val => val.id_livre === id_livre);
  if(livre) {
    livre.disponible = true;
    console.log(`Livre ${livre.titre} retourne avec succes!`)
  }
}

function AfficherLEA() {
  console.log("///++ Afficher livres empruntés par abonné ++////");

  let id_abonne = parseInt(prompt('ID de l\'abonné:'));

  let find_abonne = abonne.find(val => val.id === id_abonne);
  if(!find_abonne) {
    console.log('X Abonné non trouvé.');
    return;
  }

  console.log(`:: Livres Emprunte Par ${find_abonne.prenom} ${find_abonne.nom} ==> `)

  let Find_abonne_emprunt = emprunts.filter(val => val.id_abonne === id_abonne);
  if(Find_abonne_emprunt.length === 0) {
    console.log("Aucun livre emprunté.");
    return;
  }

  console.log(typeof Find_abonne_emprunt)

  Find_abonne_emprunt.forEach(el => {
    let liver = livres.find(val => val.id_livre === el.id_livre)
    if(liver) {
      console.log(`[${liver.titre}]`);
    }
    
  })

}

//********************* Menu de Gestion des emprunts ********************** */

function MenuGestionEmprunts() {
  while(true){
        console.log('\n--- GESTION DES EMPRUNTS ---');
        console.log('1. Enregistrer un emprunt');
        console.log('2. Enregistrer un retour');
        console.log('3. Afficher livres empruntés par abonné');
        console.log('4. Retour au menu principal');
    let choix = prompt('Entre votre Choix: ');

    switch(choix) {
      case '1': enregistrerEmprunt()
      break;
            case '2': EnregistrerRetour()
      break;
            case '3': AfficherLEA()
      break;
            case '4': 
            return;
      break;
      default : console.log('Option invalide.')
    }
  }
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
        case '4': 
        console.log("///++ Gestion des abonnés ++////");
        console.log("1. Ajouter un abonne");
        console.log("2. Afficher les abonnes");
        let choix = prompt("votre Choix: ");
        if(choix === '1') {
          Ajouteabonnes()
        }else {
          Afficherabonnes()
        }// Fix
    break;
        case '5': MenuGestionEmprunts();// Fix
    break;
        case '6': return;
    break;
        default : console.log("votre choix invalid!");
    break;
    }
  }
}

MenuPranc()