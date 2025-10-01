
const prompt = require("prompt-sync")();
let abonne = [{ id: 2, nom: 'lll', prenom: 'lll', email: 'lll' }];
let emprunts = [{ id_abone: 2,  id_livre: "456"}];
let livres = [

  { id_livre: "123", titre: "Le Petit Prince", auteur:"Saint-Exupéry", annee: 1943, disponible: true },

  { id_livre: "456", titre: "L'Étranger", auteur: "Camus", annee:1942, disponible: false }

];
function AfficherLEA() {
  console.log("///++ Afficher livres empruntés par abonné ++////");

  let id_abonne = Number(prompt('ID de l\'abonné:'));

  let find_abonne = abonne.find(val => val.id === val.id_abonne);
  if(!find_abonne) {
    console.log('X Abonné non trouvé.');
    return;
  }

  console.log(`:: Livres Emprunte Par ${find_abonne.prenom} ${find_abonne.nom} ==> `)

  let Find_abonne_emprunt = emprunts.filter(val => val.id_abonne === id_abonne);
  if(Find_abonne_emprunt === 0) {
    console.log("Aucun livre emprunté.");
    return;
  }

  Find_abonne_emprunt.forEach(el =>{
    let liver = livres.find(val => val.id_livre === el.id_liver)
    if(liver) {
      console.log(`[${liver.titre}]`);
    }
    
  })

}

AfficherLEA()