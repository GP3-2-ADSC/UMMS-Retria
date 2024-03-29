var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {

    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeEmpresa = req.body.nomeEmpresaServer;
    var cnpj = req.body.cnpjServer;
    var telefone1 = req.body.telefone1Server;
    var telefone2 = req.body.telefone2Server;
    var email = req.body.emailServer;
    var responsavel = req.body.responsavelServer;

    // Faça as validações dos valores
    if (nomeEmpresa == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu Cnpj está undefined!")
    } else if (telefone1 == undefined) {
        res.status(400).send("Seu telefone1 está undefined!")
    } else if (telefone2 == undefined) {
        res.status(400).send("Seu telefone2 está undefined!")
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (responsavel == undefined) {
        res.status(400).send("O campo responsavel está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nomeEmpresa, cnpj, telefone1, telefone2, email, responsavel)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarEndereco(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var fkEmpresa = req.body.fkEmpresaServer;

    // Faça as validações dos valores
    if (cep == undefined) {
        res.status(400).send("Seu CEP está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu numero está undefined!")
    } else if (complemento == undefined) {
        res.status(400).send("Seu complemento está undefined!")
    } else if (fkEmpresa == undefined) {
        res.status(400).send("fkEmpresa está undefined!")
    } 
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEndereco(cep, numero, complemento, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarAdmin(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeAdmin = req.body.nomeAdmServer;
    var cargo = req.body.cargoServer;
    var tel = req.body.telServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var serialKey = req.body.serialKeyServer;
    var fkEmpresa = req.body.fkEmpresaServer;


    // Faça as validações dos valores
    if (nomeAdmin == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("Sua cargo está undefined!")
    } else if (tel == undefined) {
        res.status(400).send("Seu telefone está undefined!")
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!")
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (serialKey == undefined) {
        res.status(400).send("Sua serialkey está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarAdmin(nomeAdmin, cargo, tel, email, senha, serialKey, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function carregarFkempresa(req, res) {
    let cnpj = req.params.cnpjVar;

    console.log("Na controller foi: " + cnpj);
    
    usuarioModel.carregarFkempresa(cnpj).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o valor.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function getInformacaoEmpresa(req, res) {
    let idEmpresa = req.params.idEmpresa;
    
    usuarioModel.getInformacaoEmpresa(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o valor.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function getInformacaoAdministrador(req, res) {
    let idAdmin = req.params.idAdmin;
    let idEmpresa = req.params.idEmpresa;

    usuarioModel.getInformacaoAdministrador(idAdmin,idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o valor.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function getSerialKey(req, res) {
    let email = req.params.emailAdm;
    console.log("O email na controller é: " + email);

    usuarioModel.getSerialKey(email).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o valor.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function salvarAlteracaoEmpresa(req, res) {
    let idEmpresa = req.body.idEmpresa;
    let telefone_01 = req.body.telefone_01Server;
    let telefone_02 = req.body.telefone_02Server;
    let email = req.body.emailEmpresaServer;

    if (idEmpresa == null) {
        res.status(400).send("Seu idEmpresa está undefined!");
    }  else if (telefone_01 == null) {
        res.status(400).send("Seu telefone_01 está undefined!");
    } else if (telefone_02 == null) {
        res.status(400).send("Seu telefone_02 está undefined!");
    } else if (email == null) {
        res.status(400).send("Seu email está undefined!");
    } else {
        usuarioModel.salvarAlteracaoEmpresa(idEmpresa,telefone_01,telefone_02,email)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a atualização: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function salvarAlteracaoAdmin(req, res) {
    console.log("Na controller do admin");
    let idAdmin = req.body.idAdminServer;
    let fkEmpresa = req.body.fkEmpresaServer;
    let nomeAdmin = req.body.nomeAdminServer;
    let cargo = req.body.cargoServer;
    let email = req.body.emailAdminServer;
    let telefone = req.body.telefoneServer;
   

    if (idAdmin == null) {
        res.status(400).send("Seu idAdmin está undefined!");
    }  else if (fkEmpresa == null) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else if (nomeAdmin == null) {
        res.status(400).send("Seu nomeAdmin está undefined!");
    } else if (cargo == null) {
        res.status(400).send("Seu cargo está undefined!");
    } else if (email == null) {
        res.status(400).send("Seu email está undefined!");
    } else if (telefone == null) {
        res.status(400).send("Seu telefone está undefined!");
    } else {
        usuarioModel.salvarAlteracaoAdmin(idAdmin,fkEmpresa,nomeAdmin,cargo,email,telefone)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar a atualização: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    cadastrar,
    cadastrarEndereco,
    cadastrarAdmin,
    carregarFkempresa,
    getSerialKey,
    listar,
    testar,
    getInformacaoEmpresa,
    getInformacaoAdministrador,
    salvarAlteracaoEmpresa,
    salvarAlteracaoAdmin
}