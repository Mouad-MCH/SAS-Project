
const prompt = require("prompt-sync")();
let abonne = [];
let livres = [

  { id_livre: 123, titre: "Le Petit Prince", auteur:"Saint-Exupéry", annee: 1943, disponible: true },

  { id_livre: 456, titre: "L'Étranger", auteur: "Camus", annee:1942, disponible: true }

];

// function Ajouteabonnes() {
//   console.log("///++ Rechercher par ID ++////");
//   let id = abonne.length >0 ? Math.max(...livres.map(a => a.id))+1 : 1;
//   let nom = prompt('Nome: ');
//   let prenom = prompt('prenom: ');
//   let email = prompt("Email: ");

//   abonne.push({id,nom,prenom,email});
//   console.log(`Abonee ${prenom} ${nom} ajouté avec succès!`)
// }

// Ajouteabonnes()
// console.log(abonne)
console.log(livres)
console.log(...livres)