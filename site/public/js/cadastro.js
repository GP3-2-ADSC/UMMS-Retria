function cadastrar(empresaStorage) {
    console.log("estou no fetch " + empresaStorage[0],
        empresaStorage[1],
        empresaStorage[2],
        empresaStorage[3],
        empresaStorage[4],
        empresaStorage[5]);


    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeEmpresaServer: empresaStorage[0],
            cnpjServer: empresaStorage[1],
            telefone1Server: empresaStorage[2],
            telefone2Server: empresaStorage[3],
            emailServer: empresaStorage[4],
            responsavelServer: empresaStorage[5]
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {

            carregarFkempresa(empresaStorage[1]);
            cardErro.style.display = "block";
            mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de cadastro do adiministrador...";

            setTimeout(() => {
                window.location = "cadastro-admin.html";
            }, "2000");


            limparFormulario();
            finalizarAguardar();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }

    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}

function cadastrarEndereco() {
    aguardar();

    var cepVar = in_cep.value;
    var logradouroVar = in_logradouro.value;
    var numeroVar = in_numero.value;
    var bairroVar = in_bairro.value;
    var cidadeVar = in_cidade.value;
    var complementoVar = in_complemento.value;


    var campovazio = cepVar == "" || logradouroVar == "" || numeroVar == "" || bairroVar == "" || cidadeVar == "" || complementoVar == "";


    if (campovazio) {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "É necessário preencher todos os campos.";

        finalizarAguardar();
        return false;
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrarEndereco", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            cepServer: cepVar,
            numeroServer: numeroVar,
            complementoServer: complementoVar,
            fkEmpresaServer: sessionStorage.getItem('FK_EMPRESA')
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);
        if (resposta.ok) {
            limparFormulario();
            finalizarAguardar();

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });

    return false;
}

function carregarFkempresa(cnpj) {
    let cnpjVar = cnpj;
    console.log("O que veio no carregar foi " + cnpj);

    fetch(`/usuarios/carregarFkempresa/${cnpjVar}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                sessionStorage.setItem("FK_EMPRESA", resposta[0].id_empresa)
            });
            setTimeout(() => {
                cadastrarEndereco();
            }, "1000");
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function cadastrarAdmin() {
    aguardar();

    var nomeAdm = in_nomeAdm.value;
    var cargoVar = in_cargo.value;
    var telVar = in_telefone.value;
    var emailVar = in_email.value;
    var senhaVar = in_senha.value;
    var confirmarSenhaVar = in_confirmacao.value;

    var campovazio = nomeAdm == "" || cargoVar == "" || telVar == "" || emailVar == "" || senhaVar == "" || confirmarSenhaVar == "";

    const telefoneRegex = /^\b\d{11}\b$/;

    const senhaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z@#$%^&*]{8,20}$/;

    const emailPadrao = /\S+@\S+\.\S+/;

    if (campovazio) {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "É necessário preencher todos os campos.";

        finalizarAguardar();
        setInterval(sumirMensagem, 5000);
        return false;
    }
    else {
        if (telefoneRegex.test(telVar)) {
            console.log("Telefone Correto");
        } else {
            document.getElementById("span-telefone-admin").style.display = "block";

            console.log("Telefone Incorreto")

            finalizarAguardar();
            setInterval(sumirMensagem, 5000);
        }

        if (senhaRegex.test(senhaVar)) {
            console.log("Senha Correta");
            if (!senhaVar == confirmarSenhaVar) {
                document.getElementById("span-senha-admin").style.display = "block";

                cardErro.style.display = "block"
                mensagem_erro.innerHTML += "As senhas devem ser iguais!";
                

                finalizarAguardar();
                setInterval(sumirMensagem, 5000);
            }
        } else {
            document.getElementById("span-senha-admin").style.display = "block";
            document.getElementById("span-confirm-senha-admin").style.display = "block";

            console.log("Senha Incorreta");

            finalizarAguardar();
            setInterval(sumirMensagem, 5000);
        }

        if (!emailPadrao.test(emailVar)) {
            console.log("Email Incorreto");
            document.getElementById("span-email-admin").style.display = "block";

            const ipt_span_email = document.querySelector('#in_email');
            ipt_span_email.classList.remove('valido');
            ipt_span_email.classList.add('invalido');
        } else {
            document.getElementById("span-email-admin").style.display = "none";

            const ipt_span_email = document.querySelector('#in_email');
            ipt_span_email.classList.add('valido');
            ipt_span_email.classList.remove('invalido');
        }
    }


    // Enviando o valor da nova input
    fetch("/usuarios/cadastrarAdmin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeAdmServer: nomeAdm,
            cargoServer: cargoVar,
            telServer: telVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            serialKeyServer: gerarChaveDeSeguranca(),
            fkEmpresaServer: sessionStorage.getItem("FK_EMPRESA")
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            cardErro.style.display = "block";
            mensagem_erro.innerHTML = "Cadastro de admin realizado com sucesso!";

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
        getSerialKey(emailVar);
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });


    setInterval(sumirMensagem, 5000);
    return false;
}

function gerarChaveDeSeguranca() {
    let serialKey = ``;
    const caracteres = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/*!@#$%&{}[]`;

    for (let i = 0; serialKey.length < 25; i++) {
        serialKey += caracteres.charAt(parseInt(Math.random() * caracteres.length + 1))
    }

    return serialKey;
}

function getSerialKey(emailVar) {
    console.log("O email que veio é: " + emailVar);
    let emailAdm = emailVar;
    fetch(`/usuarios/getSerialKey/${emailAdm}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                
                setTimeout(() => {
                    plotarSerialKey(resposta);
                }, 2000);t

                limparFormulario();
                finalizarAguardar();
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarSerialKey(resposta) {
    caixaFormulario.innerHTML = "";
    caixaFormulario.innerHTML = `

                <div class="campo center column">
                    <h2>ATENÇÃO</h2>
                    <h4 style="margin-bottom: 1rem ;">O código abaixo é o seu código de acesso para a dashboard de monitoramento! Este código é de uso exclusivo do administrador e não deve ser compartilhado com ninguém!
                    </h4>
                    <h3>${resposta[0].chave_seguranca_administrador}</h3>
                    <button class="button" onclick="alterarPagina(1)">Continuar</button>
                </div>
                
           `
}

function alterarPagina(n) {
    if (n == 1) {
        window.location = "login.html";
    }
}

//<![CDATA[
var ttChatLoaderS = document.createElement('script');
document.tomticketChatLoaderScriptVersion = 2;
ttChatLoaderS.src = 'https://retria.tomticket.com/scripts-chat/chat.min.js'
    + '?id=EP61558'
    + '&account=3939712P05042023082156'
    + '&autoOpen=0'
    + '&hideWhenOffline=0'
    + '&d=retria'
    + '&ts=' + new Date().getTime()
    + '&ref=' + encodeURIComponent(document.URL);
document.body.appendChild(ttChatLoaderS);
//]]>