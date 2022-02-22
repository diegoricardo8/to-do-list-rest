# to-do-list-rest
To do List
Para esse projeto foram instalados os seguintes componentes:
body-parser
--save-dev nodemon
express
mysql
moment
consign

A collection postman para testes também está anexada aqui

base de dados mysql
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'admin',
    database: 'todolist'

Table: tarefas
Columns:
idTarefa int AI PK 
idUsuario char(20) 
dtHrInclusao datetime 
resumo char(50) 
descricao varchar(2000) 
status char(10) 
dtHrAlteracao datetime

Table: tarefas
Columns:
idTarefa int AI PK 
idUsuario char(20) 
dtHrInclusao datetime 
resumo char(50) 
descricao varchar(2000) 
status char(10) 
dtHrAlteracao datetime
