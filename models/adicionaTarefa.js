const moment = require('moment')
const conexao = require('../infraestrutura/conexao')


class AdicionaTarefa {
    adiciona(tarefa, res) {

        const sql = 'INSERT INTO tarefas SET ?'
        var dataInclusao = moment().format('YYYY-MM-DD HH:MM:ss')
        var statusEhValido = false
        var status = tarefa.status
        var objetoInsert =
        {
            idUsuario: tarefa.idUsuario,
            dtHrInclusao: dataInclusao,
            resumo: tarefa.resumo,
            descricao: tarefa.descricao,
            status: tarefa.status
        }
        
        if (status == 'Pending') {
            statusEhValido = true
        } else {
            if (status == 'Completed') {
                statusEhValido = true

            } else {
                statusEhValido = false
            }

        }

        const validacoes = [
            {
                nome: 'status',
                valido: statusEhValido,
                mensagem: 'Status da tarefa deve ser Pending ou Completed'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            conexao.query(sql, objetoInsert, (erro, tarefa) => {
                if (erro) {
                    console.log(erro)
                } else {
                    res.status(201).json(tarefa)
                    console.log(tarefa)
                }

            })

        }
    }
}

module.exports = new AdicionaTarefa