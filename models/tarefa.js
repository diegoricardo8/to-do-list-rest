const moment = require('moment')
const conexao = require('../infraestrutura/conexao')


class Tarefa {
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
        var objetoErroUsuarioNaoCadastrado =
        {
            motivoErro: 'idUsuario não cadastrado, você só pode cadastrar uma tarefa caso tenha um usuário válido'
        }
        var objetoResposta =
        {
            idTarefa: Number,
            mensagem: 'Guarde esse id em seu sistema para posterior atualização de status da tarefa'
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
                    if(erro.errno == 1452){
                        res.status(400).json(objetoErroUsuarioNaoCadastrado)
                    }                    
                    console.log(erro)
                } else {
                    objetoResposta.idTarefaCriada = tarefa.insertId
                    
                    res.status(201).json(objetoResposta)

                    console.log(tarefa)
                }

            })

        }
    }

    lista(idUsuario, tipoUsuario, res) {
        const sql = 'SELECT * FROM tarefas'
        const sqlWhere = 'SELECT * FROM tarefas WHERE idUsuario = ? ORDER BY status DESC, dtHrInclusao DESC'
        var idUsuarioEhValido = false
        var tipoUsuarioEhValido = false

        if (idUsuario == undefined) {
            idUsuarioEhValido = false
        } else {
            idUsuarioEhValido = true
        }

        if (tipoUsuario == undefined) {
            tipoUsuarioEhValido = false
        } else {
            tipoUsuarioEhValido = true
        }
        const validacoes = [
            {
                nome: 'idUsuario',
                valido: idUsuarioEhValido,
                mensagem: 'idUsuario é obrigatório no header da requisição'
            },
            {
                nome: 'tipoUsuario',
                valido: tipoUsuarioEhValido,
                mensagem: 'tipoUsuario é obrigatório no header da requisição'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            //buscar lista completa se for tipo usuario 'M' - MASTER
            if (tipoUsuario == 'M') {
                conexao.query(sql, (erro, tarefa) => {
                    if (erro) {
                        console.log(erro)
                    } else {
                        res.status(200).json(tarefa)
                        console.log(tarefa)
                    }

                })

            } else {
                conexao.query(sqlWhere, idUsuario, (erro, tarefa) => {
                    if (erro) {
                        console.log(erro)
                    } else {
                        res.status(200).json(tarefa)
                        console.log(tarefa)
                    }

                })
            }

        }
    }

    atualiza(tarefa, res) {
        
        const auxSql = 'UPDATE tarefas SET ? WHERE idTarefa = '        
        
        var dataAlteracao = moment().format('YYYY-MM-DD HH:MM:ss')
        var statusEhValido = false
        var status = tarefa.status
        var idTarefa = tarefa.idTarefa

        const sql = auxSql + idTarefa
        
        var objetoUpdate =
        {
            idTarefa: tarefa.idTarefa,
            dtHrAlteracao: dataAlteracao,
            resumo: tarefa.resumo,
            descricao: tarefa.descricao,
            status: tarefa.status
        }
        console.log('chegou no metodo, obj update:', objetoUpdate)
        console.log('chegou no metodo, id tarefa:', idTarefa)      
        

        var objetoResposta =
        {
            mensagem: 'Guarde esse id em seu sistema para posterior atualização de status da tarefa'
        }

        console.log('criou obj resposta')

        if (status == 'Pending') {
            statusEhValido = true
        } else {
            if (status == 'Completed') {
                statusEhValido = true

            } else {
                statusEhValido = false
            }

        }
        console.log('validou status')

        const validacoes = [
            {
                nome: 'status',
                valido: statusEhValido,
                mensagem: 'Status da tarefa deve ser Pending ou Completed'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length
        console.log('validou status de novo')
        if (existemErros) {
            console.log('existemErros')
            res.status(400).json(erros)
        } else {
            conexao.query(sql, objetoUpdate, (erro, tarefa) => {
                if (erro) {
                    console.log('existemErros sql')
                    res.status(400).json(erro)                    
                    console.log(erro)
                } else {                    
                    console.log('sucesso sql')
                    res.status(204).json(tarefa)
                    console.log(tarefa)
                }

            })

        }
    }
}



module.exports = new Tarefa