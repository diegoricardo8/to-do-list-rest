const tarefas = require('../models/tarefa')
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
      const idTarefa = tarefa.idTarefa

      console.log('chegouuuuu', idTarefa)
      if(idTarefa == undefined){
         tarefas.adiciona(tarefa, res)
      }else{
         console.log('chamei o atualiza', idTarefa)
         tarefas.atualiza(tarefa, res)
      }
      

   })

   app.get('/tarefas', (req, res) => {
      const tarefa = req.headers
      var idUsuario = tarefa.idusuario
      var tipoUsuario = tarefa.tipousuario


      tarefas.lista(idUsuario, tipoUsuario, res)

   })
}