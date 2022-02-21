const moment = require('moment')
const conexao = require('../infraestrutura/conexao')


class ListaTarefasUserMaster {
    lista(tarefa, res) {
        const sql = 'SELECT * FROM tarefas'

        conexao.query(sql, (erro, tarefa) => {
            if (erro) {
                console.log(erro)
            } else {
                res.status(200).json(tarefa)
                console.log(tarefa)
            }

        })

    }

}

module.exports = new ListaTarefasUserMaster