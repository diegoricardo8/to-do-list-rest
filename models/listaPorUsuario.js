const moment = require('moment')
const conexao = require('../infraestrutura/conexao')


class ListaidUsuarioPorUsuario {    

    listaidUsuarioPorUsuario(idUsuario, res) {

        const sql = 'SELECT * FROM tarefas WHERE idUsuario = ?'
        
        conexao.query(sql, idUsuario, (erro, tarefa) => {
            if (erro) {
                console.log(erro)
            } else {
                res.status(200).json(tarefa)
                console.log(tarefa)
            }
        })
    }
}

module.exports = new ListaidUsuarioPorUsuario