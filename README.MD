Codigo para rodar o projeto:
npm run start:watch   

Código para rodar o banco de dados:
npx typeorm migration:run -d dist/data-source.js


Codigo para rodar os Seeds:
node dist/run-seeds.js

Código para criar as migrations:
npx typeorm migration:create src/migration/NOME_DA_MIGRATION
