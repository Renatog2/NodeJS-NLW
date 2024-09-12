teste = ("Hello World!");


// Contextos no JS
{
    const teste = ("Olá Mundo!");
    console.log(teste);
}

console.log(teste);
console.log();


// Array
let list = ["123","369"]

console.log(list[0], list[1]);
console.log(list[1] + ", " +list[0]);

let meta = {
    value: 'Ler um livro por mês',
    checked: false,
    log: (info) => {
        console.log(info)
    }
}

console.log(meta);

// É possível imprimir um valor em específico da lista
console.log(meta.value);
console.log();


// Chamada
const start = () => {
    let count = 1
    while(count <= 10){
        console.log(count)
        count = count + 1
    }
}

start();