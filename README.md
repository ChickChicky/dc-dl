# DC & DL

Un petit projet assez simple qui permet de trouver des solutions pour *le mot le plus long* et *le compte est bon* du jeu *Des Chiffres Et Des Lettres*.
<br>
Il ne requiert aucune librairie externe et est testé avec **Node v19.8.1** (mais devrait pouvoir fonctionner avec des versions antérieures).



# dc.js

Pour *le compte est bon*, une fois le script lancé, il faut entrer les nombres à disposition séparés par des espaces, après, il faut entrer le nombre à atteindre et ensuite, pendant quelques secondes il va chercher la meilleure solution et l'afficher au fur et à mesure, et si il stoppe plus tôt si il trouve une solution qui fait atteindre le nombre cible.



# dl.js

Pour *le mot le plus long*, un fois le script lancé, il faut entrer les lettres à disposition. Le dico est très complet (et mon algo pas super au point) donc ça prend quelques secondes, puis ça affiche tous les mots pouvant être formés à partir des lettres données, triés des plus longs au plus courts.