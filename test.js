const readline = require('readline-sync')();

// Structures de données
let livres = [
    { id_livre: "123", titre: "Le Petit Prince", auteur: "Saint-Exupéry", année: 1943, disponible: true },
    { id_livre: "456", titre: "L'Étranger", auteur: "Camus", année: 1942, disponible: true }
];

let abonnes = [
    { id: 1, nom: "Dupont", prenom: "Alice", email: "alice@mail.com" }
];

let emprunts = [];

// Fonction pour afficher le menu principal
function afficherMenuPrincipal() {
    console.log('\n=== SYSTÈME DE GESTION DE BIBLIOTHÈQUE ===');
    console.log('1. Introduire un livre');
    console.log('2. Ajouter plusieurs livres');
    console.log('3. Opérations sur les livres');
    console.log('4. Gestion des abonnés');
    console.log('5. Gestion des emprunts');
    console.log('6. Quitter');
}

// 1. Introduire un livre
function introduireLivre() {
    console.log('\n--- INTRODUCTION D\'UN LIVRE ---');
    const id_livre = readline.question('ID du livre: ');
    const titre = readline.question('Titre: ');
    const auteur = readline.question('Auteur: ');
    const année = parseInt(readline.question('Année de publication: '));
    
    const nouveauLivre = {
        id_livre,
        titre,
        auteur,
        année,
        disponible: true
    };
    
    livres.push(nouveauLivre);
    console.log(`✓ Livre "${titre}" ajouté avec succès!`);
}

// 2. Ajouter plusieurs livres
function ajouterPlusieursLivres() {
    console.log('\n--- AJOUT MULTIPLE DE LIVRES ---');
    const nombre = parseInt(readline.question('Combien de livres voulez-vous ajouter? '));
    
    for (let i = 0; i < nombre; i++) {
        console.log(`\nLivre ${i + 1}:`);
        introduireLivre();
    }
}

// 3. Opérations sur les livres
function afficherTousLesLivres() {
    console.log('\n--- TOUS LES LIVRES ---');
    if (livres.length === 0) {
        console.log('Aucun livre dans la bibliothèque.');
        return;
    }
    
    livres.forEach(livre => {
        const statut = livre.disponible ? '✅ Disponible' : '❌ Emprunté';
        console.log(`[${livre.id_livre}] "${livre.titre}" - ${livre.auteur} (${livre.année}) - ${statut}`);
    });
}

function trierLivresParTitre(ordre = 'ascendant') {
    const livresTries = [...livres].sort((a, b) => {
        if (ordre === 'ascendant') {
            return a.titre.localeCompare(b.titre);
        } else {
            return b.titre.localeCompare(a.titre);
        }
    });
    
    console.log(`\n--- LIVRES TRIÉS PAR TITRE (${ordre}) ---`);
    livresTries.forEach(livre => {
        console.log(`"${livre.titre}" - ${livre.auteur}`);
    });
}

function afficherLivresDisponibles() {
    const disponibles = livres.filter(livre => livre.disponible);
    
    console.log('\n--- LIVRES DISPONIBLES ---');
    if (disponibles.length === 0) {
        console.log('Aucun livre disponible.');
        return;
    }
    
    disponibles.forEach(livre => {
        console.log(`"${livre.titre}" - ${livre.auteur} (${livre.année})`);
    });
}

function rechercherLivreParID() {
    const id = readline.question('\nID du livre à rechercher: ');
    const livre = livres.find(l => l.id_livre === id);
    
    if (livre) {
        console.log(`\nLivre trouvé: "${livre.titre}" - ${livre.auteur} (${livre.année})`);
        console.log(`Statut: ${livre.disponible ? 'Disponible' : 'Emprunté'}`);
    } else {
        console.log('✗ Aucun livre trouvé avec cet ID.');
    }
}

// 4. Gestion des abonnés
function ajouterAbonne() {
    console.log('\n--- AJOUT D\'UN ABONNÉ ---');
    const id = abonnes.length > 0 ? Math.max(...abonnes.map(a => a.id)) + 1 : 1;
    const nom = readline.question('Nom: ');
    const prenom = readline.question('Prénom: ');
    const email = readline.question('Email: ');
    
    abonnes.push({ id, nom, prenom, email });
    console.log(`✓ Abonné ${prenom} ${nom} ajouté avec succès!`);
}

function afficherTousLesAbonnes() {
    console.log('\n--- TOUS LES ABONNÉS ---');
    if (abonnes.length === 0) {
        console.log('Aucun abonné enregistré.');
        return;
    }
    
    abonnes.forEach(abonne => {
        console.log(`[${abonne.id}] ${abonne.prenom} ${abonne.nom} - ${abonne.email}`);
    });
}

