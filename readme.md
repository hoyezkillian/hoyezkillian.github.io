# Killian Hoyez — Portfolio

Portfolio personnel d'un étudiant en **BTS SIO option SISR** (Systèmes et Réseaux) à MyDigitalSchool, Saint-Herblain, à la recherche d'une **alternance en infrastructure, réseaux et cybersécurité**.

Le site présente mon parcours, mes compétences, mes projets et l'ensemble de mon dossier BTS (veille technologique, projets, tableau de synthèse E5, certifications).

**Site en ligne : [khoyez.me](https://khoyez.me/)**

---

## Sommaire

- [Aperçu du site](#aperçu-du-site)
- [Dossier BTS](#dossier-bts)
- [Technologies et design](#technologies-et-design)
- [Structure du dépôt](#structure-du-dépôt)
- [Déploiement](#déploiement)
- [Feuille de route](#feuille-de-route)
- [Contact](#contact)

---

## Aperçu du site

La page d'accueil est découpée en six sections :

| N° | Section | Contenu |
|----|---------|---------|
| 00 | Accueil | Présentation, accès rapide au dossier BTS et au contact |
| 01 | À propos | Profil, formation, établissement, aperçu et téléchargement du CV |
| 02 | Compétences | Développement web, réseaux et systèmes, support et bonnes pratiques, scripts et expérimentation |
| 03 | Parcours | Formation (BTS SIO, Bac Pro CIEL), stages et expériences en entreprise |
| 04 | Dossier BTS | Accès à l'espace dédié à mon dossier BTS |
| 05 | Contact | E-mail, GitHub, LinkedIn et formulaire de contact (FormSpree) |

Autres éléments : aperçu du CV dans une fenêtre dédiée, retour en haut de page, navigation fixe, curseur personnalisé et effets de fond réactifs (grille) sur les sections.

---

## Dossier BTS

Le dossier BTS dispose de sa propre page, accessible depuis la section 04 de l'accueil. Elle regroupe quatre dossiers, chacun avec sa page dédiée :

1. **Veille technologique** : cryptographie post-quantique (menace des ordinateurs quantiques sur le chiffrement actuel, standards du NIST, conséquences sur les infrastructures).
2. **Projets personnels** : une maquette virtualisée réunissant l'installation d'OS sous VirtualBox, Active Directory avec GPO, et GLPI 11 sur Debian 13, présentée étape par étape avec captures d'écran et PDF téléchargeables.
3. **Tableau E5** : tableau de synthèse des réalisations professionnelles.
4. **Certifications** : certifications et formations complémentaires.

---

## Technologies et design

- **HTML5, CSS3 et JavaScript** sans framework, avec séparation des fichiers HTML, CSS et JS
- **Design** : thème sombre avec accent vert, sections claires en alternance (fond crème), typographie très grande pour les titres, cartes numérotées avec tags, effets de grille réactifs
- **Formulaire de contact** : [FormSpree](https://formspree.io/)
- **Hébergement** : GitHub Pages, avec nom de domaine personnalisé `khoyez.me` (Namecheap)

---

## Structure du dépôt

> Arborescence indicative : à ajuster selon l'état réel du dépôt.

```text
hoyezkillian.github.io/
├── index.html                 # Page d'accueil
├── index.css                  # Styles de l'accueil
├── dossier-bts.html           # Page du dossier BTS
├── projets/                   # Page des projets personnels
├── parcours-professionnel/    # Page du parcours professionnel
├── assets/                    # Images, PDF, polices et autres ressources
├── CNAME                      # Domaine personnalisé (khoyez.me)
└── README.md
```

---

## Déploiement

### GitHub Pages (khoyez.me)

- Dépôt : [hoyezkillian/hoyezkillian.github.io](https://github.com/hoyezkillian/hoyezkillian.github.io)
- Source de publication : **Deploy from a branch**, branche `main`
- Domaine personnalisé configuré via le fichier `CNAME` et la zone DNS de Namecheap
- Chaque `git push` sur `main` met le site à jour

### Hébergement Infomaniak

Le site est également publié sur un hébergement Infomaniak, par transfert FTP (FileZilla).

Un script de déploiement est prévu (Python ou PowerShell) : `git pull`, détection des fichiers modifiés, connexion FTP et envoi uniquement des fichiers modifiés.

---

## Feuille de route

- [x] Page d'accueil responsive avec les sections Accueil, À propos, Compétences, Parcours et Contact
- [x] Mise en ligne sur `khoyez.me` (GitHub Pages) et sur Infomaniak
- [x] Page dédiée au dossier BTS avec accès à la veille, aux projets, au tableau E5 et aux certifications
- [x] Sitemap et amélioration du référencement organique
- [x] Séparation complète HTML / JavaScript / CSS / PHP
- [ ] Stockage des données du site dans des fichiers JSON
- [x] Espace d'administration (backoffice) sécurisé, dès qu'un serveur sera disponible
- [x] Script de déploiement automatique par FTP ( https://killian.hoyez.mds-nantes.fr/ )

---

## Contact

- Site : [khoyez.me](https://khoyez.me/)
- GitHub : [@hoyezkillian](https://github.com/hoyezkillian)
- E-mail : hoyezkillian@gmail.com
- LinkedIn : lien disponible sur le site

---

© 2026 Killian Hoyez. Tous droits réservés.
