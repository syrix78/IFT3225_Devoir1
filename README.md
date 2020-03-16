# IFT 3225: Devoir 1


Ce devoir est un jeu musical sur le [Cycle des quintes](https://fr.wikipedia.org/wiki/Tonalit%C3%A9_relative). Pour répondre aux questions, il suffit d'entrer la note sur le piano virtuel (Avec les touches du clavier ou en appuyant sur les touches du piano virtuel) ou de cliquer sur la bonne réponse parmi les choix proposés.

## Auteurs

* Lucas Hornung
* Francois Marchand

## Hébergement
Le devoir est hébergé sur le WebDépot de l'Université de Montréal et est consultable à l'adresse suivante: https://www.webdepot.umontreal.ca/Usagers/p1163867/MonDepotPublic/IFT3225Devoir1/index.html

## Technologies utilisées

* HTML (index.html)
* CSS (style.css)
* JavaScript (game.js)
* BootStrap
* [JS Piano](https://codepen.io/gabrielcarol/full/rGeEbY): Modifié afin de supporter les appareils à écran tactile.

## game.js

Ce fichier contient toute la logique du jeu, que ce soit la génération de questions, le système de points ou alors [JS Piano](https://codepen.io/gabrielcarol/full/rGeEbY). Ce fichier est divisé en 3 sections:
* Question/Answer Generation: Cette partie du code génère de façon aléatoire les questions et les réponses associées.
* Questions/Answers Engine: Cette partie du code affiche les questions, gère le système de points et vérifie les réponses de l'utilisateur. Il s'agit de la partie principale du système de questions/réponses de ce devoir.
* Javascript Piano: Code Javascript de [JS Piano](https://codepen.io/gabrielcarol/full/rGeEbY) qui a été modifié pour supporter les appareils à écran tactile.

