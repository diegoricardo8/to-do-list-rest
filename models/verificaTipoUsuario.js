const moment = require('moment')
const conexao = require('../infraestrutura/conexao')


class BuscaTipoUsuario {    

    buscaTipoUsuario(idUsuario, res) {

        const sql = 'SELECT tipoUsuario FROM usuarios WHERE idUsuario = ?'
        
        conexao.query(sql, idUsuario, (erro, usuarios) => {
            if (erro) {
                console.log(erro)
            } else {
                res.status(200).json(usuarios)
                console.log(usuarios)
            }
        })
    }
}

module.exports = new BuscaTipoUsuario