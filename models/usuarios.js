const moment = require('moment');
const conexao = require('../infraestrutura/conexao');
const bcrypt = require('bcrypt');

class Usuario {

    criaUsuario(usuario, res) {

        const sql = 'INSERT INTO usuarios SET ?'
        var dataInclusao = moment().format('YYYY-MM-DD HH:MM:ss')
        var senhaEhValido = false
        var tipoUsuarioEhValido = false
        var idUsuarioEhValido = true
        var senha = usuario.senha
        var senha = usuario.senha
        var tipoUsuario = usuario.tipoUsuario
        var objetoInsert =
        {
            idUsuario: usuario.idUsuario,
            tipoUsuario: usuario.tipoUsuario,
            nomeUsuario: usuario.nomeUsuario,
            senha: senha
        }
        const erroGenerico =
        {
            descricaoErro: 'Erro na criação do usuário'
        }

        if (senha.length < 8) {
            senhaEhValido = false
        } else {
            senhaEhValido = true
        }

        if (tipoUsuario == "C") {
            tipoUsuarioEhValido = true
        } else {
            tipoUsuarioEhValido = false
        }

        const validacoes = [
            {
                nome: 'senha',
                valido: senhaEhValido,
                mensagem: 'senha deve conter 8 ou mais caracteres'
            },
            {
                nome: 'tipoUsuario',
                valido: tipoUsuarioEhValido,
                mensagem: 'Só é permitida a criação de usuários do tipo comum ("C")'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            conexao.query(sql, objetoInsert, (erro, usuario) => {
                if (erro) {

                    if (erro.errno == 1062) {
                        res.status(400).json(
                            {
                                nome: 'idUsuario',
                                valido: false,
                                mensagem: 'Esse idUsuario já está em uso, por favor escolha outro'
                            })
                    } else {
                        res.status(400).json(erroGenerico)
                        console.log(erro)
                    }
                } else {
                    res.status(201).json(usuario)
                    console.log(usuario)
                }

            })


        }
    }
}


module.exports = new Usuario