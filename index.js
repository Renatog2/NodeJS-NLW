// Importar da biblioteca Inquirer
const { select, input, checkbox } = require('@inquirer/prompts');
let metas = []


// Métodos
const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:"})

    // Para Caso o usuário não inserir nenhum dado
    if(meta.length == 0){
        console.log("A meta não pode ser vazia.")
        return
    }

    metas.push({
        value: meta,
        checked: false
     })
}

const listarMetas = async () => {
    const respostas = await checkbox ({
        message: "Use as Setas para mudar de meta, Espaço para marcar/desmarcar e Enter para finalizar a etapa",
        choices: [...metas],
        instructions: false
    })

    // Para Caso o usuário não inserir nenhum dado
    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada")
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

    console.log("Meta(s) marcadaso como concluída(s)")
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    // Para quando não existem metas realizadas
    if(realizadas.length == 0){
        console.log("Não existem metas realizadas!")
        return
    }

    await select({
        message: "Metas Realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasEmAberto = async() => {
    const abertas = metas.filter((meta) => {
        return !meta.checked
    })

    // Para quando não existem metas em aberto
    if(abertas.length == 0){
        console.log("Todas as metas foram realizadas!")
        return
    }

    await select({
        message: "Metas Em Aberto: " + abertas.length,
        choices: [...abertas]
    })
}


// Programa
const start = async () => {
    while(true){
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
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
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
            case "sair":
                return
        }
    }
}


start()