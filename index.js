const { select } = require('@inquirer/prompts');

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
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao){
            case "cadastrar":
                console.log("Vamos Cadastrar")
                break
            case "listar":
                console.log("Vamos Listas")
                break
            case "sair":
                return
        }
    }
}


start()