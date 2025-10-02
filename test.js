const prompt = require("prompt-sync")();

let livers = [
  {id_livre:"123", titre:"Hello", auteur: "Mouad charadi", annee:2020, disponible: true},
  {id_livre:"456", titre:"Cello", auteur: "Adam charadi", annee:2010, disponible: false}
];
let abonnes = [
  {id:1,nom:"CHARADI",prenom:"Mouad",Email:"dddddd"}
];
let emprunt = [];

// menu prancipale 

function Menu() {
  console.log('-------Bounjeur .....')
    console.log('1. Introduire un livre');
    console.log('2. Ajouter plusieurs livres');
    console.log('3. Opérations sur les livres');
    console.log('4. Gestion des abonnés');
    console.log('5. Gestion des emprunts');
    console.log('6. Quitter');
}

// 1. Introduire un livre

function Ajoute1() {
  console.log("---------Introduire un livre-----------");
  let id_livre = prompt('ID du livre:');
  let titre = prompt("titre: ");
  let auteur = prompt("auteur: ");
  let annee = prompt("annee: ");

  let obj_liver = {
    id_livre,
    titre,
    auteur,
    annee,
    disponible : true,
  }

  livers.push(obj_liver)
  console.log(`Ajout de '${titre}' est secces!`);

}

// 2. Ajouter plusieurs livres 

function AjoutePlusieurs() {
  console.log("---------Ajouter plusieurs livres-----------");
  let choix = +prompt('combien de livre ? : ');
  
  for(let i=1; i<=choix; i++) {
    console.log(`Livre[${i}]:`);
    Ajoute1()
  }
}


// 3. Opérations sur les livres

function Omenu() {
  console.log('-------Opérations sur les livres-------');
  console.log('1. Afficher tous les livres');
  console.log('2. Trier par titre (A-Z)');
  console.log('3. Trier par titre (Z-A)');
  console.log('4. Afficher livres disponibles');
  console.log('5. Rechercher par ID');
  console.log('6. Retour au menu principal');
}

    /// Afficher tous les livres

function AfficherTous() {
  console.log('-------Afficher tous les livres-------');
  if(livers.length === 0) {
    console.log('X Aucun non livre');
    return;
  }

  livers.forEach(el => {
    const isDispo = el.disponible ? 'Disponible':'Pas Disponible';
    console.log(`[${el.id_livre}] - "${el.titre}" (${el.auteur} => ${isDispo})`)
  })
}

    /// Trier par titre

function TrierParTitre(order = "anc") {
    console.log('-------Trier par titre-------');
  let liver = livers.sort((a,b) => {
    if(order === "anc") {
      return a.titre.localeCompare(b.titre)
    }else {
      return b.titre.localeCompare(a.titre)
    }
  })

  console.log(`Trier par titre ${order} :`)

  liver.forEach(el => {
    console.log(`"${el.titre}" - ${el.auteur}` )
  })
}

    /// Afficher livres disponibles

function AfficherLD() {
    console.log('-------Afficher livres disponibles-------');
    let liver = livers.filter(e => e.disponible)

    if(liver.length === 0) {
      console.log('X Aucun Livre Disponible');
      return;
    }

    liver.forEach(el => {
      console.log(`"${el.titre}" - ${el.auteur} (${el.annee})`);
    })
}


    /// Rechercher par ID 

function RechercherParID() {
      console.log('-------Rechercher par ID -------');
    let id = prompt("Donne ID Livre: ");
    let find_liver = livers.find(val => val.id_livre === id);
    if(!find_liver) {
      console.log("X Aucun livre trouvé avec cet ID.");
      return;
    }
    console.log(`"${find_liver.titre}" - ${find_liver.auteur} (${find_liver.annee})`);
    console.log(`statue : ${find_liver.disponible ? 'Disponible' : 'pas Disponible'}`)
} 


// 4. Gestion des abonnés 

    // Menu de Gestion des abonnés 
    function MenuAbonne() {
      console.log("1. Ajoute abonne");
      console.log("2. Afficher abonne");
    }
function AjouteAbonne() {
  let id = abonnes.length + 1;
  let nom = prompt("nom: ");
  let prenom = prompt("Prenom: ");
  let Email = prompt("Email: ");

  abonnes.push({id,nom,prenom,Email});
  console.log(` Abonne  ${prenom} ${nom} est secces!`);
}

function AfficherAbonne() {
  if(abonnes.length === 0) {
    console.log("X Aucun abonne");
    return;
  }

  abonnes.forEach(el=> {
    console.log(`[${el.id}]- ${el.prenom} ${el.nom} - ${el.Email}`)
  })
  
}

// 5. Gestion des emprunts

  /// 

  function enregistrerEmprunt() {
    let id_abonne = +prompt('ID Abonne: ');
    let id_livre = prompt('ID livre: ');

    let find_abonne = abonnes.find(fin => fin.id === id_abonne);
    let find_livre = livers.find(fin => fin.id_livre === id_livre)
    if(!find_abonne) {
      console.log('X Abonne non trouve');
      return;
    } else if(!find_livre) {
      console.log(" X Livre non trouve");
    return;
    }else if(!find_livre.disponible) {
    console.log('X Livre n\'est pas disponible');
    return;
    }

    find_abonne.disponible = false;
    emprunt.push({id_abonne,id_livre});
    console.log(`"${find_abonne.prenom} ${find_abonne.nom} a Emprunte "${find_livre.titre}""`)
  }



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


/********** Operation Menu ******* */

function MenuOperations() {
  while(true){
  Omenu()
  let choix = prompt("choisez un Operation: ");

  switch(choix) {
    case '1': AfficherTous()
    break;
        case '2': TrierParTitre('anc')
    break;
        case '3': TrierParTitre('danc')
    break;
        case '4': AfficherLD()
    break;
        case '5': RechercherParID()
    break;
        case '6': 
        return;
    break;
    default : console.log('Option invalide.')
  }
  prompt("Appuyez sur Entrée pour continuer...")
}
}


/********* Menu prancipale ******** */

function MenuPrancipale() {
  while(true) {
    Menu();
      let choix = prompt("choisez un Operation: ");

  switch(choix) {
    case '1': Ajoute1()
    break;
        case '2': AjoutePlusieurs()
    break;
        case '3': MenuOperations()
    break;
        case '4': 
        MenuAbonne()
        let choix = prompt('choix : ');
        if(choix === '1') {
          AjouteAbonne()
        }else {
          AfficherAbonne()
        }
    break;
        case '5': MenuGestionEmprunts()
    break;
        case '6': 
        return;
    break;
    default : console.log('Option invalide.')
  }
  }

}
MenuPrancipale()