// 5. Gestion des emprunts
function enregistrerEmprunt() {
    console.log('\n--- ENREGISTREMENT D\'UN EMPRUNT ---');
    const id_livre = readline.question('ID du livre: ');
    const id_abonne = parseInt(readline.question('ID de l\'abonné: '));
    
    const livre = livres.find(l => l.id_livre === id_livre);
    const abonne = abonnes.find(a => a.id === id_abonne);
    
    if (!livre) {
        console.log('✗ Livre non trouvé.');
        return;
    }
    if (!abonne) {
        console.log('✗ Abonné non trouvé.');
        return;
    }
    if (!livre.disponible) {
        console.log('✗ Ce livre n\'est pas disponible.');
        return;
    }
    
    // Marquer le livre comme non disponible
    livre.disponible = false;
    
    // Enregistrer l'emprunt
    emprunts.push({
        id_livre,
        id_abonne,
        dateEmprunt: new Date().toISOString().split('T')[0]
    });
    
    console.log(`✓ Emprunt enregistré: ${abonne.prenom} ${abonne.nom} a emprunté "${livre.titre}"`);
}

function enregistrerRetour() {
    console.log('\n--- ENREGISTREMENT D\'UN RETOUR ---');
    const id_livre = readline.question('ID du livre à retourner: ');
    
    const emprunt = emprunts.find(e => e.id_livre === id_livre && !e.dateRetour);
    if (!emprunt) {
        console.log('✗ Aucun emprunt actif trouvé pour ce livre.');
        return;
    }
    
    const livre = livres.find(l => l.id_livre === id_livre);
    if (livre) {
        livre.disponible = true;
        emprunt.dateRetour = new Date().toISOString().split('T')[0];
        console.log(`✓ Livre "${livre.titre}" retourné avec succès!`);
    }
}

function afficherLivresEmpruntesParAbonne() {
    const id_abonne = parseInt(readline.question('\nID de l\'abonné: '));
    const abonne = abonnes.find(a => a.id === id_abonne);
    
    if (!abonne) {
        console.log('✗ Abonné non trouvé.');
        return;
    }
    
    const empruntsAbonne = emprunts.filter(e => e.id_abonne === id_abonne && !e.dateRetour);
    
    console.log(`\n--- LIVRES EMPRUNTÉS PAR ${abonne.prenom} ${abonne.nom} ---`);
    if (empruntsAbonne.length === 0) {
        console.log('Aucun livre emprunté.');
        return;
    }
    
    empruntsAbonne.forEach(emprunt => {
        const livre = livres.find(l => l.id_livre === emprunt.id_livre);
        if (livre) {
            console.log(`- "${livre.titre}" (emprunté le ${emprunt.dateEmprunt})`);
        }
    });
}

// Menu des opérations sur les livres
function menuOperationsLivres() {
    while (true) {
        console.log('\n--- OPÉRATIONS SUR LES LIVRES ---');
        console.log('1. Afficher tous les livres');
        console.log('2. Trier par titre (A-Z)');
        console.log('3. Trier par titre (Z-A)');
        console.log('4. Afficher livres disponibles');
        console.log('5. Rechercher par ID');
        console.log('6. Retour au menu principal');
        
        const choix = readline.question('Choisissez une option: ');
        
        switch(choix) {
            case '1':
                afficherTousLesLivres();
                break;
            case '2':
                trierLivresParTitre('ascendant');
                break;
            case '3':
                trierLivresParTitre('descendant');
                break;
            case '4':
                afficherLivresDisponibles();
                break;
            case '5':
                rechercherLivreParID();
                break;
            case '6':
                return;
            default:
                console.log('Option invalide.');
        }
        
        readline.question('Appuyez sur Entrée pour continuer...');
    }
}

// Menu de gestion des emprunts
function menuGestionEmprunts() {
    while (true) {
        console.log('\n--- GESTION DES EMPRUNTS ---');
        console.log('1. Enregistrer un emprunt');
        console.log('2. Enregistrer un retour');
        console.log('3. Afficher livres empruntés par abonné');
        console.log('4. Retour au menu principal');
        
        const choix = readline.question('Choisissez une option: ');
        
        switch(choix) {
            case '1':
                enregistrerEmprunt();
                break;
            case '2':
                enregistrerRetour();
                break;
            case '3':
                afficherLivresEmpruntesParAbonne();
                break;
            case '4':
                return;
            default:
                console.log('Option invalide.');
        }
        
        readline.question('Appuyez sur Entrée pour continuer...');
    }
}

// Fonction principale
function main() {
    console.log('🚀 BIENVENUE AU SYSTÈME DE GESTION DE BIBLIOTHÈQUE');
    
    while (true) {
        afficherMenuPrincipal();
        const choix = readline.question('Choisissez une option (1-6): ');
        
        switch(choix) {
            case '1':
                introduireLivre();
                break;
            case '2':
                ajouterPlusieursLivres();
                break;
            case '3':
                menuOperationsLivres();
                break;
            case '4':
                console.log('\n--- GESTION DES ABONNÉS ---');
                console.log('1. Ajouter un abonné');
                console.log('2. Afficher tous les abonnés');
                const choixAbonne = readline.question('Choisissez: ');
                if (choixAbonne === '1') ajouterAbonne();
                else if (choixAbonne === '2') afficherTousLesAbonnes();
                break;
            case '5':
                menuGestionEmprunts();
                break;
            case '6':
                console.log('Merci d\'avoir utilisé notre système. Au revoir! 👋');
                return;
            default:
                console.log('❌ Choix invalide. Veuillez choisir entre 1 et 6.');
        }
        
        readline.question('\nAppuyez sur Entrée pour continuer...');
    }
}

// Démarrer l'application
main();