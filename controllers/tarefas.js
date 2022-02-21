const adicionaTarefas = require('../models/adicionaTarefa')
const listaTarefas = require('../models/listaTarefas')
const listaTarefasPorUsuario = require('../models/listaPorUsuario')
const verificaTipoUsuarios = require('../models/verificaTipoUsuario')
const criaUsuario = require('../models/usuarios')
const { get } = require('express/lib/response')

module.exports = app => {
   
   app.post('/usuario', (req, res) => {

      const usuario = req.body
      criaUsuario.criaUsuario(usuario, res)      

   })

   app.post('/tarefas', (req, res) => {

      const tarefa = req.body
      adicionaTarefas.adiciona(tarefa, res)

   })

   app.get('/tarefas', (req, res) => {
      const tarefa = req.headers
      const idUsuario = tarefa.idusuario
      var tipoUsuario

      verificaTipoUsuarios.buscaTipoUsuario(idUsuario, tipoUsuario)

      console.log('agora vai: ', tipoUsuario)
      
      //se usuário master (M) - Buscar as tarefas de todos os usuários
      if (tipoUsuario == 'M') {
         listaTarefas.lista(tarefa, res)
      //caso contrário listar apenas daquele usuário específico
      } else {
         listaTarefasPorUsuario.listaidUsuarioPorUsuario(idUsuario, res)
      }
   })
}