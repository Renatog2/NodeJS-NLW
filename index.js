// Importar da biblioteca Inquirer
const { select, input, checkbox } = require('@inquirer/prompts');
const fs = require("fs").promises
let metas;
let mensagem = "Bem vindo!";


// Métodos
const carregarMetas = async () => {
    try{
        const dados = await fs.readFile("metas.json", "utf-8")
        metas= JSON.parse(dados)
    }
    catch(error){
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const validaMetas = () => {
    if(metas.length === 0){
        mensagem = "Nenhuma meta cadastrada";
        return false;
    }

    return true;
}

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:"})

    // Para Caso o usuário não inserir nenhum dado
    if(meta.length == 0){
        mensagem = "A meta não pode ser vazia."
        return
    }

    metas.push({
        value: meta,
        checked: false
     })

     mensagem = "Meta Cadastrada com sucesso"
}

const listarMetas = async () => {
    if (!validaMetas()) {
        return
    }

    const respostas = await checkbox ({
        message: "Use as Setas para mudar de meta, Espaço para marcar/desmarcar e Enter para finalizar a etapa",
        choices: [...metas],
        instructions: false
    })

    // Para Caso o usuário não inserir nenhum dado
    if(respostas.length == 0){
        mensagem = "Nenhuma meta selecionada"
        return
    }

    // Garante a ação de Desmarcar
    metas.forEach((m) => {
        m.checked = false
    })

    // Vai percorrer o Meta e o Respostas (Que são as metas selecioadas anteriormente) e quando forem iguais irá atribuir o checked como TRUE
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        
        meta.checked = true
    })
    
    mensagem = "Meta(s) marcadaso como concluída(s)"
}

const metasRealizadas = async () => {
    if (!validaMetas()) {
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    // Para quando não existem metas realizadas
    if(realizadas.length == 0){
        mensagem = "Não existem metas realizadas!"
        return
    }

    await select({
        message: "Metas Realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasEmAberto = async () => {
    if (!validaMetas()) {
        return
    }

    const abertas = metas.filter((meta) => {
        return !meta.checked
    })

    // Para quando não existem metas em aberto
    if(abertas.length == 0){
        mensagem = "Todas as metas foram realizadas!"
        return
    }

    await select({
        message: "Metas Em Aberto: " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    if (!validaMetas()) {
        return
    }

    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })

    const deletar = await checkbox ({
        message: "Selecione a meta para exclusão",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    // Para quando não existem metas marcadas para exclusão
    if(deletar.length == 0){
        mensagem = "Nenhum item marcado para exclusão"
        return
    }

    deletar.forEach((it) => {
        metas = metas.filter((meta) => {
            return meta.value != it
        })
    })

    mensagem = "Meta(s) excluida(s) com sucesso"
}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != ""){
        console.log(mensagem)
        console.log()
        mensagem = ""
    }
}


// Programa
const start = async () => {
    await carregarMetas()

    while(true){
        mostrarMensagem()
        await salvarMetas()

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar metas",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas em aberto",
                    value: "aberto"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "aberto":
                await metasEmAberto()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Encerrando a execução")
                return
        }
    }
}


start()