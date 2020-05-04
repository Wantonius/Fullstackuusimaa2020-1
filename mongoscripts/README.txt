Indexing testaus

Aja indexingtest.js mongo shellissä
Se kestää, koska se luo 500000 dokumenttia.

aja komento: db.users.find({"lastname":"Owens"}).explain("executionStats")

etsi objekti "executionStats" ja sieltä rivi executionTimeMillis. Pistä luku muistiin.

luo collectionille indeksi db.collection.createIndex komennolla.

db.users.createIndex({lastname:1})

aja komento: db.users.find({"lastname":"Owens"}).explain("executionStats")

Vertaa executionTime arvoja.